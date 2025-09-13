const CACHE_NAME = 'arcane-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './styles/global.css',   // só esse
  './scripts/svg-inject.min.js',
  './assets/icons/heart.svg',
  './assets/icons/minimize.svg',
  './assets/icons/pause.svg',
  './assets/icons/chevron-left.svg',
  './assets/icons/chevron-right.svg',
  './assets/icons/play.svg',
  './assets/icons/random.svg',
  './assets/icons/repeat.svg',
  './assets/icons/volume.svg',
  './assets/jinx.png',
  './assets/user.jpg',
  './fonts/GT-Eesti-Display-Medium.otf',
  './fonts/GT-Eesti-Display-Regular.otf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
