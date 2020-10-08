const express = require("express");
const router = express.Router();
const data = require("../data");
const userMethods = data.user;

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const user = await userMethods.getUserById(id);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/newuser", async (req, res) => {
  let userInfo = req.body;
  if (!userInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (!userInfo.firstName) {
    res.status(400).json({ error: "You must provide First Name" });
    return;
  }

  if (!userInfo.lastName) {
    res.status(400).json({ error: "You must provide Last Name" });
    return;
  }

  if (!userInfo.userEmail) {
    res.status(400).json({ error: "You must provide Email" });
    return;
  }

  try {
    const newTask = await userMethods.newUser(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.userEmail
    );
    res.status(200).json(newTask);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
