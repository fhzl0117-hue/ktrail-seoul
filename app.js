// K-Trail Seoul — prototype app logic

// ---- Language ----
// Must run before anything below that calls t()/tCity()/tCategoryChip()/
// tCategoryLabel() — including the synchronous iOS install-banner check
// further down, which fires during initial script evaluation, not from
// an event listener. detectInitialLang()/UI_STRINGS/etc. live in i18n.js,
// loaded before this file. The rest of the language-picker wiring (the
// header's globe menu, setLang(), refreshAllText()) is set up in the
// "Language picker" section further down, grouped with the other header
// controls — only the detection itself needs to happen this early.
currentLang = detectInitialLang();
document.documentElement.lang = currentLang;
document.documentElement.dir = isRTL(currentLang) ? "rtl" : "ltr";

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
    btn.textContent = tCity(city.key);
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
    chip.textContent = tCategoryChip(cat.key);
    chip.addEventListener("click", () => {
      activeCategory = cat.key;
      renderChips("chips", onPick);
      renderChips("chips-list", onPick);
      onPick();
    });
    el.appendChild(chip);
  });
}

// ---- Search ----
// Scoped to the active city (not global) on purpose: the map is always
// zoomed to one city, so a cross-city match would show pins the user
// can't see anyway. The List tab stays consistent with the Map tab
// rather than behaving differently depending on which tab you're on.
let searchQuery = "";
function setSearchQuery(q) {
  searchQuery = q;
  [["search-input", "search-clear"], ["search-input-list", "search-clear-list"]].forEach(([inputId, clearId]) => {
    const input = document.getElementById(inputId);
    const clearBtn = document.getElementById(clearId);
    if (input && input.value !== q) input.value = q;
    if (clearBtn) clearBtn.hidden = q.length === 0;
  });
  applyFilters();
}
["search-input", "search-input-list"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", (e) => setSearchQuery(e.target.value));
});
["search-clear", "search-clear-list"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", () => setSearchQuery(""));
});

