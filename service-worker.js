"use strict";
var cacheName = "eMusicality-cache-v1",
    urlsToCache = [
        "/",
        "/index.html",
        "/node_modules/angular/angular.min.js",
        "/node_modules/angular-route/angular-route.min.js",
        "/node_modules/angular-sanitize/angular-sanitize.min.js",
        "/scripts/emusicality.js"
    ];

self.addEventListener("install", function (event) {
    event.waitUntil(self.skipWaiting()
        .then(function (event) {
            caches.open(cacheName)
                .then(function (cache) {
                    console.log("emu:cache:opened", cacheName);
                    cache.addAll(urlsToCache)
                        .then(function (value) {
                            return console.log("emu:cache:addAll", urlsToCache);
                        });
                })
        }))
});

self.addEventListener("activate", function (event) {
    event.waitUntil(clients.claim().then(function (event) {
        console.debug("emu:sw:activated");
    }));
});

self.addEventListener("fetch", function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response)
            return response;
        return fetch(event.request);
    }));
});