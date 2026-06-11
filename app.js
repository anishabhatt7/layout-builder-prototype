// ============================================================
// Layout Builder — Wireframe Prototype (v2)
// - Excalidraw-style hand-drawn aesthetic
// - Thumbnail tiles in palette
// - Resizable placed components (width + height)
// - Editor + toolbar merged into one component
// ============================================================

// --- Built-in components ---
// Each has: id, name, desc, defaultW, defaultH, render(), thumb()
// `render` produces the in-canvas wireframe.
// `thumb` produces a tiny SVG preview shown in the palette tile.

const BUILT_IN_COMPONENTS = [
  {
    id: 'title',
    name: 'Title',
    desc: 'Page or article title',
    defaultW: 600, defaultH: 80,
    render: () => `<div class="wf-title">Article title goes here</div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="1.5" stroke-linecap="round">
        <rect x="6" y="12" width="78" height="10" rx="1" fill="#3d5af1" stroke="none"/>
        <line x1="6" y1="32" x2="108" y2="32"/>
        <line x1="6" y1="40" x2="80" y2="40" stroke="#aab4f0"/>
      </svg>`
  },
  {
    id: 'tabs',
    name: 'Tabs',
    desc: 'Editor / Metadata / Enrichments',
    defaultW: 480, defaultH: 60,
    render: () => `
      <div class="wf-tabs">
        <div class="wf-tab active">Editor</div>
        <div class="wf-tab">Metadata</div>
        <div class="wf-tab">Enrichments</div>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="1.5" stroke-linecap="round">
        <rect x="6"  y="12" width="28" height="22" rx="2" fill="#ffffff"/>
        <rect x="36" y="12" width="28" height="22" rx="2" fill="#e8ebff" stroke="#aab4f0"/>
        <rect x="66" y="12" width="36" height="22" rx="2" fill="#e8ebff" stroke="#aab4f0"/>
        <line x1="2" y1="34" x2="118" y2="34"/>
      </svg>`
  },
  {
    id: 'editor',
    name: 'Editor',
    desc: 'Toolbar + rich text body',
    defaultW: 700, defaultH: 320,
    render: () => `
      <div class="wf-editor-wrap">
        <div class="wf-editor-toolbar">
          <span class="icon">B</span>
          <span class="icon">I</span>
          <span class="icon">U</span>
          <span class="icon">A</span>
          <span class="icon">≡</span>
          <span class="icon">⌗</span>
          <span class="icon">↺</span>
          <span class="icon">↻</span>
          <span class="icon">⇲</span>
        </div>
        <div class="wf-editor-body">
          <div class="wf-line long thick"></div>
          <div class="wf-line long"></div>
          <div class="wf-line long"></div>
          <div class="wf-line medium"></div>
          <div class="wf-line long"></div>
          <div class="wf-line short"></div>
        </div>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="1.5" stroke-linecap="round">
        <rect x="4" y="4" width="112" height="42" rx="2" fill="#ffffff"/>
        <line x1="4" y1="14" x2="116" y2="14"/>
        <rect x="7"  y="6" width="6" height="6" rx="1" fill="#3d5af1" stroke="none"/>
        <rect x="15" y="6" width="6" height="6" rx="1" fill="#3d5af1" stroke="none"/>
        <rect x="23" y="6" width="6" height="6" rx="1" fill="#3d5af1" stroke="none"/>
        <rect x="31" y="6" width="6" height="6" rx="1" fill="#aab4f0" stroke="none"/>
        <line x1="8"  y1="22" x2="110" y2="22" stroke="#aab4f0"/>
        <line x1="8"  y1="28" x2="110" y2="28" stroke="#aab4f0"/>
        <line x1="8"  y1="34" x2="100" y2="34" stroke="#aab4f0"/>
        <line x1="8"  y1="40" x2="80"  y2="40" stroke="#aab4f0"/>
      </svg>`
  },
  {
    id: 'score',
    name: 'Score',
    desc: 'Quality / RAQAI score ring',
    defaultW: 220, defaultH: 220,
    render: () => `
      <div class="wf-score">
        <div class="wf-score-ring">48%</div>
        <div class="wf-score-label">Overall score</div>
        <span class="wf-pill">Poor performance</span>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="2" stroke-linecap="round">
        <circle cx="40" cy="25" r="14" stroke="#aab4f0"/>
        <path d="M 40 11 A 14 14 0 0 1 54 25"/>
        <text x="40" y="28" font-family="Figtree,sans-serif" font-size="8" font-weight="700" fill="#2c3fb8" text-anchor="middle" stroke="none">48%</text>
        <rect x="62" y="18" width="50" height="5" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="62" y="28" width="36" height="5" rx="1" fill="#aab4f0" stroke="none" opacity="0.6"/>
      </svg>`
  },
  {
    id: 'suggestions',
    name: 'AI suggestions',
    desc: 'Structural / AI suggestions list',
    defaultW: 320, defaultH: 220,
    render: () => `
      <div>
        <div class="wf-line short" style="margin-bottom:8px"></div>
        <div class="wf-suggestion">
          <span>Suggestion item with brief description</span>
          <span class="badge">+4%</span>
        </div>
        <div class="wf-suggestion">
          <span>Another suggested improvement</span>
          <span class="badge">+7%</span>
        </div>
        <div class="wf-suggestion">
          <span>One more recommendation here</span>
          <span class="badge">+2%</span>
        </div>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#aab4f0" stroke-width="1.25" stroke-linecap="round">
        <rect x="6"  y="6"  width="100" height="10" rx="1.5" fill="#e8ebff"/>
        <rect x="92" y="8"  width="14" height="6"  rx="3" fill="#ffffff" stroke="#3d5af1"/>
        <rect x="6"  y="20" width="100" height="10" rx="1.5" fill="#e8ebff"/>
        <rect x="92" y="22" width="14" height="6"  rx="3" fill="#ffffff" stroke="#3d5af1"/>
        <rect x="6"  y="34" width="100" height="10" rx="1.5" fill="#e8ebff"/>
        <rect x="92" y="36" width="14" height="6"  rx="3" fill="#ffffff" stroke="#3d5af1"/>
      </svg>`
  },
  {
    id: 'save',
    name: 'Save button',
    desc: 'Primary action button(s)',
    defaultW: 220, defaultH: 70,
    render: () => `
      <div style="display:flex; gap:8px; align-items:center;">
        <span class="wf-btn-shape primary">Save</span>
        <span class="wf-btn-shape">Cancel</span>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="1.5">
        <rect x="14" y="16" width="40" height="20" rx="3" fill="#3d5af1"/>
        <text x="34" y="29" font-family="Figtree,sans-serif" font-size="9" font-weight="600" fill="#ffffff" text-anchor="middle" stroke="none">Save</text>
        <rect x="62" y="16" width="44" height="20" rx="3" fill="#ffffff"/>
        <text x="84" y="29" font-family="Figtree,sans-serif" font-size="9" font-weight="500" fill="#2c3fb8" text-anchor="middle" stroke="none">Cancel</text>
      </svg>`
  },
  {
    id: 'agent',
    name: 'Agent panel',
    desc: 'Agent messages and actions',
    defaultW: 320, defaultH: 260,
    render: () => `
      <div>
        <div class="wf-line short" style="margin-bottom:8px"></div>
        <div class="wf-agent-msg">
          Agent suggested action with a short description.
          <div class="agent-actions">
            <span class="wf-btn-shape">Update</span>
            <span class="wf-btn-shape">Expand</span>
          </div>
        </div>
        <div class="wf-agent-msg">
          Another action suggestion from the agent.
          <div class="agent-actions">
            <span class="wf-btn-shape">Add list</span>
          </div>
        </div>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#aab4f0" stroke-width="1.25">
        <rect x="6"  y="6"  width="108" height="18" rx="2" fill="#e8ebff"/>
        <rect x="9"  y="16" width="22" height="5"  rx="1" fill="#3d5af1" stroke="none"/>
        <rect x="34" y="16" width="22" height="5"  rx="1" fill="#3d5af1" stroke="none"/>
        <rect x="6"  y="28" width="108" height="18" rx="2" fill="#e8ebff"/>
        <rect x="9"  y="38" width="22" height="5"  rx="1" fill="#3d5af1" stroke="none"/>
      </svg>`
  },
  {
    id: 'action-card',
    name: 'Action card',
    desc: 'Card with icon, title, action',
    defaultW: 380, defaultH: 90,
    render: () => `
      <div class="wf-action-card">
        <div class="wf-circle"></div>
        <div class="wf-col">
          <div class="wf-line medium"></div>
          <div class="wf-line short"></div>
        </div>
        <span class="wf-btn-shape">Open</span>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="1.5" stroke-linecap="round">
        <rect x="4" y="10" width="112" height="30" rx="2" fill="#ffffff"/>
        <circle cx="18" cy="25" r="8" fill="#e8ebff"/>
        <rect x="32" y="20" width="50" height="4" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="32" y="28" width="32" height="4" rx="1" fill="#aab4f0" stroke="none" opacity="0.6"/>
        <rect x="88" y="18" width="22" height="14" rx="2" fill="#ffffff"/>
        <text x="99" y="28" font-family="Figtree,sans-serif" font-size="7" font-weight="600" fill="#2c3fb8" text-anchor="middle" stroke="none">Open</text>
      </svg>`
  },
  {
    id: 'sidebar',
    name: 'Side nav',
    desc: 'Vertical navigation',
    defaultW: 220, defaultH: 320,
    render: () => `
      <div class="wf-sidebar">
        <div class="wf-nav-item"><span class="dot"></span> Home</div>
        <div class="wf-nav-item"><span class="dot"></span> Articles</div>
        <div class="wf-nav-item"><span class="dot"></span> Drafts</div>
        <div class="wf-nav-item"><span class="dot"></span> Trash</div>
        <div class="wf-nav-item"><span class="dot"></span> Settings</div>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="1.5">
        <rect x="20" y="4" width="80" height="42" rx="2" fill="#f6f7ff"/>
        <rect x="26" y="10" width="6" height="6" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="36" y="11" width="38" height="4" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="26" y="20" width="6" height="6" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="36" y="21" width="50" height="4" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="26" y="30" width="6" height="6" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="36" y="31" width="42" height="4" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="26" y="40" width="6" height="6" rx="1" fill="#aab4f0" stroke="none"/>
        <rect x="36" y="41" width="30" height="4" rx="1" fill="#aab4f0" stroke="none"/>
      </svg>`
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    desc: 'Path / breadcrumb trail',
    defaultW: 380, defaultH: 50,
    render: () => `
      <div style="display:flex; gap:6px; align-items:center; color:var(--ink-soft); font-size:14px;">
        <span>All articles</span>
        <span>›</span>
        <span>Knowledge base</span>
        <span>›</span>
        <span>Current page</span>
      </div>`,
    thumb: () => `
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#3d5af1" stroke-width="1.25">
        <rect x="6"  y="20" width="22" height="10" rx="1" fill="#aab4f0" stroke="none"/>
        <text x="34" y="30" font-family="Figtree,sans-serif" font-size="11" font-weight="600" fill="#3d5af1" stroke="none">›</text>
        <rect x="42" y="20" width="32" height="10" rx="1" fill="#aab4f0" stroke="none"/>
        <text x="78" y="30" font-family="Figtree,sans-serif" font-size="11" font-weight="600" fill="#3d5af1" stroke="none">›</text>
        <rect x="86" y="20" width="28" height="10" rx="1" fill="#3d5af1" stroke="none"/>
      </svg>`
  }
];

