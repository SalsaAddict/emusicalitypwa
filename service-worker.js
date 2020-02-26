"use strict";
const
    version = 1,
    urlsToCache = [
        "/",
        "https://fonts.googleapis.com/css?family=Lato:400,700,400italic",
        "https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXg.woff2",
        "/node_modules/bootswatch/dist/darkly/bootstrap.min.css",
        "/node_modules/font-awesome/css/font-awesome.min.css",
        "/node_modules/angular/angular.min.js",
        "/node_modules/angular-route/angular-route.min.js",
        "/node_modules/angular-sanitize/angular-sanitize.min.js",
        "/scripts/emusicality.js",
        "/icons/192.png",
        "/icons/512.png",
        "/index.html"
    ],
    cacheName = "eMusicality-cache-v" + version,
    debugEnabled = location.hostname === "localhost" || location.hostname === "127.0.0.1";

function debug(message, ...args) {
    if (!debugEnabled) return;
    console.debug(message, ...args);
}

self.addEventListener("install", function (event) {
    event.waitUntil(self.skipWaiting()
        .then(function (event) {
            caches.open(cacheName)
                .then(function (cache) {
                    debug("emu:cache:opened", cacheName);
                    cache.addAll(urlsToCache)
                        .then(function (value) {
                            return debug("emu:cache:addAll", urlsToCache);
                        });
                })
        }))
});

self.addEventListener("activate", function (event) {
    event.waitUntil(clients.claim().then(function (event) {
        console.debug("emu:sw:activated");
    }));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    debug("emu:cache:add", e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});