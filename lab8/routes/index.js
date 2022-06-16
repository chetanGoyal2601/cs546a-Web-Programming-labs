const primeRoute = require("./prime");

const constructorMethod = (app) => {
  app.use("/", primeRoute);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not found" });
  });
};

module.exports = constructorMethod;
