/*
  EDIT VIDEO PORTFOLIO DI BAGIAN VIDEO_PROJECTS DI BAWAH INI.
  Isi driveUrl dengan link Google Drive milik video. Pastikan akses file
  disetel ke "Anyone with the link" sebagai Viewer agar embed bisa diputar.
  Judul, deskripsi, dan role juga bebas lo ganti sesuai proyek aslinya.
  Untuk mengganti cover video, ganti file assets/video-01.jpg sampai video-05.jpg.
  Simpan nama file yang sama agar thumbnail otomatis berubah di website.
  Lihat THUMBNAIL-GUIDE.txt untuk panduan lengkap.
*/
const VIDEO_PROJECTS = [
  {
    title: "Cargoku — Brand Content",
    category: "BRAND CONTENT · 01",
    description: "Video untuk Cargoku dengan identitas brand serta informasi kanal digital sebagai bagian dari materi promosi.",
    role: "Scriptwriting · Voice-over",
    thumbnail: "assets/video-01.jpg",
    driveUrl: "https://drive.google.com/file/d/1hSj4GpD3vqY1b-kwH72LgxV-cMJ5hxQx/view"
  },
  {
    title: "Batas Maksimum Kirim Pesan",
    category: "INFORMATIVE CONTENT · 02",
    description: "Konten informatif yang memadukan presenter dan visual pendukung untuk menyampaikan informasi secara ringkas.",
    role: "Scriptwriting · On-camera talent",
    thumbnail: "assets/video-02.jpg",
    driveUrl: "https://drive.google.com/file/d/1DcyzyZ3m2gogOswe4od1P7HvJ_jAVoQF/view"
  },
  {
    title: "Informasi Layanan Pengiriman",
    category: "SERVICE CONTENT · 03",
    description: "Video situasional yang menampilkan notifikasi terkait layanan pengiriman dan contoh komunikasi kepada pelanggan.",
    role: "Scriptwriting · Talent",
    thumbnail: "assets/video-03.jpg",
    driveUrl: "https://drive.google.com/file/d/1MnSYbenPXcSakt0Mm65DYwhhmJ035MXT/view"
  },
  {
    title: "Promosi Lewat Sebar Brosur",
    category: "PROMOTIONAL CONTENT · 04",
    description: "Video promosi yang menampilkan aktivitas membagikan brosur untuk memperkenalkan layanan kepada calon pelanggan.",
    role: "Scriptwriting · Talent",
    thumbnail: "assets/video-04.jpg",
    driveUrl: "https://drive.google.com/file/d/1fABt6po5fv3v8mlnW8fDSIJJXQWdJtCu/view"
  },
  {
    title: "Custom Banner Sesukamu!",
    category: "PRODUCT PROMOTION · 05",
    description: "Konten promosi layanan custom banner, didukung penjelasan presenter dan visual proses percetakan.",
    role: "Scriptwriting · On-camera talent",
    thumbnail: "assets/video-05.jpg",
    driveUrl: "https://drive.google.com/file/d/1rYRLCTMktsUKRT2_8xDOBZtY_4Dkh5uK/view"
  }
];

const videoGrid = document.getElementById("videoGrid");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3800);
}