function filteredSpots() {
  const q = searchQuery.trim().toLowerCase();
  return PILGRIMAGE_SPOTS.filter(s =>
    s.city === activeCity &&
    (activeCategory === "all" || s.category === activeCategory) &&
    (q === "" || s.name.toLowerCase().includes(q) || s.blurb.toLowerCase().includes(q))
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
  const empty = document.getElementById("list-empty");
  const spots = filteredSpots();
  el.innerHTML = "";
  spots.forEach(spot => el.appendChild(makeCard(spot)));
  if (empty) empty.style.display = spots.length === 0 ? "block" : "none";
}

function makeCard(spot) {
  const card = document.createElement("button");
  card.className = "card";
  const color = CATEGORY_COLORS[spot.category] || "#C1502E";
  const glyph = CATEGORY_ICONS[spot.category] || "📍";
  card.innerHTML = `
    <div class="card__swatch" style="background:${color}">${glyph}</div>
    <div class="card__body">
      <p class="card__cat">${tCategoryLabel(spot.categoryLabel)}</p>
      <p class="card__name">${spot.name}</p>
      <p class="card__blurb">${spot.blurb}</p>
    </div>`;
  card.addEventListener("click", () => openSheet(spot));
  return card;
}

// ---- Saved ----
// Grouped by city (fixed CITIES order, same as the city-toggle elsewhere),
// then sorted within each city by category and, as a tiebreaker, by most-
// recently-saved first — so a city you just starred something in shows
// your newest pick at the top instead of wherever it happens to sit in
// PILGRIMAGE_SPOTS. Previously this was a single flat, unsorted list.
function updateSavedBadge() {
  const count = getSaved().length;
  const badge = document.getElementById("saved-count");
  if (!badge) return;
  badge.textContent = count > 0 ? `(${count})` : "";
  badge.hidden = count === 0;
}
function renderSaved() {
  const el = document.getElementById("saved-list");
  const empty = document.getElementById("saved-empty");
  const savedIds = getSaved(); // oldest -> newest, per toggleSaved's push order
  const recencyRank = new Map(savedIds.map((id, i) => [id, i])); // higher = more recent
  const savedSet = new Set(savedIds);
  const catRank = new Map(CATEGORIES.filter(c => c.key !== "all").map((c, i) => [c.key, i]));
  el.innerHTML = "";

  let totalShown = 0;
  CITIES.forEach(city => {
    const citySpots = PILGRIMAGE_SPOTS
      .filter(s => s.city === city.key && savedSet.has(s.id))
      .sort((a, b) => {
        const catDiff = (catRank.get(a.category) ?? 99) - (catRank.get(b.category) ?? 99);
        if (catDiff !== 0) return catDiff;
        return (recencyRank.get(b.id) ?? 0) - (recencyRank.get(a.id) ?? 0);
      });
    if (!citySpots.length) return;
    totalShown += citySpots.length;
    const section = document.createElement("div");
    section.className = "saved-section";
    const header = document.createElement("h3");
    header.className = "saved-section__header";
    header.innerHTML = `${city.label} <span class="saved-section__count">${citySpots.length}</span>`;
    section.appendChild(header);
    citySpots.forEach(spot => section.appendChild(makeCard(spot)));
    el.appendChild(section);
  });

  empty.style.display = totalShown === 0 ? "block" : "none";
  updateSavedBadge();
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
  catEl.textContent = tCategoryLabel(spot.categoryLabel);
  catEl.style.background = CATEGORY_COLORS[spot.category] || "#C1502E";
  // Optional external link (Stay "Check rates", Eat/airport "View on
  // map" / "Search flights") — only rendered when the spot defines one,
  // added in the Oct 2026 Stay/Eat/flights pass. See data.js comment on
  // linkUrl for why these are plain search links, not affiliate links yet.
  const linkEl = document.getElementById("sheet-link");
  if (spot.linkUrl) {
    linkEl.href = spot.linkUrl;
    linkEl.textContent = spot.linkLabel ? tLinkLabel(spot.linkLabel) : t("sheetLinkMoreInfo");
    linkEl.hidden = false;
  } else {
    linkEl.hidden = true;
  }
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
  btn.textContent = saved ? t("sheetSaveActive") : t("sheetSaveDefault");
  btn.classList.toggle("saved", saved);
}

document.getElementById("sheet-save").addEventListener("click", () => {
  if (!currentSpot) return;
  toggleSaved(currentSpot.id);
  updateSaveButton();
  updateSavedBadge();
  // Bug fix (full feature audit, Oct 2026): if the Saved tab is the view
  // currently showing, re-render it right away. Previously only
  // switching tabs triggered renderSaved() (see the tab click handler
  // above), so unsaving a spot from its own sheet while already looking
  // at the Saved tab left a stale card on screen — the badge count would
  // update, but the card itself stuck around until you left and came
  // back to the tab.
  if (document.getElementById("view-saved").classList.contains("view--active")) {
    renderSaved();
  }
});

// ---- Share ----
// Builds a canonical link back into this spot — `location.origin +
// location.pathname` (not location.href) so a share made FROM an already-
// shared page doesn't compound query params.
function buildSpotShareUrl(spot) {
  return `${location.origin}${location.pathname}?spot=${encodeURIComponent(spot.id)}`;
}

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("toast--show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("toast--show"), 2200);
}

document.getElementById("sheet-share").addEventListener("click", async () => {
  if (!currentSpot) return;
  const url = buildSpotShareUrl(currentSpot);
  // Web Share API opens the device's native share sheet (KakaoTalk,
  // Messages, etc. on mobile) — preferred whenever it's available.
  if (navigator.share) {
    try {
      await navigator.share({ title: `${currentSpot.name} — K-Trail Seoul`, text: currentSpot.blurb, url });
    } catch (e) { /* user cancelled the native share sheet — not an error */ }
    return;
  }
  // Fallback for browsers without Web Share (most desktop browsers):
  // copy the link, with a last-resort prompt() if Clipboard API fails.
  try {
    await navigator.clipboard.writeText(url);
    showToast(t("toastLinkCopied"));
  } catch (e) {
    window.prompt("Copy this link:", url);
  }
});

document.getElementById("sheet-directions").addEventListener("click", () => {
  if (!currentSpot) return;
  // REVERTED, then REPLACED Oct 2026. First tried pairing the name with
  // coordinates ("Name, lat,lng") so Google Maps would resolve to the real
  // named place — backfired, because Google's destination geocoder matches
  // the NAME against its own business listings first and, when it finds
  // one, uses THAT listing's location and silently ignores the coordinates
  // (sent JYP to the stale/cancelled Olympic Park site). When the name
  // matches nothing (e.g. "HYBE Headquarters", not an indexed alias), it
  // fails outright with "could not be found."
  // Falling back to coordinates alone fixed the correctness problem but
  // lost the rich place card (name, photo, hours, rating) that Google shows
  // for a real listing — landing straight on a bare Plus Code pin instead.
  // The fix for spots where the exact listing is known: use Google's CID
  // (a stable per-place numeric id, unambiguous unlike name-matching) via
  // the `https://www.google.com/maps?cid=<id>` deep link, which opens the
  // real place card directly. Spots without a verified placeCid fall back
  // to the plain coordinate link, which is always correct even if plainer.
  const url = currentSpot.placeCid
    ? `https://www.google.com/maps?cid=${currentSpot.placeCid}`
    : `https://www.google.com/maps/dir/?api=1&destination=${currentSpot.lat},${currentSpot.lng}`;
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
    // Chevron direction follows reading direction — "next" points left in
    // an RTL language (Arabic) instead of right.
    const arrow = isRTL(currentLang) ? "&lsaquo;" : "&rsaquo;";
    row.innerHTML = `
      <span class="legend-row__icon" style="background:${color}">${glyph}</span>
      <span class="legend-row__label">${cat.label}</span>
      <span class="legend-row__arrow">${arrow}</span>`;
    row.addEventListener("click", () => filterByCategoryAndShowMap(cat.key));
    el.appendChild(row);
  });
}

