// Nombre del caché con versión
const CACHE_NAME = 'banca-movil-bcp-v3';

// Archivos a cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/perfil.html',
  '/inicio.html',
  '/login.html',
  '/images/app_icon_xxxhdpi.png',
  '/images/splash_icon_xxxhdpi.png'
];

// Instalar y cachear los recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // fuerza instalación inmediata
  );
});

// Activar y limpiar versiones anteriores
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
