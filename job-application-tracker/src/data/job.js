/* eslint-disable no-throw-literal */
const mongoCollections = require("./db/mongoCollections");
const jobdb = mongoCollections.jobs;
const ObjectId = require("mongodb").ObjectId;

async function getJobById(id) {
  if (!id) throw "You must provide an id to search for";
  if (id.length <= 0) throw "Please provide proper length of the id";
  if (typeof id === "undefined" || id == null || id == "")
    throw "Please provide proper type of id";

  const jobCollection = await jobdb();
  const userData = await jobCollection.findOne({ _id: ObjectId(id) });
  return userData;
}

async function getAllJobs() {
  const jobCollection = await jobdb();

  const jobOutput = await jobCollection.find({}).toArray();

  return jobOutput;
}

async function newJob(
  companyName,
  jobTitle,
  timeStamp,
  description,
  appLink,
  // appLink = "www.google.com",
  status = "NA",
  notes = ""
) {
  if (!companyName || companyName === "" || companyName === null)
    throw "You must provide a Company Name for your entry";
  if (typeof companyName !== "string" || typeof companyName == "undefined")
    throw "Type of Company Name input must be String";

  if (!jobTitle || jobTitle === "" || jobTitle === null)
    throw "You must provide a Job Title for your entry";
  if (typeof jobTitle !== "string" || typeof jobTitle == "undefined")
    throw "Type of Job Title input must be String";

  if (!description || description === "" || description === null)
    throw "You must provide a description for your entry";
  if (typeof description !== "string" || typeof description == "undefined")
    throw "Type of description input must be String";

  if (!appLink || appLink === "" || appLink === null)
    throw "You must provide a application link for your entry";
  if (typeof appLink !== "string" || typeof appLink == "undefined")
    throw "Type of application link input must be String";

  if (!timeStamp || timeStamp === "" || timeStamp === null)
    throw "You must provide a timeStamp for your entry";
  if (typeof timeStamp !== "string" || typeof timeStamp == "undefined")
    throw "Type of timeStamp input must be String";

  if (notes || notes !== "" || notes !== null) {
    if (typeof notes !== "string" || typeof notes == "undefined")
      throw "Type of notes input must be String";
  }

  if (!status || status === "" || status === null)
    throw "You must provide a status for your entry";
  if (typeof status !== "string" || typeof status == "undefined")
    throw "Type of status input must be String";

  const jobCollection = await jobdb();

  const newJob = {
    companyName: companyName,
    jobTitle: jobTitle,
    timeStamp: timeStamp,
    description: description,
    appLink: appLink,
    status: status,
    notes: notes,
  };

  const newInsertInformation = await jobCollection.insertOne(newJob);
  const newId = newInsertInformation.insertedId;

  const newUserDetails = await this.getJobById(newId);
  return newUserDetails;
}

async function patchUpdate(
  id,
  companyName,
  jobTitle,
  appLink,
  status,
  notes,
  description
) {
  if (!id || typeof id !== "string" || id === undefined || id === null)
    throw "You must provide an id to search for";
  else if (
    companyName === undefined &&
    jobTitle === undefined &&
    appLink === undefined &&
    status === undefined &&
    notes === undefined &&
    appLink === undefined &&
    description === undefined
  )
    throw "You must enter atleast one value";
  else {
    const jobCollection = await jobdb();
    const old = await this.getJobById(id);

    if (companyName === undefined) {
      companyName = old.companyName;
    }
    if (jobTitle === undefined) {
      jobTitle = old.jobTitle;
    }
    if (status === undefined) {
      status = old.status;
    }
    if (notes === undefined) {
      notes = old.notes;
    }
    if (appLink === undefined) {
      appLink = old.appLink;
    }

    if (description === undefined) {
      description = old.description;
    }
    let updatedJobData;

    updatedJobData = {
      companyName: companyName,
      jobTitle: jobTitle,
      timeStamp: old.timeStamp,
      description: description,
      appLink: appLink,
      status: status,
      notes: notes,
    };
    const newInsertInformation = await jobCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedJobData }
    );
    if (newInsertInformation.modifiedCount == 0) {
      throw `Could not update task`;
    }

    return await this.getJobById(id);
  }
}

async function changeJobStatus(id, status, timeStamp) {
  // Acceptable values from list - Applied, Assessment, Interview, Offer, Reject, Wishlist

  if (!id || typeof id !== "string" || id === undefined || id === null)
    throw "You must provide an id to search for";

  if (!status || status === "" || status === null)
    throw "You must provide a status for your entry";
  if (typeof status !== "string" || typeof status == "undefined")
    throw "Type of status input must be String";

  if (!timeStamp || timeStamp === "" || timeStamp === null)
    throw "You must provide a timeStamp for your entry";
  if (typeof timeStamp !== "string" || typeof timeStamp == "undefined")
    throw "Type of timeStamp input must be String";

  const jobCollection = await jobdb();
  const old = await this.getJobById(id);
  let updatedJobData;

  updatedJobData = {
    companyName: old.companyName,
    jobTitle: old.jobTitle,
    timeStamp: timeStamp,
    status: status,
    notes: old.notes,
    appLink: old.appLink,
  };

  const newInsertInformation = await jobCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedJobData }
  );
  if (newInsertInformation.modifiedCount == 0) {
    throw `Could not update task`;
  }

  return await this.getJobById(id);
}

async function deleteJob(id) {
  if (!id || typeof id !== "string" || id === undefined || id === null)
    throw "You must provide an id to search for";

  const jobCollection = await jobdb();
  const removedJob = await this.getJobById(id);

  const deletionInfo = await jobCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete employee with id of ${id}`;
  }

  return removedJob;
}

module.exports = {
  getJobById,
  getAllJobs,
  newJob,
  patchUpdate,
  changeJobStatus,
  deleteJob,
};
