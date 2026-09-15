/* Machon Meleches Machsheves — site behaviour */

/* ---------- header ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- mobile nav ---------- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ---------- testimonials ---------- */
const TESTIMONIALS = [
  {
    name: 'Machon Kan Hanesher',
    img: 'assets/testimonials/testimonial-1.jpg',
    role: 'Gateshead',
    body: [
      'Besides his vast expertise and know-how in the sefarim world, Rabbi Kulbersh also uses his erudition of the actual topics discussed to help achieve the best presentation of the content. Always helpful and encouraging, he has shown to be professional yet attentive to every sefer’s unique requirements.',
      '<strong>Highly recommended!</strong>'
    ]
  },
  {
    name: 'R’ Avrohom Gross',
    img: 'assets/testimonials/testimonial-2.jpg',
    role: 'Chaim Berlin, Pachad Yitzchok, Mir Yerushalayim, Kollel Zichron Yochanan',
    body: [
      'I’ve worked with R’ Akiva on many seforim over the past ten years, including both seforim and kuntreisim I personally authored, as well as a series of seforim published by our Kollel. R’ Akiva worked diligently to produce a top-quality product, ensuring that every step, from manuscript to print draft, was handled with the utmost care and accuracy.',
      'His devotion and reliability are truly noteworthy and were especially evident on several occasions when seforim needed to be published under severe time constraints. In such instances, he went above and beyond to ensure deadlines were successfully met.',
      '<strong>I would certainly recommend R’ Akiva to anyone seeking a highly skilled and dependable typesetter.</strong>'
    ]
  },
  {
    name: 'R’ Mordechai Linzer',
    img: 'assets/testimonials/testimonial-3.jpg',
    role: 'Mechaber seforim',
    body: [
      'R’ Akiva has typeset many seforim of mine. The work was efficient and precise with a beautiful sefer at the end.',
      '<strong>He is also very easy to work with.</strong>'
    ]
  },
  {
    name: 'R’ Moshe Zvi Twersky',
    img: 'assets/testimonials/testimonial-4.jpg',
    role: 'Toras Moshe, Mir, Mercaz Hatorah, Toras Chaim',
    body: [
      'Working with R’ Akiva Kulbersh was a pleasure. He put together my sefer in good taste, professionally, and arranged everything that had to be arranged without my having to worry about anything.',
      '<strong>I’ve recommended him to anyone who asks me about putting out a sefer.</strong>'
    ]
  }
];

const tlist = document.getElementById('tlist');
const tquoteBody = document.getElementById('tquoteBody');
const tquoteAuthor = document.getElementById('tquoteAuthor');
const tmediaImg = document.getElementById('tmediaImg');

if (tlist) buildTestimonials();

function selectTestimonial(index) {
  const t = TESTIMONIALS[index];
  tquoteBody.innerHTML = t.body.map((p) => `<p>${p}</p>`).join('');
  tquoteAuthor.innerHTML = `${t.name}<span>${t.role}</span>`;
  tmediaImg.src = t.img;
  tmediaImg.alt = `Sefer produced for ${t.name}`;
  [...tlist.children].forEach((b, i) => {
    b.classList.toggle('is-active', i === index);
    b.setAttribute('aria-selected', String(i === index));
  });
}

function buildTestimonials() {
  TESTIMONIALS.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.innerHTML = `<strong>${t.name}</strong><span>${t.role}</span>`;
    btn.addEventListener('click', () => selectTestimonial(i));
    tlist.appendChild(btn);
  });
  selectTestimonial(0);
}

/* ---------- forms ---------- */
function wireForm(formId, noteId, message) {
  const form = document.getElementById(formId);
  const note = document.getElementById(noteId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const missing = [...form.querySelectorAll('[required]')].some((f) => !f.value.trim());
    if (missing) {
      note.textContent = 'Please fill in every field so we can get back to you.';
      return;
    }
    const data = new FormData(form);
    const lines = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('%0D%0A');
    window.location.href =
      `mailto:printyoursefer@gmail.com?subject=${encodeURIComponent(message)}&body=${lines}`;
    note.textContent = 'Thank you — your email client is opening.';
    form.reset();
  });
}
wireForm('callForm', 'callNote', 'Free consultation call request');
wireForm('footerForm', 'footerNote', 'Website enquiry');
wireForm('newsForm', 'newsNote', 'Beit HaSefer — notify me about new classes');

/* ---------- sample carousels ---------- */
document.querySelectorAll('.carousel').forEach((car) => {
  const track = car.querySelector('.carousel__track');
  const prev = car.querySelector('.carousel__btn--prev');
  const next = car.querySelector('.carousel__btn--next');
  // advance a full page (all 5 visible tiles) per click, not one tile at a
  // time — each arrow press swaps to a genuinely new set of images.
  const step = () => track.clientWidth;

  const sync = () => {
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 4;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() }));
  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();
});

