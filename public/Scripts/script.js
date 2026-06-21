function initIcons() {
  if (!window.lucide?.createIcons) return;
  lucide.createIcons({
    attrs: {
      "stroke-width": 2,
    },
  });
}

function setLucideIcon(parent, iconName, size = 16) {
  if (!parent) return;
  parent.innerHTML = `<i data-lucide="${iconName}" width="${size}" height="${size}"></i>`;
  initIcons();
}

initIcons();

// Theme toggle
const toggle = document.getElementById("themeToggle");
const html = document.documentElement;
let dark = true;
toggle.addEventListener("click", () => {
  dark = !dark;
  html.setAttribute("data-theme", dark ? "dark" : "light");
  setLucideIcon(toggle, dark ? "sun" : "moon");
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  setLucideIcon(
    menuBtn,
    mobileMenu.classList.contains("open") ? "x" : "menu",
    18,
  );
});
function closeMobile() {
  mobileMenu.classList.remove("open");
  setLucideIcon(menuBtn, "menu", 18);
}

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll(".fade-in, .timeline-item")
  .forEach((el) => observer.observe(el));

// Active nav link
const sections = document.querySelectorAll("section, [id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    const top = s.offsetTop - 120;
    if (window.scrollY >= top) current = s.id;
  });
  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

// Stagger cards
document.querySelectorAll(".project-card, .skill-card").forEach((el, i) => {
  el.style.transitionDelay = i * 0.05 + "s";
});

// Clickable project cards
document.querySelectorAll(".project-card-clickable").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const url = card.dataset.href;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });
});

// Contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
const submitBtnContent = submitBtn.querySelector(".submit-btn-content");
const submitBtnDefaultHtml = submitBtnContent.innerHTML;

function showFormStatus(message, type, loading = false) {
  formStatus.className = `form-status visible ${type}`;
  if (loading) {
    formStatus.innerHTML = `<span class="status-spinner" aria-hidden="true"></span><span>${message}</span>`;
    return;
  }
  formStatus.textContent = message;
}

function setFormLoading(loading) {
  contactForm.classList.toggle("is-loading", loading);
  contactForm.setAttribute("aria-busy", loading ? "true" : "false");
  contactForm.querySelectorAll("input, textarea").forEach((field) => {
    field.disabled = loading;
  });
  submitBtn.disabled = loading;
  submitBtn.classList.toggle("is-loading", loading);

  if (loading) {
    submitBtnContent.innerHTML =
      '<span class="btn-spinner" aria-hidden="true"></span> Sending...';
    showFormStatus("Please wait — delivering your message...", "loading", true);
    return;
  }

  submitBtnContent.innerHTML = submitBtnDefaultHtml;
  initIcons();
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    showFormStatus("Please fill in all fields.", "error");
    return;
  }

  if (message.length < 10) {
    showFormStatus("Message must be at least 10 characters.", "error");
    return;
  }

  // Show success immediately
  showFormStatus("✓ Message sent successfully!", "success");
  contactForm.reset();

  // Send to backend in background (without blocking UI)
  fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  }).catch((err) => {
    console.error("Backend error:", err);
  });
});
