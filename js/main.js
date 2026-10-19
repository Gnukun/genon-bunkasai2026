/**
 * SAKURASAI LIVE 2026 - OFFICIAL INTERACTION SCRIPT
 * Features: Fixed Navigation Scrollspy, Mobile Drawer,
 *           Scroll Reveal Observer, Ambient Cyber Audio-Wave Canvas,
 *           Accessible Reduced Motion Support.
 * Audio: No background music or sound effects (100% silent).
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. Motion Preference Check
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 02. Header Scroll Effect & Scrollspy
  // --------------------------------------------------------------------------
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function handleHeaderScroll() {
    if (!header) return;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  // Update active state in navigation
  function updateActiveNavLink(currentId) {
    desktopNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Scrollspy via Intersection Observer
  function initScrollspy() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            updateActiveNavLink(id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => spyObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 03. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openMobileMenu() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'メニューを閉じる');
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeMobileMenu);
    }

    // Close when clicking any link in drawer
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 04. Smooth Scroll for Navigation Anchors
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Set URL hash without jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 05. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '50px 0px 0px 0px',
      threshold: 0.05
    });

    revealElements.forEach((el) => {
      // Check if element is already within viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        revealObserver.observe(el);
      }
    });

    // Safety fallback: reveal all after 2.5s in case of headless or fast scrolling
    setTimeout(() => {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    }, 2500);
  }

  // --------------------------------------------------------------------------
  // 06. Ambient Cyber Soundwave Canvas Animation
  // --------------------------------------------------------------------------
  function initCyberCanvas() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = null;
    let step = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track mouse movement softly
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    // Generate lightweight ambient digital wave lines (resembling music frequency)
    const lines = [
      { color: 'rgba(57, 213, 255, 0.22)', speed: 0.012, wavelength: 0.003, amplitude: 35, yRatio: 0.35 },
      { color: 'rgba(20, 127, 193, 0.18)', speed: 0.018, wavelength: 0.004, amplitude: 50, yRatio: 0.42 },
      { color: 'rgba(57, 213, 255, 0.14)', speed: 0.008, wavelength: 0.002, amplitude: 40, yRatio: 0.65 },
      { color: 'rgba(16, 46, 80, 0.08)',   speed: 0.015, wavelength: 0.005, amplitude: 60, yRatio: 0.75 }
    ];

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle soundwave sinusoidal lines
      lines.forEach((line, index) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = index === 0 ? 2 : 1.5;

        const baseY = height * line.yRatio;

        for (let x = 0; x <= width; x += 15) {
          // Distance from mouse to add subtle interaction
          const dx = x - mouseX;
          const dy = baseY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseInfluence = dist < 250 ? (250 - dist) * 0.08 : 0;

          const y = baseY +
            Math.sin(x * line.wavelength + step * line.speed) * line.amplitude +
            Math.cos(x * 0.001 + step * 0.01) * 15 +
            (mouseInfluence ? Math.sin(step * 0.05) * mouseInfluence : 0);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Subtle glowing digital nodes along the first wave
        if (index === 0 && width > 600) {
          const nodeCount = 5;
          for (let i = 1; i <= nodeCount; i++) {
            const nx = (width / (nodeCount + 1)) * i;
            const ny = baseY + Math.sin(nx * line.wavelength + step * line.speed) * line.amplitude;
            ctx.beginPath();
            ctx.arc(nx, ny, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(57, 213, 255, 0.6)';
            ctx.fill();
          }
        }
      });

      step++;
      animationFrameId = requestAnimationFrame(draw);
    }

    if (!prefersReducedMotion) {
      draw();
    } else {
      // For reduced motion: draw once without animation loop
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1;
        const baseY = height * line.yRatio;
        ctx.moveTo(0, baseY);
        ctx.lineTo(width, baseY);
        ctx.stroke();
      });
    }

    // Pause canvas animation when tab is not visible to save CPU/battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        if (!prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(draw);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 07. Initialization on DOMContentLoaded
  // --------------------------------------------------------------------------
  function init() {
    document.documentElement.classList.add('js-ready');
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
    initScrollspy();
    initScrollReveal();
    initCyberCanvas();

    // Support query param for direct section view: e.g. ?section=timetable
    const urlParams = new URLSearchParams(window.location.search);
    const targetSection = urlParams.get('section') || urlParams.get('scroll');
    if (targetSection) {
      const targetEl = document.getElementById(targetSection);
      if (targetEl) {
        setTimeout(() => {
          const headerOffset = 70;
          const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo(0, pos);
          handleHeaderScroll();
          updateActiveNavLink(targetSection);
        }, 100);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
