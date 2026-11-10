const CACHE="flower-story-v3";
const FILES=["./","./index.html","./manifest.webmanifest","./%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B5%D0%BC%20%D1%81%D1%82%D0%BE%D0%BB%D0%B5.png"];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
      return response;
    }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./index.html"))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  })));
});
