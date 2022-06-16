const express = require("express");
const app = express();
const session = require("express-session");
const configRoutes = require("./routes");
const { engine } = require("express-handlebars");
const path = require("path");

const static = express.static(__dirname + "/public");
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(
  session({
    name: "AuthCookie",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(async (req, res, next) => {
  const currentTimestamp = new Date().toUTCString();
  const method = req.method;
  const url = req.originalUrl;
  if (req.session.user) {
    userAuthenticated = "(Authenticated User)";
  } else {
    userAuthenticated = "(Non-Authenticated User)";
  }

  console.log(`[${currentTimestamp}]: ${method} ${url} ${userAuthenticated}`);

  next();
});

app.use("/private", (req, res, next) => {
  if (!req.session.user) {
    res.status(403).sendFile(path.resolve("static/forbidden.html"));
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
