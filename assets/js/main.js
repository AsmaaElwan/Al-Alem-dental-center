/* --- block from line ~1086 --- */
document.querySelectorAll('.acc-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.acc-item');
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// Counter Cards
const counters = document.querySelectorAll('.counter-num');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 16);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => observer.observe(c));

/* --- block from line ~1649 --- */
(() => {
  const track    = document.getElementById('svcSliderTrack');
  const dotsWrap = document.getElementById('svcSliderDots');
  if (!track || !dotsWrap) return;
  const isRTL    = document.documentElement.dir === 'rtl';

  /* ── Mobile: 4 cards/slide (2×2) — all sizes < 768px ── */
  if (window.innerWidth < 768) {
    const allCards  = Array.from(track.querySelectorAll('.service-card'));
    const groupDefs = [[0,1,2,3],[4,5,6,7]];

    track.innerHTML = '';
    groupDefs.forEach(indices => {
      const group = document.createElement('div');
      group.className = 'svc-slide-group';
      indices.forEach(idx => {
        const card = allCards[idx];
        if (card) group.appendChild(card);
      });
      track.appendChild(group);
    });
  }

  const dots      = Array.from(dotsWrap.querySelectorAll('.svc-slider-dot'));
  const realCount = dots.length;

  /* ── Clone first group → seamless infinite loop (no reverse jump) ── */
  const cloneGroup = track.querySelector('.svc-slide-group').cloneNode(true);
  track.appendChild(cloneGroup);
  const totalGroups = realCount + 1;
  track.style.width = (totalGroups * 100) + '%';
  Array.from(track.querySelectorAll('.svc-slide-group')).forEach(g => {
    g.style.width = (100 / totalGroups) + '%';
  });

  let cur = 0;

  function goTo(idx, instant) {
    cur = idx;
    const clipW = track.parentElement.offsetWidth;
    const offset = idx * -clipW;
    if (instant) {
      track.style.transition = 'none';
      track.style.transform  = `translateX(${offset}px)`;
      requestAnimationFrame(() => requestAnimationFrame(() => { track.style.transition = ''; }));
    } else {
      track.style.transform = `translateX(${offset}px)`;
    }
    dots.forEach((d, i) => d.classList.toggle('active', i === idx % realCount));
  }

  /* After reaching clone, silently jump back to real first slide */
  track.addEventListener('transitionend', e => {
    if (e.propertyName === 'transform' && cur === realCount) goTo(0, true);
  });

  setTimeout(() => goTo(0), 0);
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  let timer = setInterval(() => goTo(cur + 1 <= realCount ? cur + 1 : realCount), 5000);
  track.closest('.svc-cards-wrapper').addEventListener('mouseenter', () => clearInterval(timer));
  track.closest('.svc-cards-wrapper').addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(cur + 1 <= realCount ? cur + 1 : realCount), 5000);
  });
})();

/* --- block from line ~1755 --- */
(function () {
  var wrap = document.querySelector('.ba-carousel-wrap');
  if (!wrap) return;
  var track  = wrap.querySelector('.ba-track');
  var cards  = Array.from(track.querySelectorAll('.ba-card'));
  var dots   = Array.from(wrap.querySelectorAll('.ba-dot'));
  var total  = cards.length;
  var active = 0;
  function goTo(idx) {
    if (idx < 0) idx = total - 1;
    if (idx >= total) idx = 0;
    active = idx;
    cards.forEach(function(c) { c.className = 'ba-card'; });
    cards[active].classList.add('is-active');
    var prev  = (active - 1 + total) % total;
    var next  = (active + 1) % total;
    var prev2 = (active - 2 + total) % total;
    var next2 = (active + 2) % total;
    cards[prev].classList.add('is-prev');
    cards[next].classList.add('is-next');
    cards[prev2].classList.add('is-prev2');
    cards[next2].classList.add('is-next2');
    dots.forEach(function(d, i) { d.classList.toggle('active', i === active); });
  }
  dots.forEach(function(d, i) { d.addEventListener('click', function() { goTo(i); }); });
  cards.forEach(function(c, i) { c.addEventListener('click', function() { goTo(i); }); });
  goTo(0);
  setInterval(function() { goTo(active - 1); }, 5000);
})();

