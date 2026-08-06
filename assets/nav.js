function initNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('backdrop');
  const closeBtn = document.getElementById('drawerClose');

  if (!hamburger || !drawer || !backdrop) return;

  function openDrawer() {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    backdrop.classList.add('show');
  }

  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  backdrop.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => obs.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
});
