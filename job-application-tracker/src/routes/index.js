const job = require("./jobRoute");

const constructorMethod = (app) => {
  app.use("/api/job", job);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
