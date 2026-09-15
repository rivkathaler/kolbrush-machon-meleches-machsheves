/* ==========================================================================
   Admin panel behaviour — PREVIEW ONLY.
   Nothing here persists real data. It exists to show the layout, the fields,
   and the add/remove/upload interactions so this can be wired to a real
   database + secure login once the project is imported into Lovable.

   Demo login (not secure — placeholder only):
     username: admin
     password: admin123
   ========================================================================== */

const DEMO_USER = 'admin';
const DEMO_PASS = 'admin123';

/* ---------- current site content, prefilled for editing ---------- */

const FAQ_ITEMS = [
  { q: 'How long does it take to publish a sefer?', a: 'It depends on the length of the manuscript and the services you need. A short kuntress can be ready in a few weeks; a full-length sefer that needs typing, editing, typesetting and a cover usually runs a few months. We set a realistic schedule with you at the start and keep to it.' },
  { q: 'What file formats do you accept for typing and editing?', a: 'Anything you have. Handwritten manuscripts, scans, photographs of pages, printed seforim, Word files, PDFs — our typists are used to working from difficult handwriting and poor-quality scans.' },
  { q: 'Can you work from handwritten manuscripts?', a: 'Yes — this is one of our specialties. Our typists are proficient even with difficult handwriting, and every page is checked by a talmid chochom who understands the content, not just the letters.' },
  { q: 'Which typesetting style should I choose for my sefer?', a: 'Single column suits derashos, sichos and most chiddushim. Double column suits halachic works and longer texts. Multi-text is for a sefer printed alongside a commentary or a mekor. We will advise you based on the content of your sefer.' },
  { q: 'Do you design the cover as well?', a: 'Yes. We work with the finest graphic artists who specialize in seforim, so the cover, the shaar blatt and the spine all match the character of the sefer inside.' },
  { q: 'Do you handle printing and binding?', a: 'We provide full printing services with top-notch results for both soft and hard cover, in any quantity — from a small kuntress for a bris to a full print run.' },
  { q: 'How do I get started, and what does it cost?', a: 'Book a free 20 minute consultation call. We will look at your manuscript, talk through what it needs, and give you a clear quote before any work begins.' }
];

const TESTIMONIALS_HOME = [
  { name: 'Machon Kan Hanesher', role: 'Gateshead', img: '../assets/testimonials/testimonial-1.jpg', quote: 'Besides his vast expertise and know-how in the sefarim world, Rabbi Kulbersh also uses his erudition of the actual topics discussed to help achieve the best presentation of the content. Always helpful and encouraging, he has shown to be professional yet attentive to every sefer’s unique requirements. Highly recommended!' },
  { name: 'R’ Avrohom Gross', role: 'Chaim Berlin, Pachad Yitzchok, Mir Yerushalayim, Kollel Zichron Yochanan', img: '../assets/testimonials/testimonial-2.jpg', quote: 'I’ve worked with R’ Akiva on many seforim over the past ten years, including both seforim and kuntreisim I personally authored, as well as a series of seforim published by our Kollel. I would certainly recommend R’ Akiva to anyone seeking a highly skilled and dependable typesetter.' },
  { name: 'R’ Mordechai Linzer', role: 'Mechaber seforim', img: '../assets/testimonials/testimonial-3.jpg', quote: 'R’ Akiva has typeset many seforim of mine. The work was efficient and precise with a beautiful sefer at the end. He is also very easy to work with.' },
  { name: 'R’ Moshe Zvi Twersky', role: 'Toras Moshe, Mir, Mercaz Hatorah, Toras Chaim', img: '../assets/testimonials/testimonial-4.jpg', quote: 'Working with R’ Akiva Kulbersh was a pleasure. He put together my sefer in good taste, professionally, and arranged everything that had to be arranged without my having to worry about anything.' }
];

const TESTIMONIALS_DOWNLOADS = TESTIMONIALS_HOME.map(t => ({ ...t }));

