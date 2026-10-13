// K-Trail Seoul — service worker
// Caches the app shell for offline use, and runtime-caches map tiles
// as they are viewed so previously-browsed areas work without wifi.

const SHELL_CACHE = "ktrail-shell-v4";
const TILE_CACHE = "ktrail-tiles-v1";

const SHELL_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n !== SHELL_CACHE && n !== TILE_CACHE)
          .map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Map tiles: cache-first, so a previously viewed area works offline.
  if (url.includes("tile.openstreetmap.org")) {
    event.respondWith(
      caches.open(TILE_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((resp) => {
            cache.put(event.request, resp.clone());
            return resp;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // App shell + static assets: cache-first with network fallback.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((resp) => {
        const copy = resp.clone();
        caches.open(SHELL_CACHE).then((cache) => cache.put(event.request, copy));
        return resp;
      }).catch(() => cached);
    })
  );
});
