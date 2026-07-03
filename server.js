const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "data");
const PROFILE_FILE = path.join(DATA_DIR, "profile.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp"
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function readBody(req) {
  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    totalBytes += chunk.length;
    if (totalBytes > 1024 * 32) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function validateContact(input) {
  const name = cleanText(input.name, 80);
  const email = cleanText(input.email, 120).toLowerCase();
  const subject = cleanText(input.subject, 120);
  const message = typeof input.message === "string" ? input.message.trim().slice(0, 2000) : "";
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailLooksValid || !subject || message.length < 10) {
    return {
      ok: false,
      error: "Isi nama, email valid, subjek, dan pesan minimal 10 karakter."
    };
  }

  return { ok: true, data: { name, email, subject, message } };
}

function validateProfileUpdate(input) {
  const allowedFields = ["name", "role", "location", "email", "phone", "availability", "summary"];
  const data = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(input, field)) {
      data[field] = cleanText(input[field], field === "summary" ? 500 : 140);
    }
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: "Email tidak valid." };
  }

  if (data.phone && !/^[+\d][\d\s()-]{7,24}$/.test(data.phone)) {
    return { ok: false, error: "Nomor HP tidak valid." };
  }

  return { ok: true, data };
}

function isAdmin(req) {
  return req.headers["x-admin-password"] === ADMIN_PASSWORD;
}

async function handleContact(req, res) {
  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return sendJson(res, error.statusCode || 400, { error: "Format request tidak valid." });
  }

  const validation = validateContact(body);
  if (!validation.ok) return sendJson(res, 400, { error: validation.error });

  const messages = await readJson(MESSAGES_FILE, []);
  const savedMessage = {
    id: crypto.randomUUID(),
    ...validation.data,
    createdAt: new Date().toISOString()
  };

  messages.push(savedMessage);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  return sendJson(res, 201, {
    message: "Pesan berhasil dikirim. Terima kasih sudah menghubungi saya."
  });
}

async function handleProfileUpdate(req, res) {
  if (!isAdmin(req)) {
    return sendJson(res, 401, { error: "Password admin salah." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return sendJson(res, error.statusCode || 400, { error: "Format request tidak valid." });
  }

  const validation = validateProfileUpdate(body);
  if (!validation.ok) return sendJson(res, 400, { error: validation.error });

  const profile = await readJson(PROFILE_FILE, {});
  const updatedProfile = { ...profile, ...validation.data };

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PROFILE_FILE, JSON.stringify(updatedProfile, null, 2));

  return sendJson(res, 200, {
    message: "Profil berhasil diperbarui.",
    profile: updatedProfile
  });
}

async function serveStatic(req, res, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    return sendText(res, 403, "Forbidden");
  }

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600"
    });
    res.end(file);
  } catch (error) {
    if (error.code === "ENOENT") {
      const notFound = await fs.readFile(path.join(PUBLIC_DIR, "index.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(notFound);
      return;
    }

    console.error(error);
    sendText(res, 500, "Internal server error");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  try {
    if (req.method === "GET" && url.pathname === "/api/profile") {
      const profile = await readJson(PROFILE_FILE, {});
      return sendJson(res, 200, profile);
    }

    if (req.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(req, res);
    }

    if (req.method === "POST" && url.pathname === "/api/profile") {
      return handleProfileUpdate(req, res);
    }

    if (req.method === "GET" || req.method === "HEAD") {
      return serveStatic(req, res, url.pathname);
    }

    sendText(res, 405, "Method not allowed");
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Terjadi masalah di server." });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
