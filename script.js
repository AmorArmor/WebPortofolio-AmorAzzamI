/* ===================================
   RETRO GAME PORTFOLIO - SCRIPT.JS
   =================================== */

// ─────────────────────────────────────
// 1. PIXEL BACKGROUND
// ─────────────────────────────────────
function createPixelBackground() {
  const container = document.getElementById('pixelBg');
  const colors = [
    'var(--neon-green)',
    'var(--neon-cyan)',
    'var(--neon-purple)',
    'var(--neon-yellow)',
    'var(--neon-pink)'
  ];
  for (let i = 0; i < 35; i++) {
    const dot = document.createElement('div');
    dot.className = 'pixel-dot';
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.bottom = '-10px';
    dot.style.width = (Math.random() * 5 + 2) + 'px';
    dot.style.height = dot.style.width;
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.animationDuration = (Math.random() * 20 + 10) + 's';
    dot.style.animationDelay = (Math.random() * 15) + 's';
    container.appendChild(dot);
  }
}

// ─────────────────────────────────────
// 2. TYPEWRITER EFFECT
// ─────────────────────────────────────
const typewriterTexts = [
  'Selamat datang di portfolio saya!',
  'Mahasiswa Ilmu Komputer yang semangat.',
  'Web Developer & UI/UX Enthusiast.',
  'Siap untuk petualangan baru!',
  'Ready to level up? Let\'s go!'
];
let twIndex = 0;
let twCharIndex = 0;
let twDeleting = false;
let twPause = 0;

function typewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;
  const currentText = typewriterTexts[twIndex];

  if (twPause > 0) { twPause--; setTimeout(typewriter, 80); return; }

  if (!twDeleting) {
    el.textContent = currentText.substring(0, twCharIndex + 1);
    twCharIndex++;
    if (twCharIndex === currentText.length) {
      twDeleting = true;
      twPause = 30;
    }
    setTimeout(typewriter, 80);
  } else {
    el.textContent = currentText.substring(0, twCharIndex - 1);
    twCharIndex--;
    if (twCharIndex === 0) {
      twDeleting = false;
      twIndex = (twIndex + 1) % typewriterTexts.length;
      twPause = 5;
    }
    setTimeout(typewriter, 40);
  }
}

// ─────────────────────────────────────
// 3. NAVBAR SCROLL & ACTIVE STATE
// ─────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });

    // Back to top
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinksEl.classList.remove('open'));
  });
}

// ─────────────────────────────────────
// 4. SCROLL REVEAL
// ─────────────────────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.profil-card, .skill-category, .quest-card, .porto-card, .kontak-info-box, .social-box, .stat-box, .badge-card, .minat-item'
  );
  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────
// 5. SKILL BARS ANIMATION
// ─────────────────────────────────────
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(fill => observer.observe(fill));
}

// ─────────────────────────────────────
// 6. PORTFOLIO FILTER
// ─────────────────────────────────────
function initPortoFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.porto-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeSlideIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ─────────────────────────────────────
// 7. KONTAK FORM
// ─────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('kontak-form');
  const success = document.getElementById('form-success');
  const btn = document.getElementById('btn-kirim');

  btn.textContent = '⏳ MENGIRIM...';
  btn.disabled = true;

  setTimeout(() => {
    form.classList.add('hidden');
    success.classList.remove('hidden');
    showToast('✔ PESAN BERHASIL DIKIRIM!');
  }, 1800);
}

// ─────────────────────────────────────
// 8. MODAL INFOGRAFIS
// ─────────────────────────────────────
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ─────────────────────────────────────
// 9. TOAST NOTIFICATION
// ─────────────────────────────────────
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ─────────────────────────────────────
// 10. BACK TO TOP
// ─────────────────────────────────────
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────
// 11. PIXEL CLICK PARTICLES
// ─────────────────────────────────────
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn-retro') || e.target.closest('.nav-link')) return;
  spawnParticles(e.clientX, e.clientY);
});

function spawnParticles(x, y) {
  const colors = ['#00ff88', '#00e5ff', '#ffe600', '#ff0080', '#c800ff'];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: fixed;
      left: ${x}px; top: ${y}px;
      width: 4px; height: 4px;
      background: ${colors[i % colors.length]};
      pointer-events: none;
      z-index: 9998;
      transform-origin: center;
    `;
    document.body.appendChild(p);
    const angle = (i / 6) * Math.PI * 2;
    const dist = Math.random() * 50 + 20;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    p.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 }
    ], { duration: 500, easing: 'ease-out' }).onfinish = () => p.remove();
  }
}

// ─────────────────────────────────────
// 12. BUTTON SOUND EFFECT (visual only)
// ─────────────────────────────────────
function addButtonEffects() {
  document.querySelectorAll('.btn-retro').forEach(btn => {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });
}

// ─────────────────────────────────────
// 13. NAV LINK CLICK SMOOTH SCROLL
// ─────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ─────────────────────────────────────
// 14. CRT FLICKER EFFECT
// ─────────────────────────────────────
function initCrtFlicker() {
  setInterval(() => {
    if (Math.random() < 0.01) {
      document.body.style.filter = 'brightness(1.15)';
      setTimeout(() => { document.body.style.filter = ''; }, 60);
    }
  }, 2000);
}

// ─────────────────────────────────────
// 15. ACTIVE SECTION HIGHLIGHT
// ─────────────────────────────────────
function initKotak() {
  // Add retro "SELECT" cursor on hover for porto cards
  document.querySelectorAll('.porto-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      showToast(`[ ${this.querySelector('.porto-title').textContent} ]`, 1500);
    });
  });
}

// ─────────────────────────────────────
// INIT ALL
// ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createPixelBackground();
  typewriter();
  initNavbar();
  initScrollReveal();
  initSkillBars();
  initPortoFilter();
  addButtonEffects();
  initSmoothScroll();
  initCrtFlicker();
  initKotak();

  // Style the form in kontak-form - hide success initially
  const formSuccess = document.getElementById('form-success');
  if (formSuccess) formSuccess.classList.add('hidden');

  // Announce loaded
  setTimeout(() => showToast('▶ GAME LOADED! SELAMAT DATANG!', 3000), 1000);
});

// KONTAK FORM is already wired in HTML via onsubmit attribute