function getDriveFileId(url) {
  if (!url || typeof url !== "string") return "";
  const value = url.trim();
  if (!value) return "";

  const patterns = [
    /drive\.google\.com\/file\/d\/([\w-]+)/,
    /drive\.google\.com\/open\?id=([\w-]+)/,
    /drive\.google\.com\/uc\?(?:[^#]*&)?id=([\w-]+)/,
    /[?&]id=([\w-]+)/
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match && match[1]) return match[1];
  }

  // Bisa juga langsung isi ID file Google Drive.
  if (/^[\w-]{15,}$/.test(value)) return value;
  return "";
}

function createVideoCard(project, index) {
  const card = document.createElement("article");
  card.className = "video-card";

  const frame = document.createElement("div");
  frame.className = "video-frame";

  const driveId = getDriveFileId(project.driveUrl);
  if (driveId) {
    // Show the editable thumbnail first; load the Google Drive player only when clicked.
    const cover = document.createElement("button");
    cover.type = "button";
    cover.className = "video-cover";
    cover.setAttribute("aria-label", `Putar video ${project.title || `portfolio ${index + 1}`}`);

    if (project.thumbnail) {
      const thumbnail = document.createElement("img");
      thumbnail.src = project.thumbnail;
      thumbnail.alt = "";
      thumbnail.loading = "lazy";
      thumbnail.decoding = "async";
      thumbnail.onerror = () => {
        thumbnail.remove();
        cover.classList.add("video-cover-fallback");
      };
      cover.appendChild(thumbnail);
    } else {
      cover.classList.add("video-cover-fallback");
    }

    const play = document.createElement("span");
    play.className = "play-button video-cover-play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";
    const label = document.createElement("span");
    label.className = "video-cover-label";
    label.textContent = "PLAY VIDEO";
    cover.append(play, label);

    cover.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://drive.google.com/file/d/${encodeURIComponent(driveId)}/preview`;
      iframe.title = project.title || `Video portfolio ${index + 1}`;
      iframe.loading = "eager";
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      iframe.allowFullscreen = true;
      iframe.setAttribute("webkitallowfullscreen", "true");
      iframe.setAttribute("mozallowfullscreen", "true");
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.style.display = "block";
      iframe.style.position = "absolute";
      iframe.style.inset = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.maxWidth = "none";
      iframe.style.border = "0";
      frame.replaceChildren(iframe);
      frame.classList.add("video-frame-playing");
    }, { once: true });

    frame.appendChild(cover);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "video-placeholder";
    const placeholderContent = document.createElement("div");
    placeholderContent.className = "video-placeholder-content";
    placeholderContent.innerHTML = `
      <span class="play-button" aria-hidden="true">▶</span>
      <span class="placeholder-label">VIDEO PROJECT ${String(index + 1).padStart(2, "0")}</span>
      <span class="placeholder-hint">Your video will appear here</span>
    `;
    placeholder.appendChild(placeholderContent);
    frame.appendChild(placeholder);
  }

  const info = document.createElement("div");
  info.className = "video-info";
  const copy = document.createElement("div");
  copy.className = "video-info-copy";

  const kicker = document.createElement("p");
  kicker.className = "card-kicker";
  kicker.textContent = project.category || `SELECTED VIDEO · ${String(index + 1).padStart(2, "0")}`;
  const heading = document.createElement("h3");
  heading.textContent = project.title || `Video Project ${String(index + 1).padStart(2, "0")}`;
  const description = document.createElement("p");
  description.textContent = project.description || "Deskripsi proyek akan ditambahkan.";
  const role = document.createElement("div");
  role.className = "role-pill video-role";
  role.textContent = project.role || "Project role";

  copy.append(kicker, heading, description, role);
  const number = document.createElement("span");
  number.className = "video-index";
  number.textContent = String(index + 1).padStart(2, "0");
  number.setAttribute("aria-hidden", "true");
  info.append(copy, number);
  card.append(frame, info);
  return card;
}

function renderVideos() {
  if (!videoGrid) return;
  videoGrid.replaceChildren(...VIDEO_PROJECTS.map(createVideoCard));
}

renderVideos();

// Gentle reveal-on-scroll animation with a staggered entrance for groups.
function setupScrollAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const selectors = [
    ".hero-copy > *", ".hero-visual", ".intro-strip-inner > *",
    ".section-about > .section-heading", ".about-body",
    ".focus-section .section-heading", ".focus-card",
    ".work-section .section-heading", ".video-card",
    ".platform-section .section-heading", ".platform-card",
    ".script-section .section-heading", ".script-card",
    ".copywriting-visual", ".copywriting-copy",
    ".experience-section .section-heading", ".experience-item",
    ".skills-section .section-heading", ".skills-cloud span", ".skills-note",
    ".education-layout > .section-heading", ".education-item",
    ".contact-copy", ".contact-details"
  ];
  const elements = document.querySelectorAll(selectors.join(","));

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const parentCounts = new Map();
  elements.forEach((element) => {
    const parent = element.parentElement;
    const index = parentCounts.get(parent) || 0;
    parentCounts.set(parent, index + 1);
    element.style.setProperty("--reveal-delay", `${Math.min(index * 85, 425)}ms`);
    element.classList.add("reveal-on-scroll");
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -38px 0px" });

  elements.forEach((element) => observer.observe(element));
}

// Thin progress indicator at the very top of the page.
function setupScrollProgress() {
  const progressBar = document.getElementById("scrollProgressBar");
  if (!progressBar) return;
  let scheduled = false;

  const updateProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
    scheduled = false;
  };

  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();
}

setupScrollAnimations();
setupScrollProgress();

// Mobile navigation
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Buka menu");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Buka menu" : "Tutup menu");
    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

// CV button points to the file that can be added later into /assets.
document.querySelectorAll("[data-cv-link]").forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    const fileUrl = link.getAttribute("href");
    if (!fileUrl) return;

    // Opening index.html directly cannot reliably check local asset existence.
    if (window.location.protocol === "file:") {
      showToast("Tambahkan file CV dengan nama assets/nurul-afifa-cv.pdf untuk mengaktifkan tombol ini.");
      return;
    }

    try {
      const response = await fetch(fileUrl, { method: "HEAD", cache: "no-store" });
      if (!response.ok) {
        showToast("File CV belum tersedia. Letakkan PDF di assets/nurul-afifa-cv.pdf terlebih dahulu.");
        return;
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = fileUrl;
      downloadLink.download = "Nurul-Afifa-CV.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    } catch (error) {
      showToast("CV belum bisa diverifikasi. Pastikan file assets/nurul-afifa-cv.pdf sudah tersedia.");
      console.info("CV file existence could not be checked.", error);
    }
  });
});


// Reliable "Back to top": #top is on a sticky header, so native anchor scrolling
// can stop at the sticky element instead of returning the document to scrollY = 0.
function setupBackToTop() {
  const topLinks = document.querySelectorAll('a[href="#top"], a.back-to-top');
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  topLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (typeof closeMenu === "function") closeMenu();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  });
}

setupBackToTop();