// --- State ---
const state = {
  custom: loadCustom(),
  placed: [],
  uid: 0
};

function loadCustom() {
  try {
    const raw = localStorage.getItem('layout-builder-custom-v2');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}
function saveCustom() {
  localStorage.setItem('layout-builder-custom-v2', JSON.stringify(state.custom.map(stripFns)));
}

function nextId() { return `p${++state.uid}_${Date.now()}`; }

// --- DOM refs ---
const $ = (s) => document.querySelector(s);
const builtInList = $('#builtInList');
const customList = $('#customList');
const canvas = $('#canvas');
const emptyState = $('#emptyState');
const canvasCount = $('#canvasCount');
const toast = $('#toast');

// --- Render palette ---
function renderPalette() {
  builtInList.innerHTML = '';
  BUILT_IN_COMPONENTS.forEach(c => builtInList.appendChild(makeTile(c, false)));

  customList.innerHTML = '';
  if (state.custom.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'hint small';
    empty.style.fontStyle = 'italic';
    empty.style.gridColumn = '1 / -1';
    empty.textContent = 'No custom components yet.';
    customList.appendChild(empty);
  } else {
    state.custom.forEach(c => customList.appendChild(makeTile(c, true)));
  }
}

function makeTile(c, isCustom) {
  const el = document.createElement('div');
  el.className = 'palette-tile';
  el.draggable = true;
  el.dataset.componentId = c.id;
  el.dataset.source = isCustom ? 'custom' : 'built-in';
  el.title = c.desc || c.name;

  el.innerHTML = `
    <div class="tile-thumb">${c.thumb ? c.thumb() : defaultThumb(c)}</div>
    <div class="tile-name">${escapeHTML(c.name)}</div>
    ${isCustom ? `<button class="tile-remove" title="Delete from palette" aria-label="Delete component">✕</button>` : ''}
  `;

  el.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/x-new-component', c.id + '::' + (isCustom ? 'custom' : 'built-in'));
  });

  if (isCustom) {
    el.querySelector('.tile-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      state.custom = state.custom.filter(x => x.id !== c.id);
      saveCustom();
      renderPalette();
      showToast(`Removed "${c.name}"`);
    });
  }
  return el;
}

