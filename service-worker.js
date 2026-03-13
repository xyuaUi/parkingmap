const CACHE_NAME = 'party-budu-v2'; // Versi diubah agar cache lama terhapus
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './map/map.glb',
    './karakter/karakter.glb'
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Memaksa service worker baru langsung aktif
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
