const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

async function create(
  name,
  genre,
  website,
  recordLabel,
  bandMembers,
  yearFormed
) {
  //Error check on name
  //console.log("Test!");
  if (!name) throw "You must provide a name!";
  if (typeof name !== "string") throw "name should be a string!";
  if (name.trim().length === 0) throw "name can not be empty";

  //Errror check on recordLabel
  if (!recordLabel) throw "You must provide a record label!";
  if (typeof recordLabel !== "string") throw "Record Label should be a string!";
  if (recordLabel.trim().length === 0) throw "Record Label can not be empty";

  //Error check on website
  if (!website) throw "You must provide a website!";
  if (typeof website !== "string") throw "website should be a string!";
  if (website.trim().length === 0) throw "website can not be empty";
  if (
    website.trim().slice(-4) !== ".com" ||
    website.trim().slice(0, 11) !== "http://www." ||
    website.trim().length < 20
  ) {
    throw `Incorrect website ${website} provided. A website should have .com at the end, start with http://www. and have at least 5 characters in between!`;
  }

  //Error check on yearFormed
  if (!yearFormed) throw "You must provide the year of band formation!";
  if (typeof yearFormed !== "number")
    throw "The year formed has to be a number!";
  if (yearFormed < 1900 || yearFormed > 2022)
    throw "The year should be greater than 1900 and less than 2022!";

  //Error check on genre
  if (!genre) throw "You must provide a genre!";
  if (!Array.isArray(genre)) throw "genre should be an Array!";
  if (genre.length === 0) throw "At least one element should be in genre!";
  genre.forEach((element) => {
    if (typeof element !== "string" || element.trim().length === 0)
      throw "Only non empty strings allowed in the genre!";
  });

  //Error check on band members
  if (!bandMembers) throw "band members must provide a genre!";
  if (!Array.isArray(bandMembers)) throw "band members should be an Array!";
  if (bandMembers.length === 0)
    throw "At least one element should be in band members!";
  bandMembers.forEach((element) => {
    if (typeof element !== "string" || element.trim().length === 0)
      throw "Only non empty strings allowed in the band members!";
  });

  let bandElement = {
    name: name,
    genre: genre,
    website: website,
    recordLabel: recordLabel,
    bandMembers: bandMembers,
    yearFormed: yearFormed,
  };

  const bandCollection = await bands();
  const bandInfo = await bandCollection.insertOne(bandElement);
  if (bandInfo.insertedCount === 0) throw "Could not add band";

  const newId = bandInfo.insertedId.toString();

  const band = await this.get(newId);
  band._id = band._id.toString();
  //console.log(band, typeof(band));
  return band;
}

async function getAll() {
  const bandCollection = await bands();
  const bandList = await bandCollection.find({}).toArray();
  if (!bandList) throw "Could not get all bands!";
  bandList.forEach((e) => {
    e._id = e._id.toString();
  });
  //console.log(bandList);
  return bandList;
}

async function get(id) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "invalid object ID";
  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: ObjectId(id) });
  if (band === null) throw "No band with that id";
  band._id = band._id.toString();
  return band;
}

async function remove(id) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "invalid object ID";

  const bandCollection = await bands();
  const band = await get(id);
  const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete band with id of ${id}`;
  }
  return `${band.name} has been successfully deleted!`;
}

async function rename(id, newName) {
  // Error check on id
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "id cannot be an empty string or just spaces";
  id = id.trim();

  // Error check on new name
  if (!newName) throw "You must provide a name for your band";
  if (typeof newName !== "string") throw "Name must be a string";
  if (newName.trim().length === 0)
    throw "Name cannot be an empty string or string with just spaces";

  if (!ObjectId.isValid(id)) throw "invalid object ID";

  newName = newName.trim();

  const bandCollection = await bands();
  const updateBand = {
    name: newName,
  };
  const band = await this.get(id);
  if (band.name === newName) {
    throw "Band already has this name";
  }
  const updatedInfo = await bandCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: updateBand }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update band successfully";
  }
  return await this.get(id);
}

module.exports = { create, getAll, get, remove, rename };
