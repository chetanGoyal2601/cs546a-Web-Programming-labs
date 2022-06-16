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
  try {
    validation(name, genre, website, recordLabel, bandMembers, yearFormed);
  } catch (e) {
    throw e;
  }

  let bandElement = {
    name: name,
    genre: genre,
    website: website,
    recordLabel: recordLabel,
    bandMembers: bandMembers,
    yearFormed: yearFormed,
    albums: [],
    overallRating: 0,
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
  if (!bandList) throw { code: 400, message: "Could not get all bands!" };
  bandList.forEach((e) => {
    e._id = e._id.toString();
    // e.albums.forEach((i) => {
    //   i._id = i._id.toString();
    // });
  });
  //console.log(bandList);
  return bandList;
}

async function get(id) {
  if (!id) throw { code: 400, message: "You must provide an id to search for" };
  if (typeof id !== "string")
    throw { code: 400, message: "Id must be a string" };
  if (id.trim().length === 0)
    throw { code: 400, message: "Id cannot be an empty string or just spaces" };
  id = id.trim();
  if (!ObjectId.isValid(id)) throw { code: 400, message: "invalid object ID" };

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: ObjectId(id) });
  if (band === null) throw { code: 404, message: "No band with that id" };
  band._id = band._id.toString();
  //   band.albums.forEach((e) => {
  //       e._id = e._id.toString();
  //   })
  return band;
}

async function remove(id) {
  if (!id) throw { code: 400, message: "You must provide an id to search for" };
  if (typeof id !== "string")
    throw { code: 400, message: "Id must be a string" };
  if (id.trim().length === 0)
    throw { code: 400, message: "Id cannot be an empty string or just spaces" };
  id = id.trim();
  if (!ObjectId.isValid(id)) throw { code: 400, message: "invalid object ID" };

  const bandCollection = await bands();
  try {
    await this.get(id);
  } catch (e) {
    throw e;
  }

  const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw { code: 400, message: `Could not delete band with id of ${id}` };
  }
  return id;
}

async function update(
  id,
  name,
  genre,
  website,
  recordLabel,
  bandMembers,
  yearFormed
) {
  try {
    validation(name, genre, website, recordLabel, bandMembers, yearFormed);
  } catch (e) {
    throw e;
  }

  // Error check on ID
  if (!id) throw { code: 400, message: "You must provide an id to search for" };
  if (typeof id !== "string")
    throw { code: 400, message: "Id must be a string" };
  if (id.trim().length === 0)
    throw { code: 400, message: "Id cannot be an empty string or just spaces" };
  id = id.trim();
  if (!ObjectId.isValid(id)) throw { code: 400, message: "invalid object ID" };

  const bandCollection = await bands();
  try {
    await this.get(id);
  } catch (e) {
    throw e;
  }

  const updatedInfo = await bandCollection.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed,
      },
    }
  );
  //console.log(updatedInfo);
  if (updatedInfo.modifiedCount === 0) {
    throw { code: 400, message: "No update occured!" };
  }
  const band = await this.get(id);
  //console.log(band);
  //band._id = band._id.toString();
  return band;
}

function validation(
  name,
  genre,
  website,
  recordLabel,
  bandMembers,
  yearFormed
) {
  //Error check on name
  //console.log("Test!");
  if (!name) throw { code: 400, message: "You must provide a name!" };
  if (typeof name !== "string")
    throw { code: 400, message: "name should be a string!" };
  if (name.trim().length === 0)
    throw { code: 400, message: "name can not be empty" };

  //Errror check on recordLabel
  if (!recordLabel)
    throw { code: 400, message: "You must provide a record label!" };
  if (typeof recordLabel !== "string")
    throw { code: 400, message: "Record Label should be a string!" };
  if (recordLabel.trim().length === 0)
    throw { code: 400, message: "Record Label can not be empty" };

  //Error check on website
  if (!website) throw { code: 400, message: "You must provide a website!" };
  if (typeof website !== "string")
    throw { code: 400, message: "website should be a string!" };
  if (website.trim().length === 0)
    throw { code: 400, message: "website can not be empty" };
  if (
    website.trim().slice(-4) !== ".com" ||
    website.trim().slice(0, 11) !== "http://www." ||
    website.trim().length < 20
  ) {
    throw {
      code: 400,
      message: `Incorrect website ${website} provided. A website should have .com at the end, start with http://www. and have at least 5 characters in between!`,
    };
  }

  //Error check on yearFormed
  if (!yearFormed)
    throw {
      code: 400,
      message: "You must provide the year of band formation!",
    };
  if (typeof yearFormed !== "number")
    throw { code: 400, message: "The year formed has to be a number!" };
  if (yearFormed < 1900 || yearFormed > 2022)
    throw {
      code: 400,
      message: "The year should be greater than 1900 and less than 2022!",
    };

  //Error check on genre
  if (!genre) throw { code: 400, message: "You must provide a genre!" };
  if (!Array.isArray(genre))
    throw { code: 400, message: "genre should be an Array!" };
  if (genre.length === 0)
    throw { code: 400, message: "At least one element should be in genre!" };
  genre.forEach((element) => {
    if (typeof element !== "string" || element.trim().length === 0)
      throw {
        code: 400,
        message: "Only non empty strings allowed in the genre!",
      };
  });

  //Error check on band members
  if (!bandMembers)
    throw { code: 400, message: "band members must provide a genre!" };
  if (!Array.isArray(bandMembers))
    throw { code: 400, message: "band members should be an Array!" };
  if (bandMembers.length === 0)
    throw {
      code: 400,
      message: "At least one element should be in band members!",
    };
  bandMembers.forEach((element) => {
    if (typeof element !== "string" || element.trim().length === 0)
      throw {
        code: 400,
        message: "Only non empty strings allowed in the band members!",
      };
  });
  return;
}

module.exports = { create, getAll, get, remove, update };
