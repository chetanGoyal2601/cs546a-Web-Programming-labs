const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const data = require("../data");

router.route("/").get(async (req, res) => {
  try {
    const bandList = await data.bandsData.getAll();
    const output = [];
    for (const i in bandList) {
      output.push({ _id: bandList[i]._id, name: bandList[i].name });
    }
    if (output.length === 0) {
      throw "No data Available!";
    }
    res.status(200).json(output);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// post a band, 400 in all
router.route("/").post(async (req, res) => {
  const bandInfo = req.body;

  try {
    ////console.log(bandInfo);
    validation(
      bandInfo.name,
      bandInfo.genre,
      bandInfo.website,
      bandInfo.recordLabel,
      bandInfo.bandMembers,
      bandInfo.yearFormed
    );
    //console.log("test2");
  } catch (e) {
    return res.status(e.code).send(e.messagee);
  }
  try {
    const addBand = await data.bandsData.create(
      bandInfo.name,
      bandInfo.genre,
      bandInfo.website,
      bandInfo.recordLabel,
      bandInfo.bandMembers,
      bandInfo.yearFormed
    );
    res.status(200).json(addBand);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
});

//get band with id - 400 in all cases, 404 when no band with that id exists
router.route("/:id").get(async (req, res) => {
  if (
    !req.params.id ||
    typeof req.params.id !== "string" ||
    req.params.id.trim().length === 0
  ) {
    return res
      .status(400)
      .json({ ErrorMessage: "A valid id must be provided!" });
  }
  try {
    objectValidation(req.params.id);
    const bandList = await data.bandsData.get(req.params.id);
    res.status(200).json(bandList);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
});

//put band with updated info, 400 - in all, 404 - when no band with that id exists
router.route("/:id").put(async (req, res) => {
  const bandInfo = req.body;

  try {
    validation(
      bandInfo.name,
      bandInfo.genre,
      bandInfo.website,
      bandInfo.recordLabel,
      bandInfo.bandMembers,
      bandInfo.yearFormed
    );
  } catch (e) {
    return res.status(e.code).send(e.message);
  }

  try {
    objectValidation(req.params.id);
    const updateBand = await data.bandsData.update(
      req.params.id,
      bandInfo.name,
      bandInfo.genre,
      bandInfo.website,
      bandInfo.recordLabel,
      bandInfo.bandMembers,
      bandInfo.yearFormed
    );
    res.status(200).json(updateBand);
  } catch (e) {
    //console.log("Fuckup");
    res.status(e.code).send(e.message);
  }
});

// 404 - when no band exists
router.route("/:id").delete(async (req, res) => {
  try {
    objectValidation(req.params.id);
    constbandRemoved = await data.bandsData.remove(req.params.id);
    res.status(200).json({ bandId: constbandRemoved, deleted: true });
  } catch (e) {
    res.status(e.code).send(e.message);
  }
});

function objectValidation(id) {
  if (!ObjectId.isValid(id)) throw { code: 400, message: "invalid object ID" };
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
  ////console.log("Test!");
  ////console.log(name);
  if (!name) throw { code: 400, message: "You must provide a name!" };
  ////console.log("name!");
  if (typeof name !== "string")
    throw { code: 400, message: "name should be a string!" };
  if (name.trim().length === 0)
    throw { code: 400, message: "name can not be empty" };
  ////console.log("name!");

  //Errror check on recordLabel
  if (!recordLabel)
    throw { code: 400, message: "You must provide a record label!" };
  if (typeof recordLabel !== "string")
    throw { code: 400, message: "Record Label should be a string!" };
  if (recordLabel.trim().length === 0)
    throw { code: 400, message: "Record Label can not be empty" };
  ////console.log("recordLabel!");

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
  ////console.log("WEBSITE");
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
  ////console.log("YEARFORMED");

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

  //console.log("Genre");

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
  ////console.log("bandmeme");
  return;
}

module.exports = router;
