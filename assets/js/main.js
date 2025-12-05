document.addEventListener('DOMContentLoaded', function () {
  const navMenu = document.querySelector('.nav-menu');
  if (!navMenu) return;
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const MOBILE_BREAKPOINT = 992; // px - matches css media query

  // Mobile menu toggle
  const overlay = document.getElementById('nav-overlay');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function (e) {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
        const opening = !navMenu.classList.contains('open');
        const overlay = document.getElementById('nav-overlay');
        if (opening) {
          navMenu.classList.add('open');
          if (overlay) overlay.classList.add('open');
          document.documentElement.classList.add('no-scroll');
          // animate toggle to X
          navToggle.classList.add('open');
        } else {
          navMenu.classList.remove('open');
          if (overlay) overlay.classList.remove('open');
          document.documentElement.classList.remove('no-scroll');
          // revert toggle
          navToggle.classList.remove('open');
        }
    });

    // Close mobile menu on resize above breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_BREAKPOINT && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.classList.remove('open');
        document.documentElement.classList.remove('no-scroll');
          // ensure toggle returns to hamburger
          navToggle.classList.remove('open');
      }
    });
  }

  // Toggle dropdowns when their parent link is clicked.
  navMenu.querySelectorAll('.nav-item').forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown || !link) return;

    link.addEventListener('click', function (e) {
      // Prevent navigation when a dropdown exists; toggle instead.
      e.preventDefault();
      const isOpen = dropdown.classList.contains('show');

      // Close other open dropdowns
      document.querySelectorAll('.nav-menu .dropdown.show').forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });

      // Toggle current
      if (isOpen) dropdown.classList.remove('show');
      else dropdown.classList.add('show');
    });
  });

  // Close dropdowns when clicking outside the nav
  document.addEventListener('click', function (e) {
    // if click is outside the open off-canvas, close it
    if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
      document.querySelectorAll('.nav-menu .dropdown.show').forEach(d => d.classList.remove('show'));
      // also close mobile menu if open and click outside
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const overlayEl = document.getElementById('nav-overlay');
        if (overlayEl) overlayEl.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        if (navToggle) navToggle.classList.remove('open');
        document.documentElement.classList.remove('no-scroll');
      }
    }
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-menu .dropdown.show').forEach(d => d.classList.remove('show'));
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const overlayEl = document.getElementById('nav-overlay');
        if (overlayEl) overlayEl.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        if (navToggle) navToggle.classList.remove('open');
        document.documentElement.classList.remove('no-scroll');
      }
    }
  });

  // overlay click closes panel
  const overlayEl = document.getElementById('nav-overlay');
  if (overlayEl) {
    overlayEl.addEventListener('click', function () {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        overlayEl.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        if (navToggle) navToggle.classList.remove('open');
        document.documentElement.classList.remove('no-scroll');
      }
    });
  }

  /* Video modal: open on play-button click, autoplay, and close handlers */
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-iframe');
  const defaultVideo = 'https://www.youtube.com/embed/ScMzIvxBSi4?rel=0&autoplay=1';

  function openVideo(src){
    if (!videoModal) return;
    // choose provided src or default
    const finalSrc = src || defaultVideo;
    // set src to iframe (allow autoplay param in src)
    videoIframe.setAttribute('src', finalSrc);
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('no-scroll');
  }

  function closeVideo(){
    if (!videoModal) return;
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    // stop playback by clearing src
    videoIframe.setAttribute('src', '');
    document.documentElement.classList.remove('no-scroll');
  }

  // click handler on play button(s)
  document.querySelectorAll('.play-button').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // allow optional data-video attribute on the button to override default
      const src = btn.getAttribute('data-video');
      // If user provided a YouTube url or embed URL, use it; if they provided a regular URL, attempt to use as embed
      openVideo(src);
    });
  });

  // close triggers: overlay and any element with [data-close]
  if (videoModal){
    videoModal.addEventListener('click', function(e){
      if (e.target.hasAttribute('data-close')) closeVideo();
    });
  }

  // close on ESC
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape'){
      if (videoModal && videoModal.classList.contains('open')) closeVideo();
    }
  });

  /* Equalize .service-item heights to match the tallest (desktop only) */
  function equalizeServiceItems(){
    const items = Array.from(document.querySelectorAll('.service-item-area .service-item'));
    if (!items.length) return;
    // On narrow screens let the natural flow handle height
    const MIN_BREAKPOINT = 768;
    if (window.innerWidth < MIN_BREAKPOINT){
      items.forEach(it => { it.style.minHeight = ''; });
      return;
    }

    // Reset first to measure natural heights
    items.forEach(it => { it.style.minHeight = ''; });
    let max = 0;
    items.forEach(it => {
      const h = it.getBoundingClientRect().height;
      if (h > max) max = h;
    });
    if (max > 0) items.forEach(it => { it.style.minHeight = Math.ceil(max) + 'px'; });
  }

  // Debounced resize handler
  let _equalizeTimer = null;
  window.addEventListener('resize', function(){
    clearTimeout(_equalizeTimer);
    _equalizeTimer = setTimeout(equalizeServiceItems, 120);
  });

  // Run on load (allow layout/ fonts to settle)
  setTimeout(equalizeServiceItems, 60);
});
