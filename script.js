/* ================================================================
   HAMDHAN MOHAMED — Portfolio Script
   ================================================================ */

/* ── 1. Custom Cursor ── */
const dot  = document.getElementById('curDot');
const ring = document.getElementById('curRing');
let mX = 0, mY = 0, rX = 0, rY = 0;

document.addEventListener('mousemove', e => {
  mX = e.clientX; mY = e.clientY;
  dot.style.left = mX + 'px';
  dot.style.top  = mY + 'px';
});

(function animRing() {
  rX += (mX - rX) * 0.14;
  rY += (mY - rY) * 0.14;
  ring.style.left = rX + 'px';
  ring.style.top  = rY + 'px';
  requestAnimationFrame(animRing);
})();

document.addEventListener('mouseover', e => {
  if (e.target.closest('a,button,.cert-card,.proj-card,.sk-card,.vol-card,.sk-tags span,.soc-link,input,textarea')) {
    ring.classList.add('hover');
    dot.classList.add('pulse');
  } else {
    ring.classList.remove('hover');
    dot.classList.remove('pulse');
  }
});

/* ── 2. Reveal system ──────────────────────────────────────────
   Two classes are animated:
     .fu  = fade-up  (opacity + translateY)   — every item
     .ci  = clip-in  (clip-path, h2 headings) — section titles
   Strategy:
     a) IntersectionObserver fires .visible as elements enter view
     b) A scroll-backup checks every 200ms for any missed elements
     c) On DOMContentLoaded a pass reveals anything already in view
     d) Hard fallback: after 1.5s force-reveal everything remaining
   ─────────────────────────────────────────────────────────── */

function revealEl(el) {
  if (!el.classList.contains('visible')) {
    el.classList.add('visible');
  }
}

function revealAllInView() {
  document.querySelectorAll('.fu:not(.visible), .ci:not(.visible)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 60) revealEl(el);
  });
}

// a) IntersectionObserver — threshold 0 so ANY pixel triggers it
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) revealEl(e.target); });
}, { threshold: 0, rootMargin: '0px 0px 60px 0px' });

document.querySelectorAll('.fu, .ci').forEach(el => io.observe(el));

// b) Scroll backup — catches anything the observer misses
let scrollTimer;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(revealAllInView, 80);
}, { passive: true });

// c) Immediate pass on load
document.addEventListener('DOMContentLoaded', () => {
  revealAllInView();

  // d) Hard fallback — after 1.5 s reveal EVERYTHING still hidden
  setTimeout(() => {
    document.querySelectorAll('.fu:not(.visible), .ci:not(.visible)').forEach(revealEl);
  }, 1500);
});

// Also run on load event in case DOMContentLoaded already fired
window.addEventListener('load', revealAllInView);

/* ── 3. Typed.js ── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-name', {
      strings: ['Hamdhan Mohamed'],
      typeSpeed: 68, loop: false,
      showCursor: true, cursorChar: '|',
      onComplete(self) {
        setTimeout(() => self.cursor && self.cursor.remove(), 1200);
      }
    });
  }

  /* ── 4. Navbar scroll spy ── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const sections = document.querySelectorAll('section[id], header[id]');
  const btt      = document.getElementById('btt');

  function updateNav() {
    const sy = window.scrollY;
    navbar.classList.toggle('scrolled', sy > 50);
    btt.classList.toggle('show', sy > 400);
    let cur = '';
    sections.forEach(s => { if (sy >= s.offsetTop - 130) cur = s.id; });
    navLinks.forEach(a => {
      a.classList.remove('active');
      const h = a.getAttribute('href');
      if (h === '#' + cur || (cur === '' && h === '#hero')) a.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── 5. Hamburger ── */
  const burger  = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');
  burger.addEventListener('click', () => { burger.classList.toggle('active'); navMenu.classList.toggle('active'); });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('active'); navMenu.classList.remove('active'); }));
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
      burger.classList.remove('active'); navMenu.classList.remove('active');
    }
  });

  /* ── 6. Stat counters ── */
  const cntIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target;
      let n = 0;
      const step = Math.max(1, Math.ceil(target / 36));
      const t = setInterval(() => { n = Math.min(n + step, target); el.textContent = n; if (n >= target) clearInterval(t); }, 32);
      cntIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => cntIO.observe(el));

  /* ── 7. Lightbox ── */
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCnt = document.getElementById('lb-count');
  const imgs  = [...document.querySelectorAll('.cert-card img')].map(i => i.src);
  let lbI = 0;

  function openLB(i)  { lbI = i; lbImg.src = imgs[lbI]; lbCnt.textContent = (lbI+1)+' / '+imgs.length; lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeLB()  { lb.classList.remove('active'); document.body.style.overflow = ''; }
  function navLB(d)   { lbI = (lbI+d+imgs.length)%imgs.length; lbImg.src = imgs[lbI]; lbCnt.textContent = (lbI+1)+' / '+imgs.length; }

  document.querySelectorAll('.cert-card').forEach((c,i) => c.addEventListener('click', () => openLB(i)));
  document.getElementById('lb-close').addEventListener('click', closeLB);
  document.getElementById('lb-prev').addEventListener('click', () => navLB(-1));
  document.getElementById('lb-next').addEventListener('click', () => navLB(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowRight') navLB(1);
    if (e.key === 'ArrowLeft')  navLB(-1);
  });

  /* ── 8. Contact form ── */
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form && form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit'), span = btn.querySelector('span');
    span.textContent = 'Sending…'; btn.disabled = true;
    try {
      const res = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{Accept:'application/json'} });
      if (res.ok) { status.textContent = 'Message sent — thank you for reaching out.'; status.className = 'success'; form.reset(); }
      else throw new Error();
    } catch { status.textContent = 'Something went wrong. Please try again.'; status.className = 'error'; }
    span.textContent = 'Send Message'; btn.disabled = false;
  });

  /* ── 9. Resume role typewriter ── */
  const roles = ['Cybersecurity Student','Web Developer','UI/UX Designer','Problem Solver'];
  let ri = 0, ci = 0, del = false;
  const roleEl = document.querySelector('.typed-word');
  function typeRole() {
    if (!roleEl) return;
    const w = roles[ri];
    if (del) { roleEl.textContent = w.substring(0,--ci); if (ci < 0) { del=false; ri=(ri+1)%roles.length; setTimeout(typeRole,380); return; } }
    else      { roleEl.textContent = w.substring(0,++ci); if (ci > w.length) { del=true; setTimeout(typeRole,1700); return; } }
    setTimeout(typeRole, del ? 48 : 82);
  }
  typeRole();

}); // end DOMContentLoaded

/* ── 10. Back to top ── */
document.getElementById('btt').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