const DOWNLOADS_CARDS = [
  { title: 'The Word add-on installer and guide', img: '../assets/samples/single-1.jpg' },
  { title: 'Single column typesetting samples', img: '../assets/samples/single-2.jpg' },
  { title: 'Double column typesetting samples', img: '../assets/samples/double-1.jpg' },
  { title: 'Multi-text typesetting samples', img: '../assets/samples/multi-1.jpg' },
  { title: 'Manuscript preparation checklist', img: '../assets/samples/multi-3.jpg' },
  { title: 'Shaar blatt title page templates', img: '../assets/books/book-2.jpg' },
  { title: 'Hebrew fonts for seforim', img: '../assets/samples/double-3.jpg' },
  { title: 'Print specification and binding sheet', img: '../assets/books/book-9.jpg' }
];

/* ---------- login page ---------- */

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value;
    const err = document.getElementById('loginError');
    if (user === DEMO_USER && pass === DEMO_PASS) {
      sessionStorage.setItem('mmm_admin_logged_in', '1');
      window.location.href = 'dashboard.html';
    } else {
      err.classList.add('show');
    }
  });
}

/* ---------- dashboard page ---------- */

const adminNav = document.getElementById('adminNav');
if (adminNav) {
  if (sessionStorage.getItem('mmm_admin_logged_in') !== '1') {
    window.location.href = 'login.html';
  }

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('mmm_admin_logged_in');
    window.location.href = 'login.html';
  });

  adminNav.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-panel]');
    if (!btn) return;
    document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });

  document.querySelectorAll('[data-save]').forEach(btn => {
    btn.addEventListener('click', () => {
      const status = document.getElementById('saveStatus-' + btn.dataset.save);
      status.classList.add('show');
      setTimeout(() => status.classList.remove('show'), 1800);
    });
  });

  /* ---- FAQ ---- */
  const faqList = document.getElementById('faqList');
  function renderFaq() {
    faqList.innerHTML = '';
    FAQ_ITEMS.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'repeat-item';
      row.innerHTML = `
        <div class="repeat-item__top">
          <span class="repeat-item__label">FAQ item ${i + 1}</span>
          <button class="btn btn-danger btn-sm" type="button" data-remove-faq="${i}">Remove</button>
        </div>
        <div class="field-group">
          <label>Question</label>
          <input type="text" value="${escapeAttr(item.q)}" data-faq-q="${i}">
        </div>
        <div class="field-group" style="margin-bottom:0">
          <label>Answer</label>
          <textarea data-faq-a="${i}">${escapeHtml(item.a)}</textarea>
        </div>`;
      faqList.appendChild(row);
    });
  }
  faqList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-faq]');
    if (!btn) return;
    FAQ_ITEMS.splice(Number(btn.dataset.removeFaq), 1);
    renderFaq();
  });
  document.getElementById('faqAdd').addEventListener('click', () => {
    FAQ_ITEMS.push({ q: '', a: '' });
    renderFaq();
  });
  renderFaq();

  /* ---- Testimonials ---- */
  function renderTesti(list, container) {
    container.innerHTML = '';
    list.forEach((t, i) => {
      const row = document.createElement('div');
      row.className = 'repeat-item';
      row.innerHTML = `
        <div class="repeat-item__top">
          <span class="repeat-item__label">Testimonial ${i + 1}</span>
          <button class="btn btn-danger btn-sm" type="button" data-remove="${i}">Remove</button>
        </div>
        <div class="image-field" style="margin-bottom:14px">
          <div class="image-field__preview" style="background-image:url('${t.img}')" data-preview="${i}"></div>
          <div class="image-field__controls">
            <label class="repeat-item__label" style="display:block;margin-bottom:6px">Photo</label>
            <input type="file" accept="image/*" data-photo="${i}">
          </div>
        </div>
        <div class="grid-2">
          <div class="field-group">
            <label>Name</label>
            <input type="text" value="${escapeAttr(t.name)}" data-field="name" data-i="${i}">
          </div>
          <div class="field-group">
            <label>Role / institution</label>
            <input type="text" value="${escapeAttr(t.role)}" data-field="role" data-i="${i}">
          </div>
        </div>
        <div class="field-group" style="margin-bottom:0">
          <label>Quote</label>
          <textarea data-field="quote" data-i="${i}">${escapeHtml(t.quote)}</textarea>
        </div>`;
      container.appendChild(row);
    });
  }

  function wireTestiContainer(container, list) {
    container.addEventListener('click', (e) => {
      const rm = e.target.closest('[data-remove]');
      if (rm) { list.splice(Number(rm.dataset.remove), 1); renderTesti(list, container); }
    });
    container.addEventListener('change', (e) => {
      const file = e.target.closest('[data-photo]');
      if (file && file.files[0]) {
        const idx = Number(file.dataset.photo);
        const reader = new FileReader();
        reader.onload = () => {
          list[idx].img = reader.result;
          container.querySelector(`[data-preview="${idx}"]`).style.backgroundImage = `url('${reader.result}')`;
        };
        reader.readAsDataURL(file.files[0]);
      }
    });
  }

  const testiHomeList = document.getElementById('testiHomeList');
  const testiDownloadsList = document.getElementById('testiDownloadsList');
  renderTesti(TESTIMONIALS_HOME, testiHomeList);
  renderTesti(TESTIMONIALS_DOWNLOADS, testiDownloadsList);
  wireTestiContainer(testiHomeList, TESTIMONIALS_HOME);
  wireTestiContainer(testiDownloadsList, TESTIMONIALS_DOWNLOADS);

  document.querySelector('[data-add-testi="home"]').addEventListener('click', () => {
    TESTIMONIALS_HOME.push({ name: '', role: '', img: '', quote: '' });
    renderTesti(TESTIMONIALS_HOME, testiHomeList);
  });
  document.querySelector('[data-add-testi="downloads"]').addEventListener('click', () => {
    TESTIMONIALS_DOWNLOADS.push({ name: '', role: '', img: '', quote: '' });
    renderTesti(TESTIMONIALS_DOWNLOADS, testiDownloadsList);
  });

  /* ---- Word add-on ---- */
  const addonFileInput = document.getElementById('addonFileInput');
  const addonFileName = document.getElementById('addonFileName');
  if (addonFileInput) {
    addonFileInput.addEventListener('change', () => {
      if (addonFileInput.files[0]) addonFileName.textContent = addonFileInput.files[0].name;
    });
  }
  const addonMediaInput = document.getElementById('addonMediaInput');
  const addonMediaName = document.getElementById('addonMediaName');
  if (addonMediaInput) {
    addonMediaInput.addEventListener('change', () => {
      if (addonMediaInput.files[0]) addonMediaName.textContent = addonMediaInput.files[0].name;
    });
  }

  /* ---- Downloads grid ---- */
  const downloadsList = document.getElementById('downloadsList');
  if (downloadsList) {
    DOWNLOADS_CARDS.forEach((card, i) => {
      const row = document.createElement('div');
      row.className = 'repeat-item';
      row.innerHTML = `
        <div class="repeat-item__top">
          <span class="repeat-item__label">Card ${i + 1} — ${escapeHtml(card.title)} <em style="opacity:.6;font-style:normal">(title fixed)</em></span>
        </div>
        <div class="image-field" style="margin-bottom:14px">
          <div class="image-field__preview" style="background-image:url('${card.img}')" data-dl-preview="${i}"></div>
          <div class="image-field__controls">
            <label class="repeat-item__label" style="display:block;margin-bottom:6px">Thumbnail image</label>
            <input type="file" accept="image/*" data-dl-photo="${i}">
          </div>
        </div>
        <div class="file-field">
          <span class="repeat-item__label" style="text-transform:none;font-weight:600;color:var(--ink)">Download file:</span>
          <span class="current-file" data-dl-filename="${i}">No file uploaded yet</span>
          <label class="btn btn-ghost btn-sm" style="cursor:pointer;">
            Choose file
            <input type="file" style="display:none" data-dl-file="${i}">
          </label>
        </div>`;
      downloadsList.appendChild(row);
    });

    downloadsList.addEventListener('change', (e) => {
      const photo = e.target.closest('[data-dl-photo]');
      if (photo && photo.files[0]) {
        const idx = photo.dataset.dlPhoto;
        const reader = new FileReader();
        reader.onload = () => {
          downloadsList.querySelector(`[data-dl-preview="${idx}"]`).style.backgroundImage = `url('${reader.result}')`;
        };
        reader.readAsDataURL(photo.files[0]);
      }
      const file = e.target.closest('[data-dl-file]');
      if (file && file.files[0]) {
        const idx = file.dataset.dlFile;
        downloadsList.querySelector(`[data-dl-filename="${idx}"]`).textContent = file.files[0].name;
      }
    });
  }
}

/* ---------- helpers ---------- */
function escapeHtml(str) {
  return String(str || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}
