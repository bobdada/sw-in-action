const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

// self.addEventListener("install", (event) => {
//   console.log("install vaisako");
//   event.waitUntil(
//     addResourcesToCache(["/sw-test/", "/index.html", "/style.css", "/pp.js"])
//   );
// });

// self.addEventListener("fetch", function (event) {
//   console.log("inside fetch function", event);
//   const myFile = `
//     p{
//         color:red
//     }
//     `; //text-based data(perhaps html,css, js, etc)
//   const blob = new Blob([myFile], { type: "text/css" });
//   const myresponse = new Response(blob, {
//     headers: { contentType: "text/css" },
//   }); // the custom response

//   const url = event.request.url;
//   console.log({ url });
//   if (url.endsWith("style.css")) {
//     event.respondWith(myresponse);
//   }
// });

self.addEventListener("install", function (event) {
  // Skip the 'waiting' lifecycle phase, to go directly from 'installed' to 'activated', even if
  // there are still previous incarnations of this service worker registration active.
  event.waitUntil(self.skipWaiting());
  console.log("installeedddd");
});

self.addEventListener("activate", function (event) {
  // Claim any clients immediately, so that the page will be under SW control without reloading.
  console.log("activatedddddd CLIENTS", self.clients);
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  console.log("inside fetch event of sw");
  var regex = /https:\/\/www.googleapis.com\/youtube\/v3\/playlistItems/;
  if (event.request.url.match(regex)) {
    // Only call event.respondWith() if this looks like a YouTube API request.
    // Because we don't call event.respondWith() for non-YouTube API requests, they will not be
    // handled by the service worker, and the default network behavior will apply.
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          if (!response.ok) {
            // An HTTP error response code (40x, 50x) won't cause the fetch() promise to reject.
            // We need to explicitly throw an exception to trigger the catch() clause.
            throw Error("response status " + response.status);
          }

          // If we got back a non-error HTTP response, return it to the page.
          console.log({ response });
          return response;
        })
        .catch(function (error) {
          console.warn(
            "Constructing a fallback response, " +
              "due to an error while fetching the real response:",
            error
          );

          // For demo purposes, use a pared-down, static YouTube API response as fallback.
          var fallbackResponse = {
            items: [
              {
                snippet: { title: "Fallback Title 1" },
              },
              {
                snippet: { title: "Fallback Title 2" },
              },
              {
                snippet: { title: "Fallback Title 3" },
              },
            ],
          };

          // Construct the fallback response via an in-memory variable. In a real application,
          // you might use something like `return fetch(FALLBACK_URL)` instead,
          // to retrieve the fallback response via the network.
          return new Response(JSON.stringify(fallbackResponse), {
            headers: { "Content-Type": "application/json" },
          });
        })
    );
  }
});

// addEventListener('fetch', event => {
//     event.waitUntil(async function() {
//       // Exit early if we don't have access to the client.
//       // Eg, if it's cross-origin.
//       if (!event.clientId) return;

//       // Get the client.
//       const client = await clients.get(event.clientId);
//       // Exit early if we don't get the client.
//       // Eg, if it closed.
//       if (!client) return;

//       // Send a message to the client.
//       client.postMessage({
//         msg: "Hey I just got a fetch from you!",
//         url: event.request.url
//       });

//     }());
//   });

let data;
self.addEventListener("message", function (event) {
  console.log("message from parent js", event.data);
  data = event.data;
});
