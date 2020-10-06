const express = require("express");
const router = express.Router();
const data = require("../data");

const newJobMethods = data.newJob;

router.get("/", async (req, res) => {
  try {
    const user = await newJobMethods.test();
    res.json(user);
  } catch (e) {
    console.log("Server Error is " + e);
    res.status(500).json(e);
  }
});

module.exports = router;
