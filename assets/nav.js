const hamburger = document.getElementById('hamburgerBtn');
const backdrop = document.getElementById('backdrop');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawerClose');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    backdrop.classList.add('active');
    drawer.classList.add('active');
  });
}

if (drawerClose) {
  drawerClose.addEventListener('click', () => {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
  });
}

if (backdrop) {
  backdrop.addEventListener('click', () => {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
  });
}

// Close drawer when clicking a link
document.querySelectorAll('.drawer-item').forEach(link => {
  link.addEventListener('click', () => {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
  });
});

// Scroll reveal animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));
