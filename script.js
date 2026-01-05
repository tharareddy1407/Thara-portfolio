// ---------- Theme toggle ----------
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") document.body.classList.add("dark");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// ---------- Scroll progress + back-to-top ----------
const progressBar = document.getElementById("progressBar");
const toTop = document.getElementById("toTop");

function onScroll() {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (scrollTop > 500) toTop.classList.add("show");
  else toTop.classList.remove("show");
}
window.addEventListener("scroll", onScroll);
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

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
const text = "Senior Data Engineer · Systems Builder · Problem Solver";
let i = 0;

function type() {
  if (!typedEl) return;
  typedEl.textContent = text.slice(0, i++);
  if (i <= text.length) requestAnimationFrame(type);
}
type();
