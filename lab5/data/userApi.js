const { default: axios } = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"
  );
  return data;
}

async function getPersonById(id) {
  //console.log(id, typeof id);
  if (!id) {
    throw `ID required!`;
  } else if (typeof id === "string") {
    id = id.trim();
    id = Number(id);
    if (!Number.isInteger(id)) {
      throw `${id} should have been a positive whole number or string which can be converted to a whole number`;
    }
  } else if (!Number.isInteger(id)) {
    throw `${id} should have been a positive whole number or string which can be converted to a whole number`;
  }

  let peopleDetails = await getPeople();
  //console.log(peopleDetails);
  //console.log("Hello");
  //   for (i = 0; i < peopleDetails.length; i++) {
  //       if (peopleDetails[i][id] === id.trim)
  //   }
  let result = null;
  peopleDetails.forEach((element) => {
    if (element["id"] === id) {
      ifFound = true;
      //console.log(element);
      result = element;
    }
  });
  if (result !== null) {
    //console.log(result);
    return result;
  } else {
    throw `Person not found! The id ${id} provided does not exist!`;
  }
}

async function getWork() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json"
  );
  return data;
}

async function getWorkById(id) {
  //console.log(id, typeof id);
  if (!id) {
    throw `ID required!`;
  } else if (typeof id === "string") {
    id = id.trim();
    id = Number(id);
    if (!Number.isInteger(id)) {
      throw `${id} should have been a positive whole number or string which can be converted to a whole number`;
    }
  } else if (!Number.isInteger(id)) {
    throw `${id} should have been a positive whole number or string which can be converted to a whole number`;
  }

  let workDetails = await getWork();
  //console.log(peopleDetails);
  //console.log("Hello");
  //   for (i = 0; i < peopleDetails.length; i++) {
  //       if (peopleDetails[i][id] === id.trim)
  //   }
  let result = null;
  workDetails.forEach((element) => {
    if (element["id"] === id) {
      ifFound = true;
      //console.log(element);
      result = element;
    }
  });
  if (result !== null) {
    return result;
  } else {
    throw `Person not found! The id ${id} provided does not exist!`;
  }
}

module.exports = {
  getPeople,
  getWork,
  getPersonById,
  getWorkById,
};