/* --- block from line ~1993 --- */
(function() {
  var outer = document.getElementById('vidTstOuter');
  var grid  = document.getElementById('vidTstGrid');
  if (!grid || !outer) return;

  /* ── First frame ── */
  grid.querySelectorAll('.vid-video').forEach(function(v) {
    v.addEventListener('loadedmetadata', function() { v.currentTime = 0.01; });
    if (v.readyState >= 1) v.currentTime = 0.01;
  });

  /* ── Modal ── */
  var modal      = document.getElementById('vidModal');
  var modalVideo = document.getElementById('vidModalVideo');
  var modalClose = document.getElementById('vidModalClose');
  function openModal(src) {
    modalVideo.src = src;
    modal.style.display = 'flex';
    modalVideo.play().catch(function(){});
  }
  function closeModal() {
    modalVideo.pause(); modalVideo.src = '';
    modal.style.display = 'none';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });

  /* ── Click → modal ── */
  grid.querySelectorAll('.vid-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var v = card.querySelector('video');
      var src = v ? (v.src || v.currentSrc) : '';
      if (src) openModal(src);
    });
  });

  /* ── Card width by viewport ── */
  var cardW = window.innerWidth > 1024 ? 175 : (window.innerWidth > 767 ? 120 : 100);
  Array.from(grid.querySelectorAll('.vid-card')).forEach(function(c) {
    c.style.setProperty('flex', '0 0 ' + cardW + 'px', 'important');
    c.style.setProperty('width', cardW + 'px', 'important');
  });

  /* ── Marquee (all screens) ── */
  if (true) {
    var origCards = Array.from(grid.querySelectorAll('.vid-card'));
    for (var ci = 0; ci < 3; ci++) {
      origCards.forEach(function(c) {
        var cl = c.cloneNode(true);
        cl.style.pointerEvents = 'none';
        cl.querySelectorAll('video').forEach(function(v) { v.currentTime = 0.01; });
        grid.appendChild(cl);
      });
    }

    var SPEED = 0.5, paused = false, xPos = 0, totalW = 0;
    function calcTotal() {
      var cards = grid.querySelectorAll('.vid-card');
      if (cards.length >= origCards.length + 1)
        totalW = cards[origCards.length].offsetLeft - cards[0].offsetLeft;
      xPos = -totalW;
    }
    setTimeout(calcTotal, 600);

    function tick() {
      if (!paused && totalW > 0) {
        xPos += SPEED;
        if (xPos >= 0) xPos -= totalW;
        grid.style.transform = 'translateX(' + xPos + 'px)';
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    outer.addEventListener('mouseenter', function() { paused = true; });
    outer.addEventListener('mouseleave', function() { paused = false; });
  } else {
    outer.style.overflowX = 'auto';
    outer.style.overflowY = 'hidden';
    outer.style.webkitOverflowScrolling = 'touch';
    outer.style.scrollbarWidth = 'none';
    grid.style.transform = 'none';
    grid.style.width = 'max-content';
    Array.from(grid.querySelectorAll('.vid-card')).forEach(function(c) {
      c.style.setProperty('flex', '0 0 ' + cardW + 'px', 'important');
      c.style.setProperty('width', cardW + 'px', 'important');
    });
  }
})();

