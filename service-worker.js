// PWA — Service Worker v5 (for GitHub Pages subpath)
// Fuerza actualización cambiando el nombre del caché
const CACHE_NAME = 'piensa-elige-v5';

// Recursos principales que debes servir desde tu repo
const ASSETS = [
  'index.html',
  'css/styles.css',
  'js/app.js',
  'manifest.json',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

// Precarga ilustraciones (14 historias × 7 páginas)
for (let i = 1; i <= 14; i++) {
  const id = 'h' + i;
  ['intro','situacion','conflicto','decision','finPos','finNeg','finRef'].forEach(k => {
    ASSETS.push(`assets/images/${id}_${k}.png`);
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
      .catch(err => console.error('Fallo al cachear archivos. Revisa rutas en ASSETS.', err))
  );
  self.skipWaiting(); // activa la nueva versión del SW más rápido
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => {
      if (k !== CACHE_NAME) return caches.delete(k);
    })))
  );
  // Opcional: tomar control inmediato de las páginas
  // self.clients.claim();
});

// Estrategia cache-first con fallback a red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
