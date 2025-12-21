
// PWA — Service Worker v3 (GitHub Pages ready)
const CACHE_NAME = 'piensa-elige-v3';
const ASSETS = [
  'index.html',
  'styles.css',            // si tu CSS está en raíz; si está en /css, cambia a 'css/styles.css'
  'js/app.js',
  'manifest.json',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

// Agregar automáticamente las 14×7 ilustraciones
for (let i = 1; i <= 14; i++) {
  const id = 'h' + i;
  ['intro','situacion','conflicto','decision','finPos','finNeg','finRef'].forEach(k => {
    ASSETS.push(`assets/images/${id}_${k}.png`);
  });
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(ASSETS).catch(err => {
        console.error('Fallo al cachear archivos. Revisa rutas en ASSETS.', err);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME) ? caches.delete(k) : null))
    )
  );
  // self.clients.claim(); // opcional: toma control inmediato
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