/* --- block from line ~2389 --- */
(function() {
  var track = document.getElementById('tstTrack');
  var wrap  = document.getElementById('tstWrap');
  if (!track || !wrap) return;

  var GAP   = 60;
  var SPEED = 1.5;
  var paused = false;
  var xPos   = 0;
  var totalW = 0;

  track.style.cssText += ';transition:none;display:flex;flex-wrap:nowrap;width:max-content;';
  wrap.style.overflow = 'hidden';

  var origCards = Array.from(track.querySelectorAll('.tst-card'));

  // build dots
  var dotsWrap = document.getElementById('tstDots');
  if (dotsWrap) {
    origCards.forEach(function(_, i) {
      var d = document.createElement('button');
      d.className = 'tst-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'slide ' + (i + 1));
      dotsWrap.appendChild(d);
    });
  }
  var dotEls = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.tst-dot')) : [];
  var lastActive = 0;
  var animating = false;
  var animTarget = 0;
  var animStart = 0;
  var animDuration = 500;
  var animStartTime = 0;

  function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

  function animateTo(target) {
    animating = true;
    animTarget = target;
    animStart = xPos;
    animStartTime = performance.now();
  }

  function updateDots() {
    if (!dotEls.length || !totalW) return;
    var pos = ((-xPos) % totalW + totalW) % totalW;
    var cardW = totalW / origCards.length;
    var idx = Math.round(pos / cardW) % origCards.length;
    if (idx < 0) idx += origCards.length;
    if (idx >= origCards.length) idx = 0;
    if (idx !== lastActive) {
      dotEls[lastActive].classList.remove('active');
      dotEls[idx].classList.add('active');
      lastActive = idx;
    }
  }

  function tick(now) {
    if (animating) {
      var elapsed = now - animStartTime;
      var progress = Math.min(elapsed / animDuration, 1);
      xPos = animStart + (animTarget - animStart) * easeInOut(progress);
      if (progress >= 1) { xPos = animTarget; animating = false; }
      track.style.transform = 'translateX(' + xPos + 'px)';
      updateDots();
    } else if (!paused) {
      xPos += SPEED;
      if (xPos >= 0) xPos -= totalW;
      track.style.transform = 'translateX(' + xPos + 'px)';
      updateDots();
    }
    requestAnimationFrame(tick);
  }

  setTimeout(function() {
    for (var i = 0; i < 8; i++) {
      origCards.forEach(function(c) { track.appendChild(c.cloneNode(true)); });
    }
    var allCards = track.querySelectorAll('.tst-card');
    totalW = allCards[origCards.length].offsetLeft - allCards[0].offsetLeft;
    if (totalW <= 0) totalW = track.scrollWidth / 9;
    xPos = -totalW;

    dotEls.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        if (!totalW) return;
        var cardW = totalW / origCards.length;
        var targetX = -(i * cardW);
        var cur = ((xPos % totalW) - totalW) % totalW;
        xPos = cur;
        animateTo(targetX);
        paused = true;
        setTimeout(function() { paused = false; }, animDuration + 200);
      });
    });

    if (totalW > 0) requestAnimationFrame(tick);
  }, 600);

  wrap.addEventListener('mouseenter', function() { paused = true; });
  wrap.addEventListener('mouseleave', function() { paused = false; });
})();