function defaultThumb(c) {
  const shape = c.shape || 'block';
  const stroke = '#3d5af1', faint = '#aab4f0', fill = '#f6f7ff';
  if (shape === 'circle') {
    return `<svg viewBox="0 0 120 50" fill="none" stroke="${stroke}" stroke-width="1.5"><circle cx="60" cy="25" r="18" fill="${fill}"/></svg>`;
  }
  if (shape === 'bar') {
    return `<svg viewBox="0 0 120 50" fill="none" stroke="${stroke}" stroke-width="1.5"><rect x="8" y="20" width="104" height="10" rx="2" fill="${fill}"/></svg>`;
  }
  if (shape === 'card') {
    return `<svg viewBox="0 0 120 50" fill="none" stroke="${stroke}" stroke-width="1.5">
      <rect x="22" y="6" width="76" height="38" rx="2" fill="#ffffff"/>
      <rect x="28" y="12" width="40" height="3" rx="1" fill="${faint}" stroke="none"/>
      <rect x="28" y="19" width="60" height="3" rx="1" fill="${faint}" stroke="none" opacity="0.7"/>
      <rect x="28" y="26" width="50" height="3" rx="1" fill="${faint}" stroke="none" opacity="0.7"/>
    </svg>`;
  }
  if (shape === 'panel') {
    return `<svg viewBox="0 0 120 50" fill="none" stroke="${stroke}" stroke-width="1.5"><rect x="44" y="4" width="32" height="42" rx="2" fill="${fill}"/></svg>`;
  }
  return `<svg viewBox="0 0 120 50" fill="none" stroke="${stroke}" stroke-width="1.5"><rect x="8" y="6" width="104" height="38" rx="2" fill="${fill}"/></svg>`;
}

