/* DriftWall — vanilla port of the React Bits "DriftWall" component.
   Source: https://reactbits.dev/components/drift-wall (registry: DriftWall-TS-CSS)
   This project is static HTML/JS with no Node/npm on the build machine, so the
   `npx shadcn add` install path isn't available here — the same layout and
   animation math from the React source is reproduced by hand below, 1:1,
   against the ported CSS in styles.css (same class names, same custom props). */

function initDriftWall(container, options) {
  if (!container) return;

  const cfg = Object.assign({
    items: [],
    columns: 5,
    tileWidth: 200,
    tileHeight: 132,
    gap: 18,
    radius: 14,
    tilt: 16,
    turn: -14,
    roll: 0,
    perspective: 1200,
    depth: 120,
    speed: 42,
    direction: 'up',
    variance: 0.45,
    parallax: 0.6,
    pauseOnHover: false,
    lift: 64,
    fade: 0.6,
    dim: 0.55,
    grayscale: false,
    overlayColor: '#1c120d',
  }, options);

  if (!cfg.items.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- css custom properties (mirrors the React version's cssVars memo) ---- */
  container.style.setProperty('--dw-tile-w', cfg.tileWidth + 'px');
  container.style.setProperty('--dw-tile-h', cfg.tileHeight + 'px');
  container.style.setProperty('--dw-gap', cfg.gap + 'px');
  container.style.setProperty('--dw-radius', cfg.radius + 'px');
  container.style.setProperty('--dw-perspective', cfg.perspective + 'px');
  container.style.setProperty('--dw-lift', cfg.lift + 'px');
  container.style.setProperty('--dw-dim', String(cfg.dim));
  container.style.setProperty('--dw-gray', cfg.grayscale ? '1' : '0');
  container.style.setProperty('--dw-overlay', cfg.overlayColor);
  container.style.setProperty('--dw-edge', Math.max(0, (1 - cfg.fade) * 100) + '%');

  /* ---- build DOM: plane > columns > track > repeated tiles ---- */
  container.classList.add('drift-wall');
  container.setAttribute('role', 'group');
  container.setAttribute('aria-label', 'Drifting wall of tiles');

  const plane = document.createElement('div');
  plane.className = 'drift-wall__plane';
  container.appendChild(plane);

  // round-robin items into N columns, same as the source
  const columnItems = Array.from({ length: cfg.columns }, () => []);
  cfg.items.forEach((item, i) => columnItems[i % cfg.columns].push(item));
  columnItems.forEach((col, i) => { if (!col.length) columnItems[i] = cfg.items.slice(0, 1); });

  const containerHeight = container.getBoundingClientRect().height || 600;
  const unit = cfg.tileHeight + cfg.gap;

  const tracks = [];
  const columnMeta = [];

  function renderTile(item, id, colIndex) {
    const isLink = !!item.href;
    const tile = document.createElement(isLink ? 'a' : 'div');
    tile.className = 'drift-wall__tile';
    tile.dataset.tileId = id;
    tile.dataset.col = String(colIndex);
    if (isLink) {
      tile.href = item.href;
      tile.target = '_blank';
      tile.rel = 'noreferrer noopener';
    } else {
      tile.tabIndex = 0;
      tile.setAttribute('role', 'button');
      tile.setAttribute('aria-label', item.title || 'tile');
    }

    const inner = document.createElement('span');
    inner.className = 'drift-wall__inner';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.draggable = false;

    const overlay = document.createElement('span');
    overlay.className = 'drift-wall__overlay';
    overlay.setAttribute('aria-hidden', 'true');

    inner.appendChild(img);
    inner.appendChild(overlay);
    tile.appendChild(inner);

    tile.addEventListener('focus', () => activate(id, colIndex));
    tile.addEventListener('blur', release);

    return tile;
  }

  columnItems.forEach((col, c) => {
    const copyHeight = Math.max(unit, col.length * unit);
    const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
    columnMeta.push({ copyHeight, copies });

    const colEl = document.createElement('div');
    colEl.className = 'drift-wall__col';

    const track = document.createElement('div');
    track.className = 'drift-wall__track';

    for (let copyIndex = 0; copyIndex < copies; copyIndex++) {
      col.forEach((item, itemIndex) => {
        track.appendChild(renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c));
      });
    }

    colEl.appendChild(track);
    plane.appendChild(colEl);
    tracks.push(track);
  });

  /* ---- motion state ---- */
  const offsets = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
  const velocities = columnItems.map(() => 0);

  const columnFactor = (index, variance) => {
    const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
    return 1 + variance * pseudo;
  };
  const dirSign = cfg.direction === 'up' ? 1 : -1;
  const baseVelocities = columnItems.map((_, c) => {
    const altSign = c % 2 === 0 ? 1 : -1;
    return cfg.speed * columnFactor(c, cfg.variance) * dirSign * altSign;
  });

  let hoveredCol = -1;
  let wallHovered = false;
  let activeId = null;
  let activeTileEl = null;
  const pointer = { x: 0, y: 0 };
  const pointerDamped = { x: 0, y: 0 };

  function applyPlaneTransform(px, py) {
    plane.style.transform =
      `translate(-50%, -50%) scale(1.18) ` +
      `rotateX(${cfg.tilt + py}deg) rotateY(${cfg.turn + px}deg) rotateZ(${cfg.roll}deg) ` +
      `translateZ(${-cfg.depth}px)`;
  }

  function activate(id, colIndex) {
    if (id === activeId) return;
    if (activeTileEl) activeTileEl.classList.remove('is-active');
    activeId = id;
    hoveredCol = colIndex;
    activeTileEl = plane.querySelector(`[data-tile-id="${CSS.escape(id)}"]`);
    if (activeTileEl) activeTileEl.classList.add('is-active');
  }
  function release() {
    if (activeTileEl) activeTileEl.classList.remove('is-active');
    activeId = null;
    activeTileEl = null;
    hoveredCol = -1;
  }

  container.addEventListener('pointerenter', () => { wallHovered = true; });
  container.addEventListener('pointerleave', () => {
    wallHovered = false;
    pointer.x = 0; pointer.y = 0;
    release();
  });
  container.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    if (cfg.parallax > 0 && !reduced) {
      pointer.x = (e.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (e.clientY - rect.top) / rect.height - 0.5;
    }
    const hit = document.elementFromPoint(e.clientX, e.clientY);
    const tile = hit && hit.closest ? hit.closest('[data-tile-id]') : null;
    if (!tile) return;
    const id = tile.dataset.tileId;
    if (id === activeId) return;
    activate(id, Number(tile.dataset.col));
  });

  /* ---- render loop ---- */
  if (reduced) {
    // static: one paint, no scrolling, no pointer tilt — fully honors the preference
    applyPlaneTransform(0, 0);
    tracks.forEach((track, c) => {
      track.style.transform = `translate3d(0, ${-offsets[c]}px, 0)`;
    });
    return;
  }

  let lastTs = null;
  function animate(ts) {
    if (lastTs === null) lastTs = ts;
    const dt = Math.min(0.05, Math.max(0, ts - lastTs) / 1000);
    lastTs = ts;

    const maxTilt = cfg.parallax * 8;
    const targetX = pointer.x * maxTilt;
    const targetY = -pointer.y * maxTilt;
    const damp = 1 - Math.exp(-dt / 0.12);
    pointerDamped.x += (targetX - pointerDamped.x) * damp;
    pointerDamped.y += (targetY - pointerDamped.y) * damp;
    applyPlaneTransform(pointerDamped.x, pointerDamped.y);

    for (let c = 0; c < tracks.length; c++) {
      const meta = columnMeta[c];
      const paused = wallHovered && cfg.pauseOnHover;
      const factor = paused || hoveredCol === c ? 0 : 1;
      const target = baseVelocities[c] * factor;

      const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
      velocities[c] += (target - velocities[c]) * ease;
      let next = (offsets[c] || 0) + velocities[c] * dt;
      next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
      offsets[c] = next;

      tracks[c].style.transform = `translate3d(0, ${-next}px, 0)`;
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('driftWall');
  if (!el) return;

  // every image from the "edited books" folder — 56 in total
  const GALLERY_COUNT = 56;
  const items = Array.from({ length: GALLERY_COUNT }, (_, i) => ({
    image: `assets/gallery/g-${i + 1}.jpg`,
    title: 'A sefer produced by Machon Meleches Machsheves',
  }));

  initDriftWall(el, {
    items,
    columns: 6,
    tileWidth: 200,
    tileHeight: 132,
    gap: 18,
    radius: 18,
    tilt: 16,
    turn: -14,
    perspective: 1200,
    depth: 120,
    speed: 42,
    direction: 'up',
    variance: 0.45,
    parallax: 0.6,
    lift: 64,
    fade: 0.6,
    dim: 0.55,
    overlayColor: '#1c120d',
  });
});
