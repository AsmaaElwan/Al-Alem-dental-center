/* main-ar.js */

/* ── Hero entrance animation ── */
(function () {
  if (typeof gsap === 'undefined') return;

  const heroTl = gsap.timeline({ delay: 0.4, defaults: { ease: 'power3.out' } });

  heroTl
    .fromTo('.eyebrow-line',
      { width: 0 },
      { width: 32, duration: 0.7, ease: 'power2.inOut' }
    )
    .from('.hero-eyebrow', { opacity: 0, x: 20, duration: 0.6 }, '-=0.4')
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
    }, '-=0.55');
})();

/* ── About Section animation ── */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.about-m-eyebrow', { opacity: 0, x: 30 });
  gsap.set('.about-m-name',    { opacity: 0, y: 35 });
  gsap.set('.about-m-role',    { opacity: 0, y: 20 });
  gsap.set('.about-m-photo',   { opacity: 0, scale: 0.93, x: 30 });
  gsap.set('.about-m-pill',    { opacity: 0, x: -40 });
  gsap.set('.about-m-bio',     { clipPath: 'inset(0 100% 0 0)' });
  gsap.set('.about-m-cta-wrap',{ opacity: 0, y: 20 });

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 78%',
    once: true,
    onEnter: function () {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.about-m-eyebrow', { opacity: 1, x: 0, duration: 0.7 })
        .to('.about-m-name',    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .to('.about-m-role',    { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to('.about-m-photo',   { opacity: 1, scale: 1, x: 0, duration: 1.1, ease: 'power3.out' }, '-=0.5')
        .to('.about-m-pill',    { opacity: 1, x: 0, duration: 0.7, stagger: 0.2 }, '-=0.6')
        .to('.about-m-bio',     { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut', stagger: 0.3 }, '-=0.3')
        .to('.about-m-cta-wrap',{ opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    }
  });
})();

/* ── Booking Form animation ── */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.hero-booking-form', { opacity: 0, y: 60, scale: 0.97 });

  ScrollTrigger.create({
    trigger: '.hero-booking-form',
    start: 'top 85%',
    once: true,
    onEnter: function () {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.hero-booking-form', { opacity: 1, y: 0, scale: 1, duration: 0.8 })
        .fromTo('.hbf-title',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        .fromTo('.hbf-divider',
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.45, ease: 'power2.out' }, '-=0.2')
        .fromTo('.hbf-field',
          { opacity: 0, y: 22, x: 10 },
          { opacity: 1, y: 0, x: 0, duration: 0.5, stagger: 0.13 }, '-=0.15')
        .fromTo('.hbf-submit',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, '-=0.1');
    }
  });
})();