/* --- block from line ~2517 --- */
(() => {
  const hp     = document.querySelector('.svc-handpiece');
  const spray  = document.querySelector('.svc-water-spray');
  const svc    = document.getElementById('services');
  const ft     = document.querySelector('footer') || document.querySelector('[class*="footer"]');
  if (!hp || !spray || !svc) return;

  function update() {
    const svcT = svc.getBoundingClientRect().top;
    const svcB = svc.getBoundingClientRect().bottom;
    const vh   = window.innerHeight;
    const ftT  = ft ? ft.getBoundingClientRect().top : document.body.scrollHeight - window.scrollY;
    const show = svcT < vh * 0.75 && (ft ? ftT > vh * 0.25 : svcB > vh * 0.1);
    hp.classList.toggle('hp-show', show);
    spray.classList.toggle('hp-show', show);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* --- block from line ~2641 --- */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  function initBookAnim() {
    const { clipWrap, goTo, getCount, total } = window.__pbBook;
    const FLIP_DELAY = 2400; // ms between each page
    let autoStopped = false;

    /* Stop auto-flip if user clicks manually */
    const stopAuto = () => { autoStopped = true; };
    document.getElementById('pbNext')?.addEventListener('click', stopAuto, { once: true });
    document.getElementById('pbPrev')?.addEventListener('click', stopAuto, { once: true });

    /* Recursive flip function */
    function flipNext() {
      if (autoStopped) return;

      if (getCount() >= total) {
        /* Reached last page — fast-close back to cover */
        setTimeout(() => {
          if (autoStopped) return;
          window.__pbBook.fastClose(() => {
            /* After fast close: pause then restart */
            setTimeout(() => {
              if (autoStopped) return;
              goTo(1);
              setTimeout(flipNext, FLIP_DELAY);
            }, 3000);
          });
        }, FLIP_DELAY);
        return;
      }

      goTo(getCount() + 1);
      setTimeout(flipNext, FLIP_DELAY);
    }

    /* Book starts hidden — slides in from the right (same as Arabic) */
    gsap.set(clipWrap, { opacity: 0, x: 60 });

    ScrollTrigger.create({
      trigger: '#testimonials',
      start: 'top 65%',
      once: true,
      onEnter() {
        gsap.to(clipWrap, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          onComplete() {
            /* Open first page then continue auto-flipping */
            setTimeout(() => {
              goTo(1);
              setTimeout(flipNext, FLIP_DELAY);
            }, 300);
          }
        });
      }
    });

    ScrollTrigger.refresh();
  }

  /* ── About Section GSAP Animation ── */
  gsap.set('.about-m-eyebrow', { opacity: 0, x: -30 });
  gsap.set('.about-m-name',    { opacity: 0, y: 30 });
  gsap.set('.about-m-role',    { opacity: 0, y: 20 });
  gsap.set('.about-m-photo',   { opacity: 0, scale: 0.92 });
  gsap.set('.about-m-pill',    { opacity: 0, x: 40 });
  gsap.set('.about-m-bio',     { clipPath: 'inset(0 100% 0 0)' });

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    once: true,
    onEnter: function() {
      gsap.to('.about-m-eyebrow', { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' });
      gsap.to('.about-m-name',    { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.4 });
      gsap.to('.about-m-role',    { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.7 });
      gsap.to('.about-m-photo',   { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.8 });
      gsap.to('.about-m-pill',    { opacity: 1, x: 0, duration: 1.0, ease: 'power2.out', stagger: 0.25, delay: 1.1 });
      gsap.to('.about-m-bio',     { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut', delay: 1.5, stagger: 0.4 });
    }
  });

  /* ── Booking Form GSAP Animation ── */
  gsap.set('.hero-booking-form', { opacity: 0, y: 60, scale: 0.97 });
  ScrollTrigger.create({
    trigger: '.hero-booking-form',
    start: 'top 85%',
    once: true,
    onEnter: function() {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 960px)').matches;
      tl.to('.hero-booking-form', { opacity: 1, y: isTablet ? -25 : 0, scale: 1, duration: 0.8 })
        .fromTo('.hbf-title',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        .fromTo('.hbf-divider',
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')
        .fromTo('.hbf-field',
          { opacity: 0, y: 22, x: -10 },
          { opacity: 1, y: 0, x: 0, duration: 0.5, stagger: 0.13 }, '-=0.15')
        .fromTo('.hbf-submit',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, '-=0.1');
    }
  });

  /* If book is ready → run immediately, otherwise wait */
  if (window.__pbBook) {
    initBookAnim();
  } else {
    Object.defineProperty(window, '__pbBook', {
      configurable: true,
      set(val) {
        Object.defineProperty(window, '__pbBook', { value: val, writable: true });
        initBookAnim();
      }
    });
  }
})();

/* --- block from line ~2775 --- */
Splitting();

gsap.registerPlugin(ScrollTrigger);

/* ── 1. Navbar Reveal ── */
const navTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
navTl
  .from('.logo-img', { y: -40, opacity: 0, duration: 0.7, clearProps: 'all' })
  .from('.nav-links li', { y: -30, opacity: 0, duration: 0.5, stagger: 0.07, clearProps: 'all' }, '-=0.3')
  .from('.btn-lang',  { y: -30, opacity: 0, duration: 0.5, clearProps: 'all' }, '-=0.3')
  .from('.btn-book',  { y: -30, opacity: 0, duration: 0.5, scale: 0.9, clearProps: 'all' }, '-=0.3');

/* ── 2. Hero Content Timeline ── */
const heroTl = gsap.timeline({ delay: 0.4, defaults: { ease: 'power3.out' } });

heroTl
  .fromTo('.eyebrow-line',
    { width: 0 },
    { width: 32, duration: 0.7, ease: 'power2.inOut' }
  )
  .from('.hero-eyebrow', { opacity: 0, x: -20, duration: 0.6 }, '-=0.4')
  .from('.hero-line-1', {
    opacity: 0,
    y: 80,
    rotationX: -55,
    transformOrigin: '50% 0%',
    duration: 0.85,
    ease: 'back.out(1.5)'
  }, '-=0.2')
  .from('.hero-line-2', {
    opacity: 0,
    y: 80,
    rotationX: -55,
    transformOrigin: '50% 0%',
    duration: 0.85,
    ease: 'back.out(1.5)'
  }, '-=0.55')
  .from('.hero-sub', {
    opacity: 0,
    y: 24,
    filter: 'blur(6px)',
    duration: 0.7,
    ease: 'power2.out'
  }, '-=0.2')
  .from('.hero-btns a', {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.55,
    ease: 'back.out(1.2)'
  }, '-=0.3')
  .from('.stat-divider', { scaleY: 0, duration: 0.4, stagger: 0.1, transformOrigin: 'center' }, '-=0.2')
  .from('.stat-item',    { y: 20, opacity: 0, stagger: 0.15, duration: 0.5 }, '-=0.3')
  .call(() => {
    const opts = { duration: 2.2, useEasing: true, useGrouping: true };
    new countUp.CountUp('stat-years',        15,   { ...opts, prefix: '+' }).start();
    new countUp.CountUp('stat-clients',      20000, { ...opts, prefix: '+', separator: '.' }).start();
    new countUp.CountUp('stat-satisfaction', 100,  { ...opts, suffix: '%' }).start();
  }, null, '-=0.4');

/* ── Hero Slides ── */
const slides    = document.querySelectorAll('.hero-slide');
let current     = 0;
let isAnimating = false;
const SOFT      = 40;

function setMask(el, p) {
  const solid = Math.min(p, 100);
  const edge  = Math.min(p + SOFT, 100);
  el.style.webkitMaskImage =
    `linear-gradient(to right, black 0%, black ${solid}%, transparent ${edge}%, transparent 100%)`;
  el.style.maskImage = el.style.webkitMaskImage;
}

function clearMask(el) {
  el.style.webkitMaskImage = '';
  el.style.maskImage = '';
}

let kbTween = null;
function startKB(el) {
  if (kbTween) kbTween.kill();
  kbTween = gsap.fromTo(el,
    { scale: 1,    xPercent: 0,  yPercent: 0  },
    { scale: 1.10, xPercent: -2, yPercent: -1,
      duration: 8, ease: 'none' }
  );
}

slides.forEach((s, i) => {
  gsap.set(s, { zIndex: 1 });
  if (i !== 0) gsap.set(s, { opacity: 0 });
});
gsap.set(slides[0], { opacity: 1, zIndex: 2 });
startKB(slides[0]);

function goToSlide(next) {
  if (isAnimating || next === current) return;
  isAnimating = true;

  const prev = current;
  current    = next;

  if (kbTween) kbTween.kill();

  gsap.set(slides[current], {
    opacity: 1, zIndex: 3,
    scale: 1, xPercent: 0, yPercent: 0
  });
  setMask(slides[current], 0);

  const tv = { p: 0 };

  gsap.to(tv, {
    p: 120,
    duration: 1.8,
    ease: 'power1.inOut',
    onUpdate() {
      setMask(slides[current], tv.p);
    },
    onComplete() {
      clearMask(slides[current]);
      gsap.set(slides[prev], {
        opacity: 0, zIndex: 1,
        scale: 1, xPercent: 0, yPercent: 0
      });
      gsap.set(slides[current], { zIndex: 2 });
      isAnimating = false;
      startKB(slides[current]);
    }
  });
}

setInterval(() => goToSlide((current + 1) % slides.length), 5000);

/* --- block from line ~2906 --- */
/* ── Section Scroll Reveal Animations ── */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const isRTL = document.documentElement.dir === 'rtl';
  const xIn   = isRTL ? 50 : -50;
  const xOut  = isRTL ? -50 : 50;

  function onEnter(trigger, fn, start) {
    const el = document.querySelector(trigger);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: start || 'top 82%',
      once: true,
      onEnter: fn
    });
  }

  /* ── ABOUT ── */
  onEnter('.about', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });
    tl.from('.about-eyebrow',     { opacity: 0, x: xIn,  duration: 0.65 })
      .from('.about-title',       { opacity: 0, y: 35,   duration: 0.65 }, '-=0.35')
      .from('.about-features li', { opacity: 0, y: 28,   stagger: 0.09, duration: 0.5 }, '-=0.3')
      .from('.about-btns',        { opacity: 0, y: 22,   duration: 0.5 }, '-=0.2')
      .from('.about-mosaic',      { opacity: 0, x: xOut, duration: 0.85, ease: 'power2.out' }, '<0.2');
  });

  /* ── SERVICES ── */
  onEnter('.services', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });
    tl.from('.services-header',  { opacity: 0, y: 35,   duration: 0.65 })
      .from('.service-card',     { opacity: 0, y: 45, scale: 0.94, stagger: 0.1, duration: 0.55, ease: 'back.out(1.2)' }, '-=0.25');
  });

  /* ── BEFORE & AFTER ── */
  onEnter('.ba-section', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });
    tl.from('.ba-header', { opacity: 0, y: 35, duration: 0.65 })
      .from('.ba-card',   { opacity: 0, y: 45, stagger: 0.12, duration: 0.6 }, '-=0.25');
  });

  /* ── VIDEO TESTIMONIALS ── */
  onEnter('#video-testimonials', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });
    tl.from('.vid-tst-eyebrow', { opacity: 0, y: 20, duration: 0.5 })
      .from('.vid-tst-title',   { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
      .from('.vid-tst-subtitle',{ opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
  }, 'top 80%');

  /* ── TESTIMONIALS ── */
  onEnter('#testimonials', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });
    tl.from('.tst-eyebrow',    { opacity: 0, y: 20, duration: 0.5 })
      .from('.tst-title',      { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
      .from('.tst-subtitle',   { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
      .from('.tst-card',       { opacity: 0, y: 50, scale: 0.95, stagger: 0.15, duration: 0.65, ease: 'back.out(1.2)' }, '-=0.1')
      .from('.tst-dots',       { opacity: 0, y: 10, duration: 0.4 }, '-=0.2');
  }, 'top 80%');

  /* ── BADGES ── */
  onEnter('.badges-bar', () => {
    gsap.from('.badge-card, .badge-iso', {
      opacity: 0, y: 30, scale: 0.92,
      stagger: 0.15, duration: 0.6,
      ease: 'back.out(1.2)', clearProps: 'all'
    });
  });

  /* ── FOOTER ── */
  onEnter('.site-footer', () => {
    gsap.from('.footer-col', {
      opacity: 0, y: 30,
      stagger: 0.12, duration: 0.6,
      ease: 'power3.out', clearProps: 'all'
    });
  });

})();

/* --- block from line ~3001 --- */
(function() {
  const STEP = 500, HOLD = 2000, FADE = 1200;

  function runPaperReveal() {
    const items = [...document.querySelectorAll('.apb')];
    if (!items.length) return;

    items.forEach((el, i) => setTimeout(() => el.classList.add('show'), i * STEP));

    const showDone = items.length * STEP + FADE;
    setTimeout(() => {
      items.forEach((el, i) => setTimeout(() => el.classList.remove('show'), i * STEP));
      setTimeout(runPaperReveal, items.length * STEP + FADE + 300);
    }, showDone + HOLD);
  }

  setTimeout(runPaperReveal, 800);
})();

/* --- block from line ~3022 --- */
/* ── Hamburger menu (< 500px) ── */
(function() {
  var btn     = document.getElementById('hamburgerBtn');
  var overlay = document.getElementById('mobileNavOverlay');
  if (!btn || !overlay) return;

  function closeMenu() {
    overlay.classList.remove('is-open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  /* Split each nav link into letter spans once */
  overlay.querySelectorAll('.mobile-nav-links a:not(.mobile-lang-btn)').forEach(function(a) {
    if (a.dataset.split) return;
    a.dataset.split = '1';
    var text = a.textContent;
    a.textContent = '';
    text.split('').forEach(function(ch) {
      var s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.display = 'inline-block';
      a.appendChild(s);
    });
  });

  btn.addEventListener('click', function() {
    var open = overlay.classList.toggle('is-open');
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));

    if (open) {
      /* Letter-by-letter reveal per link */
      overlay.querySelectorAll('.mobile-nav-links a').forEach(function(a, i) {
        var letters = a.querySelectorAll('span');
        gsap.fromTo(letters,
          { opacity: 0, y: 20, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.4, stagger: 0.04,
            ease: 'back.out(1.6)', delay: i * 0.1, clearProps: 'all' }
        );
      });
      /* Lang button slide up */
      var langBtn = overlay.querySelector('.mobile-lang-btn');
      if (langBtn) gsap.fromTo(langBtn,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.45 }
      );
    }
  });

  overlay.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e) {
    if (!btn.contains(e.target) && !overlay.contains(e.target)) closeMenu();
  });
})();