/* ---------- services rail: highlight the row in view ---------- */
const svcRows = [...document.querySelectorAll('.svc-row')];
if (svcRows.length) {
  const rowIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          svcRows.forEach((r) => r.classList.toggle('is-active', r === entry.target));
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  svcRows.forEach((r) => rowIo.observe(r));
}

/* ---------- rail + steps-nav fill: one continuous, eased rAF loop ----------
   Both the rail bar and each step word track a scroll-derived target, but
   the value main.js writes every frame is an EASED value, not the raw
   scroll-derived number — that's what makes it smooth rather than jumpy,
   and it's also what avoids the "flicker" of a binary on/off class: the
   step words fill up gradually as their row approaches, not snap between
   two states. */
const svcRail = document.querySelector('.svc-rail');
const stepLinks = [...document.querySelectorAll('#stepsNav a[data-step]')];
const stepByRowId = new Map(stepLinks.map((a) => [a.dataset.step, a]));

if (svcRail || svcRows.length) {
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const EASE = 0.14;

  let railTarget = 0, railCurrent = 0;
  const rowTarget = new Map(svcRows.map((r) => [r.id, 0]));
  const rowCurrent = new Map(svcRows.map((r) => [r.id, 0]));

  const readTargets = () => {
    if (svcRail) {
      const r = svcRail.getBoundingClientRect();
      railTarget = clamp01((window.innerHeight / 2 - r.top) / r.height);
    }
    svcRows.forEach((row) => {
      const r = row.getBoundingClientRect();
      rowTarget.set(row.id, clamp01((window.innerHeight * 0.6 - r.top) / r.height));
    });
  };

  const applyImmediate = () => {
    readTargets();
    if (svcRail) svcRail.style.setProperty('--rail-fill', railTarget.toFixed(4));
    svcRows.forEach((row) => {
      const link = stepByRowId.get(row.id);
      if (link) link.style.setProperty('--fill', (rowTarget.get(row.id) * 100).toFixed(1) + '%');
    });
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyImmediate();
    window.addEventListener('scroll', applyImmediate, { passive: true });
    window.addEventListener('resize', applyImmediate, { passive: true });
  } else {
    const tick = () => {
      readTargets();
      railCurrent += (railTarget - railCurrent) * EASE;
      if (svcRail) svcRail.style.setProperty('--rail-fill', railCurrent.toFixed(4));

      svcRows.forEach((row) => {
        const id = row.id;
        const next = rowCurrent.get(id) + (rowTarget.get(id) - rowCurrent.get(id)) * EASE;
        rowCurrent.set(id, next);
        const link = stepByRowId.get(id);
        if (link) link.style.setProperty('--fill', (next * 100).toFixed(1) + '%');
      });

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

/* ---------- 3D tilt on the services book ---------- */
const bookStage = document.getElementById('bookStage');
const bookImg = document.getElementById('bookImg');
const finePointer = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (bookStage && bookImg && finePointer && !reducedMotion) {
  const MAX_TILT = 16;   // degrees at the far edge
  const LIFT = 40;       // px pulled toward the viewer on hover

  let targetX = 0, targetY = 0, currentX = 0, currentY = 0, lift = 0, targetLift = 0;
  let raf = null;

  const render = () => {
    // ease toward the target so the motion feels weighted rather than snapping
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    lift += (targetLift - lift) * 0.12;

    bookImg.style.transform =
      `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) translateZ(${lift.toFixed(1)}px)`;

    const settled =
      Math.abs(targetX - currentX) < 0.01 &&
      Math.abs(targetY - currentY) < 0.01 &&
      Math.abs(targetLift - lift) < 0.1;

    raf = settled ? null : requestAnimationFrame(render);
  };
  const kick = () => { if (raf === null) raf = requestAnimationFrame(render); };

  bookStage.addEventListener('pointermove', (e) => {
    const r = bookStage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    targetY = px * MAX_TILT * 2;      // horizontal move spins around Y
    targetX = -py * MAX_TILT * 2;     // vertical move tips around X
    targetLift = LIFT;
    kick();
  });

  bookStage.addEventListener('pointerleave', () => {
    targetX = targetY = targetLift = 0;
    kick();
  });
}

/* ---------- gallery border glow ----------
   Vanilla port of the BorderGlow component: the pointer's angle from the tile
   centre drives a conic gradient, and its proximity to the edge drives opacity,
   so the light tracks the cursor and brightens as it nears the border.        */
document.querySelectorAll('.gtile').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    const dx = e.clientX - r.left - cx;
    const dy = e.clientY - r.top - cy;

    // how far toward an edge the cursor is: 0 at the centre, 1 at the border
    const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

    let angle = 0;
    if (dx !== 0 || dy !== 0) {
      angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
    }

    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(2));
    card.style.setProperty('--cursor-angle', angle.toFixed(2) + 'deg');
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--edge-proximity', '0');
  });
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});
