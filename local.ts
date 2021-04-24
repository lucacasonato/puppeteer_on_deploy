import app from "./main.tsx";

app.addEventListener("listen", (evt) => {
  console.log(`Listening on http://${evt.hostname ?? "localhost"}:${evt.port}`);
});

await app.listen(":8080");
