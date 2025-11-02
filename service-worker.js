const CACHE_NAME = 'banca móvil BCP_v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/perfil.html',
  '/imagen/app_icon_xxxhdpi.png',
  '/imagen/splash_icon_xxxhdpi.png'
  '/inicio.html'
  '/login.html'
];  

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
