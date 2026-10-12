// K-Trail Seoul — prototype app logic

const SAVE_KEY = "ktrail_saved_v1";

function getSaved() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "[]"); }
  catch (e) { return []; }
}
function setSaved(arr) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(arr)); }
  catch (e) { /* storage unavailable — fail silently */ }
}
function isSaved(id) { return getSaved().includes(id); }
function toggleSaved(id) {
  const arr = getSaved();
  const i = arr.indexOf(id);
  if (i >= 0) arr.splice(i, 1); else arr.push(id);
  setSaved(arr);
  return arr.includes(id);
}

// ---- View / tab switching ----
const views = { map: "view-map", list: "view-list", saved: "view-saved", about: "view-about" };
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("tab--active"));
    tab.classList.add("tab--active");
    Object.values(views).forEach(id => document.getElementById(id).classList.remove("view--active"));
    document.getElementById(views[tab.dataset.view]).classList.add("view--active");
    if (tab.dataset.view === "map" && window._leafletMap) {
      setTimeout(() => window._leafletMap.invalidateSize(), 50);
    }
    if (tab.dataset.view === "saved") renderSaved();
  });
});

// ---- Chips (category filter) ----
let activeCategory = "all";
function renderChips(containerId, onPick) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat.key === activeCategory ? " chip--active" : "");
    chip.textContent = cat.label;
    chip.addEventListener("click", () => {
      activeCategory = cat.key;
      renderChips("chips", onPick);
      renderChips("chips-list", onPick);
      onPick();
    });
    el.appendChild(chip);
  });
}

function filteredSpots() {
  return activeCategory === "all"
    ? PILGRIMAGE_SPOTS
    : PILGRIMAGE_SPOTS.filter(s => s.category === activeCategory);
}

// ---- Map ----
let markers = [];
function initMap() {
  const map = L.map("map", { zoomControl: false }).setView([37.5505, 126.99], 12);
  window._leafletMap = map;
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  L.control.zoom({ position: "bottomright" }).addTo(map);
  renderMarkers();
}

function renderMarkers() {
  markers.forEach(m => m.remove());
  markers = [];
  filteredSpots().forEach(spot => {
    const color = CATEGORY_COLORS[spot.category] || "#C1502E";
    const icon = L.divIcon({
      className: "",
      html: `<div class="pin-marker" style="background:${color}"><span>${spot.categoryLabel[0]}</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });
    const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(window._leafletMap);
    marker.on("click", () => openSheet(spot));
    markers.push(marker);
  });
}

// ---- List ----
function renderList() {
  const el = document.getElementById("list");
  el.innerHTML = "";
  filteredSpots().forEach(spot => el.appendChild(makeCard(spot)));
}

function makeCard(spot) {
  const card = document.createElement("button");
  card.className = "card";
  const color = CATEGORY_COLORS[spot.category] || "#C1502E";
  card.innerHTML = `
    <div class="card__swatch" style="background:${color}">${spot.categoryLabel[0]}</div>
    <div class="card__body">
      <p class="card__cat">${spot.categoryLabel}</p>
      <p class="card__name">${spot.name}</p>
      <p class="card__blurb">${spot.blurb}</p>
    </div>`;
  card.addEventListener("click", () => openSheet(spot));
  return card;
}

// ---- Saved ----
function renderSaved() {
  const el = document.getElementById("saved-list");
  const empty = document.getElementById("saved-empty");
  const savedIds = getSaved();
  const spots = PILGRIMAGE_SPOTS.filter(s => savedIds.includes(s.id));
  el.innerHTML = "";
  spots.forEach(spot => el.appendChild(makeCard(spot)));
  empty.style.display = spots.length === 0 ? "block" : "none";
}

// ---- Bottom sheet ----
const sheet = document.getElementById("sheet");
const backdrop = document.getElementById("sheet-backdrop");
let currentSpot = null;

function openSheet(spot) {
  currentSpot = spot;
  document.getElementById("sheet-name").textContent = spot.name;
  document.getElementById("sheet-address").textContent = spot.address;
  document.getElementById("sheet-blurb").textContent = spot.blurb;
  const catEl = document.getElementById("sheet-category");
  catEl.textContent = spot.categoryLabel;
  catEl.style.background = CATEGORY_COLORS[spot.category] || "#C1502E";
  updateSaveButton();
  sheet.classList.add("sheet--open");
  backdrop.classList.add("sheet-backdrop--open");
}
function closeSheet() {
  sheet.classList.remove("sheet--open");
  backdrop.classList.remove("sheet-backdrop--open");
}
backdrop.addEventListener("click", closeSheet);

function updateSaveButton() {
  const btn = document.getElementById("sheet-save");
  const saved = isSaved(currentSpot.id);
  btn.textContent = saved ? "★ Saved" : "☆ Save";
  btn.classList.toggle("saved", saved);
}

document.getElementById("sheet-save").addEventListener("click", () => {
  if (!currentSpot) return;
  toggleSaved(currentSpot.id);
  updateSaveButton();
});

document.getElementById("sheet-directions").addEventListener("click", () => {
  if (!currentSpot) return;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${currentSpot.lat},${currentSpot.lng}`;
  window.open(url, "_blank");
});

// ---- Boot ----
renderChips("chips", () => { renderMarkers(); renderList(); });
renderChips("chips-list", () => { renderMarkers(); renderList(); });
initMap();
renderList();

// ---- Service worker (offline support) ----
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline support unavailable */ });
  });
}