// --- Component lookup ---
function findComponent(id, source) {
  if (source === 'custom') return state.custom.find(c => c.id === id);
  return BUILT_IN_COMPONENTS.find(c => c.id === id);
}

// --- Render canvas ---
function renderCanvas() {
  [...canvas.querySelectorAll('.placed, .drop-zone')].forEach(n => n.remove());

  if (state.placed.length === 0) {
    emptyState.style.display = 'flex';
    canvasCount.textContent = '0 components';
    return;
  }
  emptyState.style.display = 'none';

  state.placed.forEach((p, idx) => {
    canvas.appendChild(makeDropZone(idx));
    canvas.appendChild(makePlaced(p, idx));
  });
  canvas.appendChild(makeDropZone(state.placed.length));

  canvasCount.textContent = `${state.placed.length} component${state.placed.length === 1 ? '' : 's'}`;
}

function makeDropZone(index) {
  const dz = document.createElement('div');
  dz.className = 'drop-zone';
  dz.dataset.dropIndex = index;
  return dz;
}

function makePlaced(item, index) {
  const comp = findComponent(item.componentId, item.source);
  const el = document.createElement('div');
  el.className = 'placed';
  el.draggable = true;
  el.dataset.placedId = item.uid;
  if (item.w) el.style.setProperty('--w', item.w + 'px');
  if (item.h) el.style.setProperty('--h', item.h + 'px');

  const renderedHTML = comp ? comp.render(item) : `<em>Missing component</em>`;
  el.innerHTML = `
    <div class="placed-actions">
      <button class="placed-up" title="Move up" aria-label="Move up">▲</button>
      <button class="placed-down" title="Move down" aria-label="Move down">▼</button>
      <button class="placed-reset" title="Reset size" aria-label="Reset size">↺</button>
      <button class="placed-remove" title="Remove" aria-label="Remove">✕</button>
    </div>
    <div class="placed-label">${escapeHTML(comp?.name || 'Component')}</div>
    <div class="placed-body">${renderedHTML}</div>
    <div class="resize-handle right"   data-dir="e"  title="Drag to resize width"></div>
    <div class="resize-handle bottom"  data-dir="s"  title="Drag to resize height"></div>
    <div class="resize-handle corner"  data-dir="se" title="Drag to resize"></div>
  `;

  el.querySelector('.placed-up').addEventListener('click', () => moveItem(index, -1));
  el.querySelector('.placed-down').addEventListener('click', () => moveItem(index, +1));
  el.querySelector('.placed-remove').addEventListener('click', () => {
    state.placed.splice(index, 1);
    renderCanvas();
  });
  el.querySelector('.placed-reset').addEventListener('click', () => {
    delete item.w;
    delete item.h;
    renderCanvas();
  });

  // Drag-to-reorder
  el.addEventListener('dragstart', (e) => {
    if (el.classList.contains('resizing')) { e.preventDefault(); return; }
    el.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/x-reorder', String(index));
  });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));

  // Resize handlers
  el.querySelectorAll('.resize-handle').forEach(h => {
    h.addEventListener('mousedown', (e) => beginResize(e, el, item, h.dataset.dir));
  });

  return el;
}

