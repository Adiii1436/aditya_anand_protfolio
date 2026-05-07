/* ═══════════════════════════════════════════
   scroll.js — Scroll-triggered fade-ins & active nav links
   ═══════════════════════════════════════════ */

(function () {

  /* ── FADE-IN ON SCROLL ───────────────────
     All elements with class "fade" start invisible
     and animate in once they enter the viewport.   */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade').forEach(function (el) {
    io.observe(el);
  });

  /* ── ACTIVE NAV LINK ─────────────────────
     Highlights the nav link matching the current
     visible section as the user scrolls.          */
  var secs  = Array.from(document.querySelectorAll('section[id]'));
  var navAs = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

  window.addEventListener('scroll', function () {
    var y = window.scrollY + 160;

    secs.forEach(function (s) {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        navAs.forEach(function (a) { a.classList.remove('active'); });
        var active = document.querySelector('.nav-links a[href="#' + s.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { passive: true });

})();
