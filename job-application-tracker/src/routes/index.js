const user = require("./userRoute");

const constructorMethod = (app) => {
  app.use("/api/user", user);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
