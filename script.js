/* ==========================================
   Maa Katyani Jyotish – script.js
   100% Vanilla JavaScript  (no jQuery, no CDN JS)
   ========================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initHamburger();
    initStickyHeader();
    initScrollTop();
    initLazyImages();
    initTickerDuplicate();
    initMarqueeDuplicate();
  });

  /* ------------------------------------------
     Scroll animations (replaces AOS CDN JS)
     Uses IntersectionObserver + data-aos attrs
  ------------------------------------------ */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback – show everything immediately
      elements.forEach(function (el) { el.classList.add('aos-animate'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el    = entry.target;
          var delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
          setTimeout(function () { el.classList.add('aos-animate'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------
     Hamburger menu
  ------------------------------------------ */
  function initHamburger() {
    var btn  = document.getElementById('hamburgerBtn');
    var menu = document.getElementById('mobileNav');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', open);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', false);
      }
    });

    // Close on nav link click (mobile)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ------------------------------------------
     Sticky header – add shadow class on scroll
  ------------------------------------------ */
  function initStickyHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ------------------------------------------
     Scroll-to-top button
  ------------------------------------------ */
  function initScrollTop() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------
     Lazy image loading (IntersectionObserver)
  ------------------------------------------ */
  function initLazyImages() {
    if (!('IntersectionObserver' in window)) {
      // Fallback – load all immediately
      document.querySelectorAll('img[data-src]').forEach(function (img) {
        img.src = img.dataset.src;
      });
      return;
    }

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    document.querySelectorAll('img[data-src]').forEach(function (img) {
      io.observe(img);
    });
  }

  /* ------------------------------------------
     Ticker & marquee – duplicate content so
     the CSS infinite-scroll loop is seamless
  ------------------------------------------ */
  function initTickerDuplicate() {
    var el = document.querySelector('.ticker-inner');
    if (!el) return;
    el.innerHTML += el.innerHTML;
  }

  function initMarqueeDuplicate() {
    var el = document.querySelector('.marquee-track');
    if (!el) return;
    el.innerHTML += el.innerHTML;
  }

})();
