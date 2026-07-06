const state = {
  profile: null
};

const fallbackProfile = {
  "name": "Haddad asriansyah",
  "role": "IT engginer",
  "location": "Indonesia",
  "email": "ezethaddad@gmail.com",
  "phone": "+62 852-4730-1052",
  "availability": "Open for freelance and full-time work",
  "summary": "Saya membangun aplikasi web operasional seperti dashboard analytics, aplikasi pelanggan, aplikasi kurir, dan tools interaktif berbasis HTML, CSS, JavaScript, Tailwind, Chart.js, serta localStorage.",
  "links": {
    "github": "https://github.com/haddad-hub",
    "linkedin": "#",
    "instagram": "https://www.instagram.com/hadddadde?igsh=OXJsM2F3Mm9pbGZq",
    "tiktok": "https://www.tiktok.com/@apersonalityy?is_from_webapp=1&sender_device=pc",
    "resume": "#"
  },
  "stats": [
    {
      "label": "Projects",
      "value": "5+"
    },
    {
      "label": "Focus",
      "value": "Web App"
    },
    {
      "label": "Stack",
      "value": "JS"
    }
  ],
  "skills": [
    "HTML",
    "CSS",
    "JavaScript",
    "Tailwind CSS",
    "Chart.js",
    "LocalStorage",
    "Responsive UI",
    "C++"
  ],
  "services": [
    {
      "title": "Dashboard Analytics",
      "description": "Membuat dashboard visual untuk membaca order, kurir, histori, keuangan, dan statistik operasional."
    },
    {
      "title": "Web App Operasional",
      "description": "Membangun aplikasi pelanggan dan kurir dengan alur input, status order, profil, histori, dan penyimpanan lokal."
    },
    {
      "title": "Frontend Interface",
      "description": "Merancang tampilan responsif dengan navigasi, tema, kartu data, form, tabel, dan chart yang nyaman dipakai."
    }
  ],
  "projects": [
    {
      "title": "Bonjek Pelanggan",
      "category": "Customer Web App",
      "description": "Aplikasi pelanggan Bonjek untuk membuat pesanan makanan/minuman, menyimpan profil, melihat status, dan histori pesanan.",
      "image": "assets/project-bonjek-customer.svg",
      "tags": [
        "HTML",
        "CSS",
        "JavaScript",
        "LocalStorage"
      ],
      "demo": "projects/bonjek/app pelanggan bonjek.html",
      "source": "#"
    },
    {
      "title": "Bonjek Kurir",
      "category": "Courier Web App",
      "description": "Aplikasi kurir untuk menerima order masuk, mengelola pengantaran, menyelesaikan transaksi, dan menyimpan profil kurir.",
      "image": "assets/project-bonjek-courier.svg",
      "tags": [
        "HTML",
        "CSS",
        "JavaScript",
        "LocalStorage"
      ],
      "demo": "projects/bonjek/app kurir bonjek.html",
      "source": "#"
    },
    {
      "title": "Bonjek Analytics Dashboard",
      "category": "Operations Dashboard",
      "description": "Dashboard analytics untuk memantau order, performa kurir, histori, keuangan, grafik, filter tanggal, dan ranking kurir.",
      "image": "assets/project-bonjek-dashboard.svg",
      "tags": [
        "Tailwind",
        "Chart.js",
        "Dashboard"
      ],
      "demo": "projects/bonjek/dashboard bonjek analytics.html",
      "source": "#"
    },
    {
      "title": "MyDash Personal Dashboard",
      "category": "Personal Productivity",
      "description": "Dashboard pribadi dengan tema, statistik, todo, chart, dan layout produktivitas untuk mengatur aktivitas harian.",
      "image": "assets/project-mydash.svg",
      "tags": [
        "Tailwind",
        "Chart.js",
        "UI Design"
      ],
      "demo": "projects/bonjek/dashboard pribadi.html",
      "source": "#"
    },
    {
      "title": "Kalkulator Sederhana",
      "category": "Utility Tool",
      "description": "Kalkulator web ringan dengan tampilan responsif, display ekspresi, dan tombol operasi dasar.",
      "image": "assets/project-calculator.svg",
      "tags": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "demo": "projects/bonjek/kalkulator-sederhana.html",
      "source": "#"
    }
  ],
  "experience": [
    {
      "period": "2026",
      "title": "Bonjek Web App Ecosystem",
      "description": "Membangun rangkaian aplikasi Bonjek: pelanggan, kurir, dashboard analytics, shared logic, dan tampilan responsif."
    },
    {
      "period": "2026",
      "title": "Personal Dashboard & Web Tools",
      "description": "Membuat dashboard pribadi dan tools sederhana berbasis web untuk latihan UI, chart, state, dan interaksi browser."
    }
  ]
};

function byId(id) {
  return document.getElementById(id);
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value || "";
  });
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function safeLink(url) {
  return url && url !== "#" ? url : "#";
}

function phoneDigits(phone) {
  return phone.replace(/[^\d+]/g, "");
}

function whatsappNumber(phone) {
  return phoneDigits(phone).replace(/^\+/, "");
}

