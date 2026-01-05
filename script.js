// ===============================
// Theme Toggle (Dark / Light)
// ===============================
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
}

// Toggle theme on click
themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  // Save preference
  if (body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});


// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// ===============================
// Scroll Progress Bar
// ===============================
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// ===============================
// Back to Top Button
// ===============================
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.style.display = window.scrollY > 300 ? "block" : "none";
});
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ---------- Project filters ----------
const chips = document.querySelectorAll(".chip");
const projects = document.querySelectorAll(".project");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    projects.forEach((p) => {
      const types = (p.dataset.type || "").split(" ");
      const show = filter === "all" || types.includes(filter);
      p.style.display = show ? "block" : "none";
    });
  });
});

// ---------- Typing effect ----------
const typedEl = document.getElementById("typed");
const text = "Data Engineer · Analytics & Business Intelligence";
let i = 0;

function type() {
  if (!typedEl) return;
  typedEl.textContent = text.slice(0, i++);
  if (i <= text.length) requestAnimationFrame(type);
}
type();