function moveItem(index, delta) {
  const newIdx = index + delta;
  if (newIdx < 0 || newIdx >= state.placed.length) return;
  const [item] = state.placed.splice(index, 1);
  state.placed.splice(newIdx, 0, item);
  renderCanvas();
}

// --- Resize ---
function beginResize(e, el, item, dir) {
  e.preventDefault();
  e.stopPropagation();
  el.draggable = false;
  el.classList.add('resizing');

  const startX = e.clientX;
  const startY = e.clientY;
  const rect = el.getBoundingClientRect();
  const startW = rect.width;
  const startH = rect.height;
  const minW = 120;
  const minH = 60;
  const maxW = canvas.clientWidth - 60;
  const maxH = 1200;

  // Size hint
  const hint = document.createElement('div');
  hint.className = 'size-hint';
  el.appendChild(hint);

  function onMove(ev) {
    let newW = startW;
    let newH = startH;
    if (dir.includes('e')) newW = clamp(startW + (ev.clientX - startX), minW, maxW);
    if (dir.includes('s')) newH = clamp(startH + (ev.clientY - startY), minH, maxH);
    el.style.setProperty('--w', newW + 'px');
    el.style.setProperty('--h', newH + 'px');
    item.w = Math.round(newW);
    item.h = Math.round(newH);
    hint.textContent = `${item.w} × ${item.h}`;
  }
  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    el.classList.remove('resizing');
    el.draggable = true;
    hint.remove();
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// --- Drag/drop on canvas ---
canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
  const newComp = e.dataTransfer.types.includes('application/x-new-component');
  const reorder = e.dataTransfer.types.includes('application/x-reorder');
  if (!newComp && !reorder) return;
  e.dataTransfer.dropEffect = newComp ? 'copy' : 'move';
  canvas.classList.add('drag-over');
  const zone = nearestDropZone(e.clientY);
  document.querySelectorAll('.drop-zone.active').forEach(z => z.classList.remove('active'));
  if (zone) zone.classList.add('active');
});

