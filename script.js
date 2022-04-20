navigator.serviceWorker.addEventListener("message", (event) => {
  console.log("data from sw to parent js", event.data.msg, event.data.url);
});

// fetch(`http://localhost:5500/style.css`).then((resp) => {
//   console.log("response after fetching localhost css file", resp);
// });