/* --- block from line ~3083 --- */
/* ── Nav Particles ── */
(function() {
  var canvas  = document.getElementById('navParticles');
  var overlay = document.getElementById('mobileNavOverlay');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var raf, running = false;

  var COLORS = ['#7E828B','#A8ABB3','#D8D8D8','#ffffff'];
  var particles = [];

  function resize() {
    canvas.width  = overlay.offsetWidth;
    canvas.height = overlay.offsetHeight;
  }

  function spawn() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function init() {
    particles = [];
    for (var i = 0; i < 38; i++) {
      var p = spawn();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p, i) {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) particles[i] = spawn();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    if (running) raf = requestAnimationFrame(tick);
  }

  function start() {
    resize();
    init();
    running = true;
    tick();
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  var observer = new MutationObserver(function() {
    if (overlay.classList.contains('is-open')) start();
    else stop();
  });
  observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
})();

/* --- block from line ~3159 --- */
/* ── Dropdown toggle on arrow button only ── */
(function(){
  document.querySelectorAll('.nav-has-drop').forEach(function(item){
    var btn = item.querySelector('.drop-toggle');
    if(!btn) return;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var isOpen = item.classList.contains('drop-open');
      document.querySelectorAll('.nav-has-drop').forEach(function(i){ i.classList.remove('drop-open'); });
      if(!isOpen) item.classList.add('drop-open');
    });
  });
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav-has-drop')){
      document.querySelectorAll('.nav-has-drop').forEach(function(i){ i.classList.remove('drop-open'); });
    }
  });
})();


