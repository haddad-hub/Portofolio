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
    "github": "#",
    "linkedin": "#",
    "instagram": "#",
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

  const footerLinks = Object.entries(profile.links || {})
    .filter(([, href]) => href && href !== "#")
    .map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");
  byId("footerLinks").innerHTML = footerLinks;
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
