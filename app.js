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

// ---- City toggle ----
let activeCity = "seoul";
function renderCityToggle(containerId, onPick) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  CITIES.forEach(city => {
    const btn = document.createElement("button");
    btn.className = "city-btn" + (city.key === activeCity ? " city-btn--active" : "");
    btn.textContent = city.label;
    btn.addEventListener("click", () => {
      if (city.key === activeCity) return;
      activeCity = city.key;
      renderCityToggle("city-toggle", onPick);
      renderCityToggle("city-toggle-list", onPick);
      if (window._leafletMap) {
        window._leafletMap.setView(city.center, city.zoom);
      }
      onPick();
    });
    el.appendChild(btn);
  });
}

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
  return PILGRIMAGE_SPOTS.filter(s =>
    s.city === activeCity && (activeCategory === "all" || s.category === activeCategory)
  );
}

// Re-renders both the map markers and the list — the one thing every
// filter control (city toggle, chips, legend) needs to do after a pick.
function applyFilters() {
  renderMarkers();
  renderList();
}

// Sets the category filter and jumps to the Map tab showing it — used by
// the About page's legend, so tapping "Agencies" there behaves like tapping
// the "Agencies" chip and switching to Map, instead of doing nothing.
function filterByCategoryAndShowMap(categoryKey) {
  activeCategory = categoryKey;
  renderChips("chips", applyFilters);
  renderChips("chips-list", applyFilters);
  applyFilters();
  const mapTab = document.querySelector('.tab[data-view="map"]');
  if (mapTab) mapTab.click();
}

// ---- Map ----
let markers = [];
function initMap() {
  const startCity = CITIES.find(c => c.key === activeCity) || CITIES[0];
  const map = L.map("map", { zoomControl: false }).setView(startCity.center, startCity.zoom);
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
    const glyph = CATEGORY_ICONS[spot.category] || "📍";
    const icon = L.divIcon({
      className: "",
      html: `<div class="pin-marker" style="background:${color}"><span>${glyph}</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });
    const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(window._leafletMap);
    // Always-on name label next to the pin — without it, every agency pin
    // on the map is just the same building icon, and there's no way to
    // tell HYBE's pin from SM's or JYP's without tapping each one.
    marker.bindTooltip(spot.name, {
      permanent: true,
      direction: "right",
      offset: [10, -16],
      className: "map-label",
    });
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
  const glyph = CATEGORY_ICONS[spot.category] || "📍";
  card.innerHTML = `
    <div class="card__swatch" style="background:${color}">${glyph}</div>
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
  // Pairing the name with the coordinates (rather than passing coordinates
  // alone) lets Google Maps resolve this to the real, named place — with
  // its own card, hours, and "explore nearby" — instead of dropping an
  // unlabeled pin that gets snapped to the nearest road for routing.
  const destination = `${currentSpot.name}, ${currentSpot.lat},${currentSpot.lng}`;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  window.open(url, "_blank");
});

// ---- Legend (About page) ----
// Rows are buttons: tapping a category filters the map/list to it and
// jumps to the Map tab, the same as tapping that category's chip.
function renderLegend() {
  const el = document.getElementById("legend");
  if (!el) return;
  el.innerHTML = "";
  CATEGORIES.filter(cat => cat.key !== "all").forEach(cat => {
    const row = document.createElement("button");
    row.className = "legend-row";
    row.type = "button";
    const color = CATEGORY_COLORS[cat.key] || "#C1502E";
    const glyph = CATEGORY_ICONS[cat.key] || "📍";
    row.innerHTML = `
      <span class="legend-row__icon" style="background:${color}">${glyph}</span>
      <span class="legend-row__label">${cat.label}</span>
      <span class="legend-row__arrow">&rsaquo;</span>`;
    row.addEventListener("click", () => filterByCategoryAndShowMap(cat.key));
    el.appendChild(row);
  });
}

// ---- Boot ----
renderCityToggle("city-toggle", applyFilters);
renderCityToggle("city-toggle-list", applyFilters);
renderChips("chips", applyFilters);
renderChips("chips-list", applyFilters);
initMap();
renderList();
renderLegend();

// ---- Service worker (offline support) ----
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline support unavailable */ });
  });
}