/* --- block from line ~3271 --- */
var SHEET_URL = 'https://script.google.com/macros/s/AKfycbwMZ2XWqzMZmYblsw66HuOneWbPEDMmPg57c0FtGGHFE1QkaFQ90bf_l5WbBUzc4PPB/exec';

function showFormMsg(formEl, msg, color) {
  var existing = formEl.querySelector('.form-msg');
  if (existing) existing.remove();
  var div = document.createElement('div');
  div.className = 'form-msg';
  div.textContent = msg;
  div.style.cssText = 'margin-top:10px;padding:10px;border-radius:6px;text-align:center;font-weight:600;background:' + (color || '#d4edda') + ';color:' + (color ? '#fff' : '#155724') + ';';
  formEl.appendChild(div);
  setTimeout(function() { if (div.parentNode) div.remove(); }, 5000);
}

function submitToSheet(formEl, onSuccess) {
  var requiredFields = ['name','phone','date','time','service'];
  var allFields = ['name','phone','email','date','time','service'];
  var valid = true;
  requiredFields.forEach(function(n) {
    var el = formEl[n];
    if (!el) return;
    if (!el.value) { el.classList.add('error'); valid = false; }
    else el.classList.remove('error');
  });
  if (!valid) return;

  var submitBtn = formEl.querySelector('[type="submit"]');
  var originalText = submitBtn ? submitBtn.textContent : '';
  if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add('loading'); submitBtn.textContent = 'Sending'; }

  var data = {};
  allFields.forEach(function(n) {
    var el = formEl[n];
    if (el) data[n] = el.value;
  });

  fetch(SHEET_URL, { method: 'POST', body: JSON.stringify(data), mode: 'no-cors', headers: { 'Content-Type': 'text/plain' } })
    .then(function() {
      formEl.reset();
      showFormMsg(formEl, '✅ Your booking request has been sent successfully!');
      window.location.hash = 'booked';
      if (onSuccess) setTimeout(onSuccess, 1500);
    })
    .catch(function() {
      showFormMsg(formEl, '❌ Something went wrong, please try again.', '#e53');
    })
    .finally(function() {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove('loading'); submitBtn.textContent = originalText; }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // Hero inline form submit (EN)
  var heroForm = document.getElementById('heroBookingForm');
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitToSheet(heroForm);
    });
  }

  // Hero inline form submit (AR)
  var heroFormAr = document.getElementById('heroBookingFormAr');
  if (heroFormAr) {
    heroFormAr.addEventListener('submit', function(e) {
      e.preventDefault();
      submitToSheet(heroFormAr);
    });
  }

  var modal = document.getElementById('bookingModal');

  if (modal) {
    // Open modal
    document.querySelectorAll('.btn-book, .booking-trigger').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close on X button
    var bmClose = document.getElementById('bmClose');
    if (bmClose) {
      bmClose.addEventListener('click', function() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close on backdrop click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Modal form submit
  var bmForm = document.getElementById('bmForm');
  if (bmForm) {
    bmForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitToSheet(this, function() {
        if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
      });
    });
  }
});

