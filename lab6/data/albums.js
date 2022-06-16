const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

async function create(bandId, title, releaseDate, tracks, rating) {
  try {
    validation(bandId, title, releaseDate, tracks, rating);
  } catch (e) {
    throw e;
  }

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: ObjectId(bandId) });
  if (band === null) throw { code: 404, message: "No band with that id" };

  let albumElement = {
    _id: ObjectId(),
    title: title,
    releaseDate: releaseDate,
    tracks: tracks,
    rating: rating,
  };

  //   const albumCollection = await albums();
  //   const albumInfo = await albumCollection.insertOne(albumElement);
  //   if (albumInfo.insertedCount === 0) throw "Could not add album!";
  //   const newAlbumId = albumInfo.insertedId.toString();
  //   const album = await this.get(newAlbumId);

  //   let album_id = ObjectId();

  //   const updatedInfo = await bandCollection.updateOne(
  //     { _id: ObjectId(bandId) },
  //     { $push: { albums: albumElement } }
  //   );
  //   if (updatedInfo.modifiedCount === 0) {
  //     throw {
  //       code: 400,
  //       message: "No update occured in the band while adding album!",
  //     };
  //   }
  //let updatedBand = await bandCollection.findOne({ _id: ObjectId(bandId) });
  let o = band.overallRating;
  let l = band.albums.length;
  let r = parseFloat(rating.toFixed(1));
  //console.log(o, l, r);
  //console.log((o * l + r) / (l + 1));
  let sum = o * l;
  let newOverallRating = (sum + r) / (l + 1);
  newOverallRating = parseFloat(newOverallRating.toFixed(1));
  ////console.log(overallRating, newOverallRating);

  const updatedInfo = await bandCollection.updateOne(
    { _id: ObjectId(bandId) },
    {
      $push: { albums: albumElement },
      $set: { overallRating: newOverallRating },
    }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw {
      code: 400,
      message: "No update occured in the band while adding album!",
    };
  }

  albumElement._id = albumElement._id.toString();
  return albumElement;
}

async function getAll(bandId) {
  if (!bandId)
    throw { code: 400, message: "You must provide an id to search for" };
  if (typeof bandId !== "string")
    throw { code: 400, message: "Id must be a string" };
  if (bandId.trim().length === 0)
    throw { code: 400, message: "Id cannot be an empty string or just spaces" };
  bandId = bandId.trim();
  if (!ObjectId.isValid(bandId))
    throw { code: 400, message: "invalid object ID" };

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: ObjectId(bandId) });
  if (band === null) throw { code: 404, message: "No band with that id" };
  let albumList = band.albums;
  if (albumList.length === 0)
    throw { code: 404, message: "No albums present for this band Id" };
  albumList.forEach((e) => {
    e._id = e._id.toString();
  });
  return albumList;
}

async function get(albumId) {
  if (!albumId)
    throw { code: 400, message: "You must provide an id to search for" };
  if (typeof albumId !== "string")
    throw { code: 400, message: "Id must be a string" };
  if (albumId.trim().length === 0)
    throw { code: 400, message: "Id cannot be an empty string or just spaces" };
  albumId = albumId.trim();
  if (!ObjectId.isValid(albumId))
    throw { code: 400, message: "invalid object ID" };

  const bandCollection = await bands();
  //console.log("Hello");
  const album = await bandCollection.findOne(
    { "albums._id": ObjectId(albumId) },
    {
      projection: {
        _id: 0,
        albums: { $elemMatch: { _id: ObjectId(albumId) } },
      },
    }
  );
  ////console.log(album);

  if (album === null) throw { cose: 404, message: "No album with that id" };
  album.albums[0]._id = album.albums[0]._id.toString();
  return album.albums[0];
}

async function remove(albumId) {
  if (!albumId)
    throw { code: 400, message: "You must provide an id to search for" };
  if (typeof albumId !== "string")
    throw { code: 400, message: "Id must be a string" };
  if (albumId.trim().length === 0)
    throw { code: 400, message: "Id cannot be an empty string or just spaces" };
  albumId = albumId.trim();
  if (!ObjectId.isValid(albumId))
    throw { code: 400, message: "invalid object ID" };

  const bandCollection = await bands();

  //   const deletionInfo = await bandCollection.deleteOne({
  //     "albums._id": ObjectId(id),
  //   });

  //const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
  const band = await bandCollection.findOne({
    "albums._id": ObjectId(albumId),
  });
  //console.log(band);
  if (band == null) {
    throw { code: 404, message: "No band contains provided albums ID" };
  }
  const bandId = band._id;
  let thisAlbum = await this.get(albumId);
  let r = thisAlbum.rating;

  let o = band.overallRating;
  let l = band.albums.length;

  //console.log(o, l, r);
  //console.log((o * l + r) / (l + 1));
  let sum = o * l;
  let newOverallRating = (sum - r) / (l - 1);
  newOverallRating = parseFloat(newOverallRating.toFixed(1));

  const deleteInfo = await bandCollection.updateOne(
    { _id: bandId },
    {
      $pull: { albums: { _id: ObjectId(albumId) } },
      $set: { overallRating: newOverallRating },
    }
  );

  if (deleteInfo.modifiedCount === 0) {
    throw { code: 400, message: "No deletion occured!" };
  }
  const updatedBand = await bandCollection.findOne({ _id: bandId });
  return updatedBand;
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
  //console.log("FU1");
  if (!title) throw { code: 400, message: "You must provide a title!" };
  //console.log("FU1");
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

module.exports = { create, get, getAll, remove };
