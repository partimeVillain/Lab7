// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

var Cache= 'lab7-cache-v1';
var url = 'https://cse110lab6.herokuapp.com/entries'


self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(Cache)
        .then(function(cache) {
          console.log('install');
          return cache.addAll(url);
        })
    );
  });

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request).then(function(response) {
        if (response) {
            return response;
        }
        return fetch(event.request);
    }));
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });
  