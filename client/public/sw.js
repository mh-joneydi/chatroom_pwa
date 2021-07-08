/* eslint-disable no-restricted-globals */

self.addEventListener('install', event=> {
    console.log('installation SW', event);
})
self.addEventListener('activate', event=> {
    console.log('avtivation SW', event);
})
self.addEventListener('fetch', event=> {
    console.log('fetch data', event);
})
