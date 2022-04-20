function enableRequestButtons() {
  console.log("enabledddd");
  var validButton = document.getElementById("fetchButton");
  validButton.addEventListener("click", function () {
    console.log("clickeedddddd");
    // This is a valid YouTube API key, and should result in a valid API request.
    makeApiRequest("AIzaSyCr0XVB-Hz1ohPpjvLatdj4qZ5zcSohHsU");
  });
  validButton.disabled = false;
}

function makeApiRequest(apiKey) {
  console.log("requestingggg api");
  var url =
    "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet" +
    "&maxResults=3&playlistId=UU_x5XG1OV2P6uZZ5FSM9Ttw&key=" +
    apiKey;
  const urll = " https://gorest.co.in/public/v2/users/";
  fetch(urll)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log("jsoonn items",json);
      var titles = json
        .map(function (item) {
          return '"' + item.name + '"';
        })
        .join(", ");
      console.log("data aayo aauna ta", titles);
    });
}

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/sw-test/sw.js",
        {
          scope: "/sw-test/",
        }
      );

      navigator.serviceWorker.ready.then(() => {
        console.log("service worker is ready");
        enableRequestButtons();
      });

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
        enableRequestButtons();
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const data = [1, 2, 3]; //any data you want to transfer
// let's transfer it to the serviceworker
if (navigator.serviceWorker.controller) {
  navigator.serviceWorker.postMessage(data);
}

// ...

registerServiceWorker();