// ---- Shared-link deep linking ----
// A link from the Share button (sheet-share) looks like
// "...?spot=<id>" — on load, jump straight to that spot's city and open
// its detail sheet, rather than always landing on Seoul/All.
function openSharedSpotFromUrl() {
  const spotId = new URLSearchParams(location.search).get("spot");
  if (!spotId) return;
  const spot = PILGRIMAGE_SPOTS.find(s => s.id === spotId);
  if (!spot) return;
  activeCity = spot.city;
  activeCategory = "all";
  renderCityToggle("city-toggle", applyFilters);
  renderCityToggle("city-toggle-list", applyFilters);
  renderChips("chips", applyFilters);
  renderChips("chips-list", applyFilters);
  const city = CITIES.find(c => c.key === spot.city);
  if (window._leafletMap && city) window._leafletMap.setView(city.center, city.zoom);
  applyFilters();
  openSheet(spot);
}

// ---- Offline map caching (current view only) ----
// The tile cache-first logic in sw.js already saves whatever tiles you
// happen to pan across — but that's incidental, not something you can
// rely on before going offline. This button makes it deliberate: tap it
// and the tiles for exactly what's on screen right now get saved.
//
// Deliberately NOT a "download this whole city" button. OpenStreetMap's
// tile usage policy (operations.osmfoundation.org/policies/tiles)
// prohibits bulk/automated downloading — a few hundred tiles for one
// city, fetched all at once, reads as exactly that kind of bulk scraping
// and risks tile.openstreetmap.org rate-limiting or blocking this app's
// requests entirely, which would break the map for every K-Trail user,
// not just the one person who tapped "download." Capping this to the
// current viewport keeps the request count in the same ballpark as what
// a person panning around that same screen would trigger anyway.
//
// "ktrail-tiles-v1" is sw.js's TILE_CACHE name, duplicated here rather
// than shared — app.js (page) and sw.js (service worker) are separate
// script contexts with no direct access to each other's constants. Keep
// the two in sync by hand if that name ever changes.
const OFFLINE_TILE_CACHE = "ktrail-tiles-v1";
const DOWNLOAD_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>';
const TILE_SUBDOMAINS = ["a", "b", "c"];
// Mirrors Leaflet's own TileLayer._getSubdomain (index = |x+y| % subdomains.length)
// so a prefetched tile's URL — and therefore its cache key — exactly matches
// the URL Leaflet requests later when that tile actually scrolls into view.
function tileUrl(z, x, y) {
  const s = TILE_SUBDOMAINS[Math.abs(x + y) % TILE_SUBDOMAINS.length];
  return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
}
function lngToTileX(lng, z) { return Math.floor((lng + 180) / 360 * Math.pow(2, z)); }
function latToTileY(lat, z) {
  const rad = lat * Math.PI / 180;
  return Math.floor((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2 * Math.pow(2, z));
}
async function saveCurrentViewOffline() {
  const map = window._leafletMap;
  const btn = document.getElementById("offline-save");
  if (!map || !btn || btn.disabled) return;
  if (!("caches" in window)) {
    showToast(t("toastOfflineUnsupported"));
    return;
  }
  const zoom = Math.round(map.getZoom());
  const bounds = map.getBounds();
  const minX = lngToTileX(bounds.getWest(), zoom);
  const maxX = lngToTileX(bounds.getEast(), zoom);
  const minY = latToTileY(bounds.getNorth(), zoom);
  const maxY = latToTileY(bounds.getSouth(), zoom);
  const urls = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) urls.push(tileUrl(zoom, x, y));
  }
  if (!urls.length) return;

  btn.disabled = true;
  btn.classList.add("offline-save--busy");
  let done = 0;
  let failed = 0;
  try {
    const cache = await caches.open(OFFLINE_TILE_CACHE);
    // A small worker pool, not one request per tile at once — polite to
    // the tile server and still finishes a screen's worth in a couple
    // of seconds.
    const CONCURRENCY = 4;
    let next = 0;
    async function worker() {
      while (next < urls.length) {
        const url = urls[next++];
        try {
          if (!(await cache.match(url))) {
            // no-cors: tile.openstreetmap.org doesn't send CORS headers
            // (Leaflet normally loads tiles as plain <img> requests, not
            // fetch()). The resulting "opaque" response can't be status-
            // checked, but it's still a valid, servable Cache Storage
            // entry — exactly how the existing runtime tile cache in
            // sw.js stores them too.
            const resp = await fetch(url, { mode: "no-cors" });
            await cache.put(url, resp);
          }
        } catch (e) { failed++; }
        done++;
        showToast(t("toastSavingProgress").replace("{done}", done).replace("{total}", urls.length));
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));
  } finally {
    btn.disabled = false;
    btn.classList.remove("offline-save--busy");
  }
  showToast(failed
    ? t("toastSavedPartial").replace("{ok}", urls.length - failed).replace("{total}", urls.length).replace("{failed}", failed)
    : t("toastSavedFull").replace("{n}", urls.length));
}
document.getElementById("offline-save-icon").innerHTML = DOWNLOAD_ICON;
document.getElementById("offline-save").addEventListener("click", saveCurrentViewOffline);

