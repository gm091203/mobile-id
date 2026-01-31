const CACHE_NAME = 'mobile-id-v3';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './manifest.json',
    './icon.png',
    './id_photo.jpg',
    './home_bg.png',
    './home_logged_in.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request).catch(() => {
                    // Fallback or just let it fail silently if not in cache
                    return new Response('Network error occurred', {
                        status: 408,
                        statusText: 'Network error occurred'
                    });
                });
            })
    );
});