canvas.addEventListener('dragleave', (e) => {
  if (e.target === canvas) {
    canvas.classList.remove('drag-over');
    document.querySelectorAll('.drop-zone.active').forEach(z => z.classList.remove('active'));
  }
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  canvas.classList.remove('drag-over');
  const zone = nearestDropZone(e.clientY);
  document.querySelectorAll('.drop-zone.active').forEach(z => z.classList.remove('active'));
  const dropIndex = zone ? Number(zone.dataset.dropIndex) : state.placed.length;

  const newCompData = e.dataTransfer.getData('application/x-new-component');
  const reorderData = e.dataTransfer.getData('application/x-reorder');

  if (newCompData) {
    const [id, source] = newCompData.split('::');
    const comp = findComponent(id, source);
    if (!comp) return;
    state.placed.splice(dropIndex, 0, {
      uid: nextId(),
      componentId: comp.id,
      source: source,
      w: comp.defaultW,
      h: comp.defaultH
    });
    renderCanvas();
  } else if (reorderData !== '') {
    const fromIdx = Number(reorderData);
    let toIdx = dropIndex;
    if (toIdx > fromIdx) toIdx -= 1;
    if (toIdx === fromIdx) return;
    const [item] = state.placed.splice(fromIdx, 1);
    state.placed.splice(toIdx, 0, item);
    renderCanvas();
  }
});

function nearestDropZone(clientY) {
  const zones = [...canvas.querySelectorAll('.drop-zone')];
  if (zones.length === 0) return null;
  let best = zones[0];
  let bestDist = Infinity;
  for (const z of zones) {
    const r = z.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const d = Math.abs(center - clientY);
    if (d < bestDist) { bestDist = d; best = z; }
  }
  return best;
}

// --- Custom modal ---
const modalBackdrop = $('#modalBackdrop');
$('#openAddCustom').addEventListener('click', openModal);
$('#cancelCustom').addEventListener('click', closeModal);
$('#saveCustom').addEventListener('click', saveCustomComponent);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) closeModal();
});

function openModal() {
  $('#customName').value = '';
  $('#customDesc').value = '';
  $('#customShape').value = 'block';
  modalBackdrop.classList.remove('hidden');
  setTimeout(() => $('#customName').focus(), 50);
}
function closeModal() {
  modalBackdrop.classList.add('hidden');
}

