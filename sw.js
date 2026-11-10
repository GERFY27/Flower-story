const CACHE="flower-story-v2";
const FILES=["./","./index.html","./manifest.webmanifest","./%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B5%D0%BC%20%D1%81%D1%82%D0%BE%D0%BB%D0%B5.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match("./index.html"))));});
