self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('recordatorio-cache').then(cache => {
      return cache.addAll([
        'recordatorio.html',
        'manifest.json',
        'icono.png',
        
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});