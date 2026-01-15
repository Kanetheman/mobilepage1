(function () {
  // =========================================================
  // Helpers
  // =========================================================
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return document.querySelectorAll(sel); }

  // =========================================================
  // Footer year
  // =========================================================
  var yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================================================
  // Mobile menu
  // =========================================================
  var btn = qs('#menuBtn');
  var menu = qs('#mobileMenu');
  var headerEl = qs('header');
  var bodyEl = document.body;

  function keepMaroon() {
    if (!headerEl) return;
    headerEl.classList.add('bg-brand-600', 'text-white');
    headerEl.classList.remove('bg-white', 'bg-white/90', 'supports-[backdrop-filter]:bg-white/70');
  }

  function setExpanded(isOpen) {
    if (!btn || !menu) return;

    btn.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      menu.classList.remove('hidden');
      if (headerEl) headerEl.setAttribute('data-menu-open', 'true');
      if (bodyEl) bodyEl.classList.add('overflow-hidden');
    } else {
      menu.classList.add('hidden');
      if (headerEl) headerEl.removeAttribute('data-menu-open');
      if (bodyEl) bodyEl.classList.remove('overflow-hidden');
    }

    keepMaroon();
  }

  if (btn && menu) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });
  }

  // Close when a menu link is clicked
  var menuLinks = qsa('#mobileMenu a');
  for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function () { setExpanded(false); });
  }

  // Close on Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setExpanded(false);
  });

  // Close on hash change (anchor jumps)
  window.addEventListener('hashchange', function () { setExpanded(false); });

  // Close menu on resize to md+
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) setExpanded(false);
  });

  document.addEventListener('visibilitychange', keepMaroon);
  keepMaroon();

  // =========================================================
  // Reveal-on-scroll
  // =========================================================
  var reveals = qsa('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    for (var j = 0; j < reveals.length; j++) observer.observe(reveals[j]);
  } else {
    // fallback (old browsers)
    for (var k = 0; k < reveals.length; k++) reveals[k].classList.add('visible');
  }

  // =========================================================
  // Demo form handler (remove when wired to backend)
  // =========================================================
  var form = qs('#intakeForm');
  var msg = qs('#formMsg');

  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.classList.remove('sr-only');
      msg.classList.add('text-brand-700');
      msg.textContent = "Thanks! We'll reach out within 1–2 business days.";
      form.reset();
    });
  }
})();
