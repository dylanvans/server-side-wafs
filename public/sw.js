self.addEventListener('install', event => event.waitUntil(
    caches.open('tg-v1-core')
        .then(cache => cache.add('/offline/'))
        .then(self.skipWaiting())
));

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(err => fetchOfflinePage())
	);

	function fetchOfflinePage() {
    	return caches.open('tg-v1-core')
       		.then(cache => cache.match('/offline/'));
	}
});