const cacheName = 'frontend-jedi';

const filesToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/index.bundle.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('caches.open');
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log('caches.match');
      return response || fetch(e.request);
    })
  );
});
