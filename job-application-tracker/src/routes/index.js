const newJob = require("./newJobRoute");

const constructorMethod = (app) => {
  app.use("/api/newjob", newJob);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page Not found" });
  });
};

module.exports = constructorMethod;
