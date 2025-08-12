const root = document.documentElement;
const themeToggleButton = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const yearEl = document.getElementById('year');

function setTheme(next) {
  if (next === 'light') {
    root.setAttribute('data-theme', 'light');
    themeIcon.className = 'ri-sun-line';
  } else {
    root.removeAttribute('data-theme');
    themeIcon.className = 'ri-moon-line';
  }
  localStorage.setItem('theme', next);
}

const stored = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
setTheme(stored || (prefersLight ? 'light' : 'dark'));

themeToggleButton?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  setTheme(current === 'light' ? 'dark' : 'light');
});

yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Initialize AOS (Animate On Scroll)
(() => {
  try {
    // @ts-ignore
    if (typeof AOS !== 'undefined') {
      document.documentElement.classList.add('aos-supported');
      // @ts-ignore
      AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 80 });
    } else {
      document.documentElement.classList.remove('aos-supported');
    }
  } catch (_) {
    document.documentElement.classList.remove('aos-supported');
  }
})();

