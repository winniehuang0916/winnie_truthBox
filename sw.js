const CACHE_NAME = "truthbox-v4";


const files = [

"./",

"./index.html",

"./style.css",

"./app.js",

"./questions.js",

"./manifest.json"

];




// 安裝

self.addEventListener(
"install",
event=>{


event.waitUntil(

caches.open(
CACHE_NAME
)
.then(cache=>{

return cache.addAll(
files
);

})

);


});






// 讀取快取

self.addEventListener(
"fetch",
event=>{


event.respondWith(

caches.match(
event.request
)
.then(response=>{


return response ||
fetch(event.request);



})


);


});
