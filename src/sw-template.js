/* eslint-disable no-undef */

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.loadModule('workbox-background-sync')


workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } =workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheNetWorkFirst = [
    '/api/auth/renew',
    '/api/events'
];
registerRoute(
    ({ request, url }) => {
        // console.log({request, url});

        if(cacheNetWorkFirst.includes(url.pathname)) return true;


        return false;
    },
    new NetworkFirst()
)

//REFERENCIAS

// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst()
// )


const chacheFirstNetwork = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'
];

registerRoute(
    ({request, url})=> {
        // console.log(url);
        if(chacheFirstNetwork.includes(url.href)) return true;
        return false;
    },
    new CacheFirst()
);





// POSTEOS OFFLINE

const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});


const envApiurl = 'https://mern-calendar-exp.herokuapp.com/api';

console.log(envApiurl);

registerRoute(
    new RegExp(`${envApiurl}/events/new`),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
);


registerRoute(
    new RegExp(`${envApiurl}/events/edit/`),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'PUT'
);


registerRoute(
    new RegExp(`${envApiurl}/events/delete/`),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'DELETE'
);