/* --- block from line ~3353 --- */
/* ── Pills stagger animation ── */
(function () {
  var pillsWrap = document.querySelector('.about-m-pills');
  if (!pillsWrap) return;
  var pills = pillsWrap.querySelectorAll('.about-m-pill');
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      pills.forEach(function (pill, i) {
        setTimeout(function () {
          pill.classList.add('pill-visible');
        }, i * 200);
      });
      io.unobserve(pillsWrap);
    }
  }, { threshold: 0.3 });
  io.observe(pillsWrap);
})();

/* ── Scroll Reveal: fade-up for every section ── */
(function () {
  var skipReveal = ['video-testimonials'];
  var sections = document.querySelectorAll('section, footer');
  sections.forEach(function (el) {
    if (skipReveal.indexOf(el.id) === -1) el.classList.add('reveal');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(function (el) {
    if (skipReveal.indexOf(el.id) === -1) io.observe(el);
  });
})();

/* --- WhatsApp button edge alignment --- */
(function() {
  function alignWaBtn() {
    var waBtn = document.getElementById('waFloatBtn');
    var pageWrap = document.getElementById('page-wrap');
    if (!waBtn || !pageWrap) return;
    var isAr = document.documentElement.lang === 'ar';
    var rect = pageWrap.getBoundingClientRect();
    var gapL = rect.left;
    if (isAr) {
      var gapR = window.innerWidth - rect.right;
      waBtn.style.setProperty('right', Math.max(gapR / 2 - 24, 4) + 'px', 'important');
      waBtn.style.setProperty('left', 'auto', 'important');
    } else {
      waBtn.style.setProperty('left', Math.max(gapL / 6, 2) + 'px', 'important');
      waBtn.style.setProperty('right', 'auto', 'important');
    }
    var topPx = window.innerHeight * 0.95 - 28;
    waBtn.style.setProperty('top', topPx + 'px', 'important');
    waBtn.style.setProperty('bottom', 'auto', 'important');
  }
  window.addEventListener('load', function() { setTimeout(alignWaBtn, 300); });
  window.addEventListener('resize', alignWaBtn);
  document.addEventListener('DOMContentLoaded', alignWaBtn);
})();

/* --- block from line ~3389 --- */
var ft = document.querySelector('.site-footer');
if (ft) {
  var isAr = document.documentElement.lang === 'ar';
  var isAr2 = document.documentElement.lang === 'ar';
  ft.style.setProperty('width', isAr2 ? '100%' : '90%', 'important');
  ft.style.setProperty('margin-left', 'auto', 'important');
  ft.style.setProperty('margin-right', 'auto', 'important');
}

