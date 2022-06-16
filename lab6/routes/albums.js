const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const data = require("../data");

// 400 in all, 404 - 1. if no band with bandId found, 2. if no album with that bandId is found
router.route("/:id").get(async (req, res) => {
  try {
    objectValidation(req.params.id);
    const albumList = await data.albumData.getAll(req.params.id);
    res.status(200).json(albumList);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
});

// 400 in all, 404 - when no band exists with that id
router.route("/:id").post(async (req, res) => {
  const info = req.body;
  try {
    validation(
      req.params.id,
      info.title,
      info.releaseDate,
      info.tracks,
      info.rating
    );
    const albumList = await data.albumData.create(
      req.params.id,
      info.title,
      info.releaseDate,
      info.tracks,
      info.rating
    );
    res.status(200).json(albumList);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
});

//400 in all, 400 when no album with that albumId exists
router.route("/album/:id").get(async (req, res) => {
  try {
    objectValidation(req.params.id);
    const album = await data.albumData.get(req.params.id);
    res.status(200).json(album);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
});

//400 in all, 404 when no album with that albumId exists
router.route("/:id").delete(async (req, res) => {
  try {
    objectValidation(req.params.id);
    await data.albumData.remove(req.params.id);
    res.status(200).json({ albumId: req.params.id, deleted: true });
  } catch (e) {
    res.status(e.code).send(e.message);
  }
});

function objectValidation(id) {
  if (!ObjectId.isValid(id)) throw { code: 400, message: "invalid object ID" };
}

function validation(bandId, title, releaseDate, tracks, rating) {
  //Error check on bandID
  if (!bandId)
    throw { code: 400, message: "Band ID must be provided to update!" };
  if (typeof bandId !== "string")
    throw { code: 400, message: "Band ID must be of string type!" };
  if (bandId.trim().length === 0)
    throw { code: 400, message: "Empty string as Band ID is invalid!" };
  if (!ObjectId.isValid(bandId))
    throw { code: 400, message: "invalid object ID" };

  //Error check on title
  //console.log("FU");
  if (!title) throw { code: 400, message: "You must provide a title!" };
  //console.log("FU");
  if (typeof title !== "string")
    throw { code: 400, message: "title should be a string!" };
  if (title.trim().length === 0)
    throw { code: 400, message: "title can not be empty" };

  //Error check on releaseDate
  //   if (!releaseDate)
  //     throw { code: 400, message: "You must provide the year for release!" };
  //   if (typeof releaseDate !== "number")
  //     throw { code: 400, message: "The year released has to be a number!" };
  //   if (releaseDate < 1900 || releaseDate > 2023)
  //     throw {
  //       code: 400,
  //       message: "The year should be greater than 1900 and less than 2023!",
  //     };
  //     var stringval = '01/03/2012';

  //   try {
  //     //console.log($.datepicker.parseDate("mm/dd/yy", releaseDate.trim()));
  //     // Notice 'yy' indicates a 4-digit year value
  //   } catch (e) {
  //     throw {
  //       code: 400,
  //       message:
  //         "Date is not valid. Format must be MM/DD/YYYY and the date value must be valid for the calendar.",
  //     };
  //   }
  try {
    let newReleaseDate = releaseDate.trim().split("/");
    let day = parseInt(newReleaseDate[1]);
    let month = parseInt(newReleaseDate[0]);
    let year = parseInt(newReleaseDate[2]);
    if (!Number.isInteger(month)) {
      throw { code: 400, message: "Invalid date" };
    } else if (!Number.isInteger(day)) {
      throw { code: 400, message: "Invalid date" };
    } else if (month > 12 || month < 1) {
      throw { code: 400, message: "Invalid date" };
    } else if (day < 1) {
      throw { code: 400, message: "Invalid date" };
    } else if (
      (month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12) &&
      day > 31
    ) {
      throw { code: 400, message: "Invalid date" };
    } else if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 30
    ) {
      throw { code: 400, message: "Invalid date" };
    } else if (month === 2 && day > 28) {
      throw { code: 400, message: "Invalid date" };
    }
    if (!Number.isInteger(year) || year > 2023 || year < 1900) {
      throw { code: 400, message: "Invalid date" };
    }
  } catch (e) {
    throw e;
  }

  //Error check on rating
  if (!rating) throw { code: 400, message: "You must provide a rating!" };
  if (typeof rating !== "number")
    throw { code: 400, message: "Rating should be a number" };
  if (rating < 1 || rating > 5)
    throw { code: 400, message: "Rating should be in between 1 to 5" };

  //Error check on tracks
  if (!tracks) throw { code: 400, message: "You must provide tracks!" };
  if (!Array.isArray(tracks))
    throw { code: 400, message: "You must provide an array for tracks!" };
  if (tracks.length < 3)
    throw {
      code: 400,
      message:
        "You must provide an array for tracks with at least 3 valid strings",
    };
  let valid = true;
  tracks.forEach((e) => {
    if (typeof e !== "string") {
      valid = false;
    } else if (e.trim().length === 0) {
      valid = false;
    }
  });
  if (!valid) throw { code: 400, message: "Invalid values in tracks!" };
  return;
}

module.exports = router;