function defaultSizeForShape(shape) {
  switch (shape) {
    case 'bar':    return { w: 480, h: 50 };
    case 'card':   return { w: 280, h: 160 };
    case 'panel':  return { w: 240, h: 320 };
    case 'circle': return { w: 140, h: 140 };
    default:       return { w: 320, h: 140 };
  }
}

function saveCustomComponent() {
  const name = $('#customName').value.trim();
  const desc = $('#customDesc').value.trim();
  const shape = $('#customShape').value;
  if (!name) {
    showToast('Give your component a name first');
    $('#customName').focus();
    return;
  }
  const size = defaultSizeForShape(shape);
  const comp = {
    id: 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    name,
    desc: desc || 'Custom component',
    shape,
    defaultW: size.w,
    defaultH: size.h
  };
  attachFns(comp);
  state.custom.push(comp);
  saveCustom();
  renderPalette();
  closeModal();
  showToast(`Added "${name}" — drag it onto the canvas`);
}

function attachFns(c) {
  if (c.kind === 'sketch') {
    c.render = () => renderSketchComponent(c);
    c.thumb = () => sketchThumb(c);
  } else {
    c.render = () => renderCustomComponent(c);
    c.thumb = () => defaultThumb(c);
  }
  return c;
}
function stripFns(c) {
  const { render, thumb, ...rest } = c;
  return rest;
}

function renderSketchComponent(c) {
  return `
    <div class="wf-sketch">
      <img src="${c.dataUrl}" alt="${escapeHTML(c.name)}" draggable="false" />
    </div>`;
}
function sketchThumb(c) {
  return `<img src="${c.dataUrl}" alt="${escapeHTML(c.name)}" style="max-width:100%;max-height:100%;object-fit:contain;" draggable="false" />`;
}

function renderCustomComponent(c) {
  const shapeClass = `shape-${c.shape || 'block'}`;
  const desc = c.desc || c.name;
  return `
    <div class="wf-custom ${shapeClass}">
      <div class="wf-custom-body">
        <strong style="font-family: 'Figtree', sans-serif; font-style: normal; color: var(--ink); font-size: 14px;">${escapeHTML(c.name)}</strong>
        <div style="margin-top:6px;">${escapeHTML(desc)}</div>
      </div>
    </div>
  `;
}

// Re-attach functions on stored custom components.
state.custom = state.custom.map(c => attachFns(c));

// --- Toolbar ---
$('#clearCanvas').addEventListener('click', () => {
  if (state.placed.length === 0) return;
  if (!confirm('Remove all components from the canvas?')) return;
  state.placed = [];
  renderCanvas();
});
$('#toggleGrid').addEventListener('click', () => {
  canvas.classList.toggle('grid-on');
});
$('#exportLayout').addEventListener('click', () => {
  const layout = state.placed.map(p => {
    const c = findComponent(p.componentId, p.source);
    return {
      name: c?.name || '?',
      source: p.source,
      id: p.componentId,
      w: p.w,
      h: p.h
    };
  });
  const json = JSON.stringify(layout, null, 2);
  navigator.clipboard?.writeText(json).then(
    () => showToast('Layout JSON copied to clipboard'),
    () => alert(json)
  );
});

// --- Helpers ---
function escapeHTML(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2400);
}

// ============================================================
// Draw-a-component modal
// ============================================================
const drawBackdrop = $('#drawBackdrop');
const drawCanvas = $('#drawCanvas');
const dctx = drawCanvas.getContext('2d');
let drawState = {
  tool: 'pen',
  color: '#3d5af1',
  size: 2,
  drawing: false,
  strokes: [],     // each stroke: {tool, color, size, points: [{x,y}]}
  current: null
};

$('#openDrawCustom').addEventListener('click', openDrawModal);
$('#cancelDraw').addEventListener('click', closeDrawModal);
$('#saveDraw').addEventListener('click', saveDrawnComponent);
drawBackdrop.addEventListener('click', (e) => {
  if (e.target === drawBackdrop) closeDrawModal();
});

