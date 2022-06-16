const albumRoutes = require("./tv_shows");

const constructorMethod = (app) => {
  app.use("/", albumRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not found" });
  });
};

module.exports = constructorMethod;
