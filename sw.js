importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('Deutsch-NotePad').then(function(cache) {
      return cache.addAll([
        '/Deutsch-NotePad/',
        'index.html',
        'css/bootstrap.min.css',
        'build.js',
        'img/icon.png',
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  //console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
