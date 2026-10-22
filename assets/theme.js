/* Ocean Forged — theme behaviours */
(function () {
  'use strict';

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < (window.innerHeight || 900) * 0.95) {
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });
  }

  /* ---------- mobile nav ---------- */
  function initNav() {
    var toggle = document.querySelector('.of-nav__toggle');
    var nav = document.querySelector('.of-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) nav.classList.remove('is-open');
    });
  }

  /* ---------- header: transparent over homepage hero, solid elsewhere ---------- */
  function initHeader() {
    var header = document.querySelector('.of-header');
    if (!header) return;
    var root = document.documentElement;
    var nav = document.querySelector('.of-nav');
    var drawer = document.querySelector('.of-cartd');
    function setHeight() { root.style.setProperty('--of-header-h', header.offsetHeight + 'px'); }
    function update() {
      var hero = document.querySelector('.template-index .of-hero');
      var past = hero ? hero.getBoundingClientRect().bottom <= header.offsetHeight : true;
      var open = (nav && nav.classList.contains('is-open')) || (drawer && drawer.classList.contains('is-open'));
      header.classList.toggle('is-solid', past || !!open);
    }
    setHeight();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { setHeight(); update(); });
    if ('MutationObserver' in window) {
      var mo = new MutationObserver(update);
      if (nav) mo.observe(nav, { attributes: true, attributeFilter: ['class'] });
      if (drawer) mo.observe(drawer, { attributes: true, attributeFilter: ['class'] });
    }
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () { initReveal(); initNav(); initHeader(); });

  /* re-run reveal inside Shopify theme editor when sections reload */
  document.addEventListener('shopify:section:load', initReveal);
})();
