const peopleData = require("./userApi.js");

module.exports = {
  people: peopleData.getPeople,
  personById: peopleData.getPersonById,
  work: peopleData.getWork,
  workById: peopleData.getWorkById,
};