// ---- Theme (dark mode) ----
// Three-state model: no explicit choice -> follow the OS (prefers-color-scheme,
// handled entirely in CSS); explicit "light"/"dark" -> set data-theme on <html>
// and remember it, overriding the OS either direction. The toggle button always
// shows the icon for what tapping it will switch TO, not the current state.
const THEME_KEY = "ktrail_theme_v1";
const SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/></svg>';
const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.5A8.5 8.5 0 1 1 11.5 3 7 7 0 0 0 21 12.5z"/></svg>';

function getEffectiveTheme() {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function updateThemeToggleIcon() {
  const el = document.getElementById("theme-toggle-icon");
  if (!el) return;
  // Icon shown is the TARGET of a tap, so a dark page shows the sun
  // (tap to go light) and a light page shows the moon (tap to go dark).
  el.innerHTML = getEffectiveTheme() === "dark" ? SUN_ICON : MOON_ICON;
}
function setTheme(theme) {
  if (theme === "light" || theme === "dark") {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage unavailable */ }
  } else {
    document.documentElement.removeAttribute("data-theme");
    try { localStorage.removeItem(THEME_KEY); } catch (e) { /* storage unavailable */ }
  }
  updateThemeToggleIcon();
}
(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage unavailable */ }
  if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
  updateThemeToggleIcon();
})();
document.getElementById("theme-toggle").addEventListener("click", () => {
  setTheme(getEffectiveTheme() === "dark" ? "light" : "dark");
});
// No explicit override set -> the icon should still track a live OS theme
// change (e.g. the phone's auto dark-mode schedule kicking in) while the
// app is open, same as the CSS already does via prefers-color-scheme.
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (!document.documentElement.getAttribute("data-theme")) updateThemeToggleIcon();
  });
}

// ---- PWA install prompt ----
// Chrome/Edge/Android fire `beforeinstallprompt`; capturing it (and
// calling preventDefault) lets us trigger the native install flow from
// our own banner instead of leaving it to the browser's own mini-infobar,
// which is easy to miss or dismiss by accident. iOS Safari never fires
// this event — it has no programmatic install API at all — so there we
// show static "Share -> Add to Home Screen" instructions instead, since
// that's the only way to install on iOS. The banner never shows once the
// app is already running installed (standalone display mode), and a
// dismissal is remembered (localStorage) so it doesn't nag on every
// visit — it only comes back if storage is cleared.
const INSTALL_DISMISSED_KEY = "ktrail_install_dismissed_v1";
const INSTALL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>';
let deferredInstallPrompt = null;

