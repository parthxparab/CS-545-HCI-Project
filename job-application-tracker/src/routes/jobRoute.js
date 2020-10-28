const express = require("express");
const router = express.Router();
const data = require("../data");
const jobMethods = data.job;

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const job = await jobMethods.getJobById(id);
    res.json(job);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/", async (req, res) => {
  try {
    let job = await jobMethods.getAllJobs();
    res.status(200).json(job);
  } catch (e) {
    res.sendStatus(500).send();
  }
});

router.post("/newjob", async (req, res) => {
  let jobInfo = req.body;
  if (!jobInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (!jobInfo.CompanyName) {
    res.status(400).json({ error: "You must provide CompanyName" });
    return;
  }

  if (!jobInfo.jobTitle) {
    res.status(400).json({ error: "You must provide jobTitle" });
    return;
  }

  if (!jobInfo.timeStamp) {
    res.status(400).json({ error: "You must provide timeStamp" });
    return;
  }

  if (!jobInfo.appLink) {
    res.status(400).json({ error: "You must provide appLink" });
    return;
  }

  if (!jobInfo.status) {
    res.status(400).json({ error: "You must provide status" });
    return;
  }
  let notes;
  if (!jobInfo.notes) {
    notes = "";
  }
  if (jobInfo.notes) {
    notes = jobInfo.notes;
  }

  try {
    const newJob = await jobMethods.newJob(
      jobInfo.CompanyName,
      jobInfo.jobTitle,
      jobInfo.timeStamp,
      jobInfo.appLink,
      jobInfo.status,
      notes
    );
    res.status(200).json(newJob);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.patch("/:id", async (req, res) => {
  const updatedJob = req.body;

  if (!updatedJob.CompanyName) {
    updatedJob.CompanyName = undefined;
  }

  if (!updatedJob.jobTitle) {
    updatedJob.jobTitle = undefined;
  }
  if (!updatedJob.appLink) {
    updatedJob.appLink = undefined;
  }
  if (!updatedJob.status) {
    updatedJob.status = undefined;
  }

  try {
    await jobMethods.getJobById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  try {
    const updatedData = await jobMethods.patchUpdate(
      req.params.id,
      updatedJob.CompanyName,
      updatedJob.jobTitle,
      updatedJob.appLink,
      updatedJob.status
    );
    res.json(updatedData);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/status/:id", async (req, res) => {
  const updatedJob = req.body;
  if (!updatedJob) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }
  if (!updatedJob.timeStamp) {
    res.status(400).json({ error: "You must provide timeStamp" });
    return;
  }
  if (!updatedJob.status) {
    res.status(400).json({ error: "You must provide status" });
    return;
  }

  try {
    await jobMethods.getJobById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  try {
    const updatedData = await jobMethods.changeJobStatus(
      req.params.id,
      updatedJob.status,
      updatedJob.timeStamp
    );
    res.json(updatedData);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await jobMethods.deleteJob(req.params.id);
    res.json(deletedJob);
  } catch (e) {
    res.sendStatus(500).json({ error: e });
  }
});

module.exports = router;
