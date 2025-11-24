/* global $ */
// Note: legacy parallax and carousel logic retained but disabled in the DOM/CSS.

// Minimal scroll-based reveal animations and active TOC state
document.addEventListener('DOMContentLoaded', function () {
  var revealElements = document.querySelectorAll('.reveal');
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  var headshot = document.querySelector('header .headshot');

  // Map section id -> nav link
  var linkById = {};
  tocLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    if (id) linkById[id] = link;
  });

  // If IntersectionObserver not supported, just show content and skip active states
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(function (el) {
      el.classList.add('reveal-visible');
    });
    return;
  }

  // Reveal-once observer
  var revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // Active section observer for TOC highlighting
  var sectionIds = Object.keys(linkById);
  var sections = sectionIds.map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  if (!sections.length) return;

  function clearActive() {
    tocLinks.forEach(function (link) {
      link.classList.remove('is-active');
    });
  }

  var activeObserver = new IntersectionObserver(function (entries) {
    // Pick the section with the largest visible area
    var mostVisible = null;

    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
        mostVisible = entry;
      }
    });

    if (mostVisible) {
      var id = mostVisible.target.id;
      var link = linkById[id];
      if (!link) return;
      clearActive();
      link.classList.add('is-active');
    }
  }, {
    // Use a centered band so the active section is the one near the middle of the viewport
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });

  sections.forEach(function (section) {
    activeObserver.observe(section);
  });

  // Trigger headshot drop-in animation
  if (headshot) {
    headshot.classList.add('headshot-animate');
  }
});