function isStandaloneDisplay() {
  return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
}
function isInstallDismissed() {
  try { return localStorage.getItem(INSTALL_DISMISSED_KEY) === "1"; }
  catch (e) { return false; }
}
function isIOSDevice() {
  // iPadOS 13+ reports itself as "MacIntel" in the UA string, same as a
  // real Mac — maxTouchPoints is the only reliable way to tell them apart.
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
function hideInstallBanner() {
  const el = document.getElementById("install-banner");
  if (el) el.hidden = true;
}
function dismissInstallBanner() {
  try { localStorage.setItem(INSTALL_DISMISSED_KEY, "1"); } catch (e) { /* storage unavailable */ }
  hideInstallBanner();
}
function showInstallBanner(mode) {
  // mode: "prompt" (deferredInstallPrompt is ready to fire) or "ios"
  // (static instructions, no programmatic prompt available).
  if (isStandaloneDisplay() || isInstallDismissed()) return;
  const el = document.getElementById("install-banner");
  if (!el) return;
  document.getElementById("install-banner-icon").innerHTML = INSTALL_ICON;
  document.getElementById("install-banner-text").textContent = mode === "ios"
    ? t("installIOSText")
    : t("installPromptText");
  document.getElementById("install-banner-action").hidden = mode !== "prompt";
  el.hidden = false;
  // Remembered so a language switch can re-render this banner's text in
  // the new language without re-deriving iOS-vs-prompt from scratch —
  // see refreshAllText() in the language-picker section below.
  installBannerMode = mode;
}
let installBannerMode = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  showInstallBanner("prompt");
});
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  hideInstallBanner();
});
document.getElementById("install-banner-action").addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  try { await deferredInstallPrompt.userChoice; } catch (e) { /* ignore */ }
  deferredInstallPrompt = null;
  hideInstallBanner();
});
document.getElementById("install-banner-dismiss").addEventListener("click", dismissInstallBanner);

if (isIOSDevice() && !isStandaloneDisplay() && !isInstallDismissed()) {
  showInstallBanner("ios");
}

// ---- Language picker ----
// currentLang itself is already set (see the top of this file). This
// wires the header's globe button/menu and keeps already-rendered chrome
// in sync whenever the visitor changes language.
const GLOBE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
document.getElementById("lang-toggle-icon").innerHTML = GLOBE_ICON;

function updateLangToggleLabel() {
  const el = document.getElementById("lang-toggle-label");
  if (el) el.textContent = currentLang.toUpperCase();
}
function renderLangMenu() {
  const el = document.getElementById("lang-menu");
  if (!el) return;
  el.innerHTML = "";
  SUPPORTED_LANGS.forEach(code => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-option" + (code === currentLang ? " lang-option--active" : "");
    btn.textContent = LANG_LABELS[code];
    btn.addEventListener("click", () => {
      closeLangMenu();
      setLang(code);
    });
    el.appendChild(btn);
  });
}
function openLangMenu() {
  document.getElementById("lang-menu").hidden = false;
  document.getElementById("lang-toggle").setAttribute("aria-expanded", "true");
}
function closeLangMenu() {
  document.getElementById("lang-menu").hidden = true;
  document.getElementById("lang-toggle").setAttribute("aria-expanded", "false");
}
document.getElementById("lang-toggle").addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("lang-menu").hidden ? openLangMenu() : closeLangMenu();
});
// Click anywhere outside the picker closes an open menu.
document.addEventListener("click", (e) => {
  const picker = document.getElementById("lang-picker");
  if (picker && !picker.contains(e.target)) closeLangMenu();
});

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
  currentLang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL(lang) ? "rtl" : "ltr";
  refreshAllText();
}

// Re-renders every piece of ALREADY-rendered UI that carries translated
// text. applyI18n() alone only covers static markup (data-i18n attributes
// in index.html) — anything built dynamically in JS (chips, city toggle,
// cards, legend, an open sheet, a visible install banner) needs its own
// re-render call here, or it would keep showing the previous language
// until something else happened to trigger it.
function refreshAllText() {
  applyI18n();
  updateLangToggleLabel();
  renderLangMenu();
  renderCityToggle("city-toggle", applyFilters);
  renderCityToggle("city-toggle-list", applyFilters);
  renderChips("chips", applyFilters);
  renderChips("chips-list", applyFilters);
  renderList();
  renderLegend();
  if (document.getElementById("view-saved").classList.contains("view--active")) renderSaved();
  if (currentSpot && sheet.classList.contains("sheet--open")) openSheet(currentSpot);
  if (installBannerMode && !document.getElementById("install-banner").hidden) {
    showInstallBanner(installBannerMode);
  }
}

// ---- Boot ----
applyI18n();
updateLangToggleLabel();
renderLangMenu();
renderCityToggle("city-toggle", applyFilters);
renderCityToggle("city-toggle-list", applyFilters);
renderChips("chips", applyFilters);
renderChips("chips-list", applyFilters);
initMap();
renderList();
renderLegend();
updateSavedBadge();
openSharedSpotFromUrl();

// ---- Service worker (offline support) ----
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline support unavailable */ });
  });
}
