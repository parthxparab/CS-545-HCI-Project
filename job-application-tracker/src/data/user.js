const mongoCollections = require("./db/mongoCollections");
const users = mongoCollections.users;
const ObjectId = require("mongodb").ObjectId;

async function getUserById(id) {
  if (!id) throw "You must provide an id to search for";
  if (id.length == 0) throw "Please provide proper length of the id";
  if (typeof id === "undefined" || id == null)
    throw "Please provide proper type of id";

  const userCollection = await users();
  const userData = await userCollection.findOne({ _id: ObjectId(id) });
  return userData;
}

async function newUser(firstName, lastName, email) {
  var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!firstName || !lastName || !email) throw "Please provide all the feilds";
  if (typeof firstName !== "string") throw "Invalid First Name provided";
  if (typeof lastName !== "string") throw "Invalid Last Name provided";
  if (mailformat.test(email) == false) throw "Please provide proper  mailid";
  if (typeof email !== "string") throw "Invalid Email Provided";
  const userCollection = await users();

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const newInsertInformation = await userCollection.insertOne(newUser);
  const newId = newInsertInformation.insertedId;

  const newUserDetails = await this.getUserById(newId);
  return newUserDetails;
}

module.exports = {
  getUserById,
  newUser,
};
