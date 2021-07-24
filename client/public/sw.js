/* eslint-disable no-restricted-globals */

const CACHE_VERSION = '1.00'
const CURRENT_CACHES = {
    dynamic: 'dynamic-cache-v'+CACHE_VERSION
}

// self.addEventListener('install', event=> {
//     caches.open('static-first-cache')
//         .then( cache=> {
//             cache.addAll(['/greyhound.jpg'])
//         })
// })


self.addEventListener('activate', event=> {
    const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
    event.waiteUntil(
        caches.keys().then( cacheNames=> {
            return Promise.all(
            cacheNames.map( cacheName=> {
                if (!expectedCacheNamesSet.has(cacheName)) {
                    return caches.delete(cacheName);
                }
            }))
        })
    )
    self.clients.claim();
})




self.addEventListener('fetch', event=> {

        // check if request is made by chrome extensions or web page or web socket
        if (!(/http(s?)/gi).test(event.request.url) || /socket.io/.test(event.request.url) ) return;
        
        // network first or apis
        if((/api|\/users/gi).test(event.request.url)){
            event.respondWith(
                fetch(event.request)
                    .then( netResponse=> {
                        return caches.open(CURRENT_CACHES.dynamic).then( cache=> {
                            cache.put(event.request, netResponse.clone());
                            return netResponse;
                        })
                    })
                    .catch( err=> {
                        console.log(err)
                        return caches.match(event.request);
                    })
            )
        } else {
            // cache first for any request
            event.respondWith(
                caches.match(event.request).then( response=> {
                    if(response) return response;
                    return fetch(event.request).then( netResponse=> {
                        caches.open(CURRENT_CACHES.dynamic).then( cache=> {
                            cache.put(event.request, netResponse.clone());
                            return netResponse;
                        })
                    })
                })   
            )
        }
})

self.addEventListener('sync', function(e) {
    switch(e.tag) {
        case "EMIT_NEW_MESSAGE":
            const bc = new BroadcastChannel('sync');
            bc.postMessage({type: 'fuck sw'})
            break;
        default:
            console.log('tag is undifined')
            break;
    }
});

self.addEventListener('notificationclick', function(e) {
    // fire when user click on actions or own notification that we can insert a switch here and do somthing...
        console.warn(e.action)
});

self.addEventListener('push', function(e) {
    const data = e.data.json();

    const title = data.notification.title;
    const options = data.notification;
    // we can add tag to options if isn't exists.
    registration.showNotification(title, options)
})