document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    drawState.tool = btn.dataset.tool;
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    drawState.size = Number(btn.dataset.size);
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    drawState.color = btn.dataset.color;
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
$('#drawUndo').addEventListener('click', () => {
  drawState.strokes.pop();
  redrawSketch();
});
$('#drawClear').addEventListener('click', () => {
  drawState.strokes = [];
  redrawSketch();
});

function openDrawModal() {
  $('#drawName').value = '';
  drawState.strokes = [];
  drawState.current = null;
  drawBackdrop.classList.remove('hidden');
  redrawSketch();
  setTimeout(() => $('#drawName').focus(), 50);
}
function closeDrawModal() {
  drawBackdrop.classList.add('hidden');
}

function pointFromEvent(e) {
  const r = drawCanvas.getBoundingClientRect();
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  // Account for CSS scaling
  return {
    x: (cx - r.left) * (drawCanvas.width / r.width),
    y: (cy - r.top) * (drawCanvas.height / r.height)
  };
}

function startStroke(e) {
  e.preventDefault();
  drawState.drawing = true;
  drawState.current = {
    tool: drawState.tool,
    color: drawState.color,
    size: drawState.size * (drawState.tool === 'eraser' ? 6 : 1),
    points: [pointFromEvent(e)]
  };
}
function moveStroke(e) {
  if (!drawState.drawing) return;
  e.preventDefault();
  drawState.current.points.push(pointFromEvent(e));
  redrawSketch();
}
function endStroke() {
  if (!drawState.drawing) return;
  drawState.drawing = false;
  if (drawState.current && drawState.current.points.length > 0) {
    drawState.strokes.push(drawState.current);
  }
  drawState.current = null;
  redrawSketch();
}

drawCanvas.addEventListener('mousedown', startStroke);
drawCanvas.addEventListener('mousemove', moveStroke);
window.addEventListener('mouseup', endStroke);
drawCanvas.addEventListener('touchstart', startStroke);
drawCanvas.addEventListener('touchmove', moveStroke);
drawCanvas.addEventListener('touchend', endStroke);

function redrawSketch() {
  dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  const allStrokes = drawState.current
    ? [...drawState.strokes, drawState.current]
    : drawState.strokes;
  for (const s of allStrokes) drawStroke(s);
}
function drawStroke(s) {
  dctx.lineCap = 'round';
  dctx.lineJoin = 'round';
  dctx.lineWidth = s.size;
  if (s.tool === 'eraser') {
    dctx.globalCompositeOperation = 'destination-out';
    dctx.strokeStyle = '#000';
  } else {
    dctx.globalCompositeOperation = 'source-over';
    dctx.strokeStyle = s.color;
  }
  dctx.beginPath();
  const p = s.points;
  if (p.length === 1) {
    dctx.arc(p[0].x, p[0].y, s.size / 2, 0, Math.PI * 2);
    dctx.fillStyle = dctx.strokeStyle;
    dctx.fill();
    return;
  }
  dctx.moveTo(p[0].x, p[0].y);
  for (let i = 1; i < p.length; i++) dctx.lineTo(p[i].x, p[i].y);
  dctx.stroke();
}

function saveDrawnComponent() {
  const name = $('#drawName').value.trim() || 'Sketch';
  if (drawState.strokes.length === 0) {
    showToast('Draw something first');
    return;
  }
  // Bounding box around strokes for tighter export
  const dataUrl = drawCanvas.toDataURL('image/png');
  const comp = {
    id: 'sketch_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    kind: 'sketch',
    name,
    desc: 'Sketched component',
    dataUrl,
    defaultW: 360,
    defaultH: 220
  };
  attachFns(comp);
  state.custom.push(comp);
  saveCustom();
  renderPalette();
  closeDrawModal();
  showToast(`Added "${name}" — drag it onto the canvas`);
}

// --- Init ---
renderPalette();
renderCanvas();
