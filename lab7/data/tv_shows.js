const axios = require("axios");

async function searchShows(showName) {
  try {
    validation(showName);
  } catch (e) {
    throw e;
  }

  const { data } = await axios.get(
    "http://api.tvmaze.com/search/shows?q=" + showName
  );

  if (data.length < 1) {
    throw { code: 404, message: "No such show exists!" };
  }

  return data.slice(0, 4);
}

async function searchShowByID(id) {
  try {
    validationById(id);
  } catch (e) {
    throw e;
  }

  const { data } = await axios.get("http://api.tvmaze.com/shows/" + id);

  if (data.length < 1) {
    throw { code: 404, message: "No show exists on this ID!" };
  }

  return data;
}

function validation(showName) {
  if (!showName) throw { code: 400, message: "Show name must be provided!" };
  if (typeof showName !== "string")
    throw { code: 400, message: "Show name must be of string type!" };
  if (showName.trim().length === 0)
    throw { code: 400, message: "Show name must be provided!" };
}

function validationById(id) {
  if (typeof id !== "number") {
    throw { code: 400, message: "Invalid ID type provided!" };
  }
}

module.exports = {
  searchShows,
  searchShowByID,
};
