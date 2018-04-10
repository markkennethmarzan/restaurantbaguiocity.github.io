self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    '/american.html',
                    '/chinese.html',
                    '/filipino.html',
                    '/index.html',
                    '/italian.html',
                    '/korean.html',
                    '/src/css/style.css',
                    '/src/js/index.js'
                ]
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );
});