const socialLinks = {
  github: {
    label: "GitHub",
    handle: "haddad-hub",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.1a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.45-1.15-1.1-1.46-1.1-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.48 9.48 0 0 1 12 6.98c.85 0 1.7.11 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.67c0 .27.18.58.69.48A10 10 0 0 0 12 2.1Z"/>
      </svg>
    `
  },
  instagram: {
    label: "Instagram",
    handle: "@hadddadde",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 2.8h8.4a5 5 0 0 1 5 5v8.4a5 5 0 0 1-5 5H7.8a5 5 0 0 1-5-5V7.8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm4.2 3.6a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Zm0 2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm4.65-2.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z"/>
      </svg>
    `
  },
  tiktok: {
    label: "TikTok",
    handle: "@apersonalityy",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 3h2.35c.2 1.25.75 2.27 1.64 3.06.84.75 1.85 1.2 3.01 1.35v2.45a7.72 7.72 0 0 1-4.58-1.48v6.58c0 1.9-.62 3.38-1.85 4.44-1.08.93-2.43 1.4-4.05 1.4-1.72 0-3.12-.54-4.2-1.61a5.2 5.2 0 0 1-1.58-3.86c0-1.55.52-2.82 1.56-3.83 1.05-1.02 2.36-1.53 3.94-1.53.42 0 .8.04 1.16.13v2.58a3.29 3.29 0 0 0-1.1-.18c-.82 0-1.48.25-1.98.74-.5.48-.75 1.13-.75 1.95 0 .8.26 1.46.78 1.96.52.5 1.2.75 2.03.75.94 0 1.67-.3 2.18-.91.43-.52.64-1.22.64-2.1V3h.8Z"/>
      </svg>
    `
  }
};

async function readJsonResponse(response) {
  const text = await response.text();
  const trimmed = text.trim();

  if (!trimmed || trimmed.startsWith("<")) {
    throw new Error("API tidak aktif di server ini.");
  }

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    throw new Error("Balasan server bukan JSON yang valid.");
  }
}

function renderProfile(profile) {
  state.profile = profile;

  document.title = `${profile.name} | ${profile.role}`;
  setText('[data-profile="name"]', profile.name);
  setText('[data-profile="role"]', profile.role);
  setText('[data-profile="summary"]', profile.summary);
  setText('[data-profile="availability"]', profile.availability);
  setText('[data-profile="location"]', profile.location);

  const avatar = document.querySelector(".avatar");
  if (avatar) avatar.textContent = initials(profile.name);

  byId("stats").innerHTML = profile.stats
    .map((item) => `<div class="stat"><strong>${item.value}</strong><span>${item.label}</span></div>`)
    .join("");

  byId("skills").innerHTML = profile.skills
    .map((skill) => `<span class="skill-pill">${skill}</span>`)
    .join("");

  byId("projectsGrid").innerHTML = profile.projects.map(renderProject).join("");
  byId("servicesGrid").innerHTML = profile.services.map(renderService).join("");
  byId("experienceList").innerHTML = profile.experience.map(renderExperience).join("");

  const emailLink = byId("emailLink");
  const phoneLink = byId("phoneLink");
  const whatsappLink = byId("whatsappLink");
  emailLink.href = `mailto:${profile.email}`;
  emailLink.textContent = profile.email;
  phoneLink.href = `tel:${phoneDigits(profile.phone)}`;
  phoneLink.textContent = profile.phone;
  whatsappLink.href = `https://wa.me/${whatsappNumber(profile.phone)}`;
  whatsappLink.textContent = `WhatsApp ${profile.phone}`;

  const footerLinks = Object.entries(socialLinks)
    .filter(([key]) => profile.links?.[key] && profile.links[key] !== "#")
    .map(([key, item]) => `
      <a class="social-link" href="${profile.links[key]}" target="_blank" rel="noreferrer">
        <span class="social-icon">${item.icon}</span>
        <span>
          <strong>${item.label}</strong>
          <small>${item.handle}</small>
        </span>
      </a>
    `)
    .join("");
  byId("footerLinks").innerHTML = `<p class="footer-links-title">Akun media sosial</p><div class="social-list">${footerLinks}</div>`;
}

function renderProject(project) {
  const tags = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  return `
    <article class="project-card">
      <img src="${project.image}" alt="">
      <div class="project-body">
        <p class="category">${project.category}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${tags}</div>
        <div class="project-links">
          <a href="${safeLink(project.demo)}" target="_blank" rel="noreferrer">Demo</a>
          <a href="${safeLink(project.source)}" target="_blank" rel="noreferrer">Source</a>
        </div>
      </div>
    </article>
  `;
}

function renderService(service) {
  return `
    <article class="service-card">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </article>
  `;
}

function renderExperience(item) {
  return `
    <article class="timeline-item">
      <time>${item.period}</time>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

async function loadProfile() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) throw new Error("Profile request failed");
    const profile = await readJsonResponse(response);
    renderProfile({ ...fallbackProfile, ...profile });
  } catch (error) {
    console.error(error);
    renderProfile(fallbackProfile);
  }
}

function setupNavigation() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupContactForm() {
  const form = byId("contactForm");
  const status = byId("formStatus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = Object.fromEntries(new FormData(form).entries());
    const profile = state.profile || fallbackProfile;
    const message = [
      `Halo, saya ${payload.name}.`,
      `Email: ${payload.email}`,
      `Subjek: ${payload.subject}`,
      "",
      payload.message
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber(profile.phone)}?text=${encodeURIComponent(message)}`;

    status.textContent = "Membuka WhatsApp untuk mengirim pesan...";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  byId("year").textContent = new Date().getFullYear();
  setupNavigation();
  setupContactForm();
  loadProfile();
});
