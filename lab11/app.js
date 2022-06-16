const express = require("express");
const path = require("path");

const app = express();

const static = express.static(__dirname + "/public");

const PORT = 3000;

app.use("/public", static);

app.get("/", (request, response) => {
  response.sendFile(path.resolve("static/index.html"));
});

app.listen(PORT, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on http://localhost:${PORT}`);
});
