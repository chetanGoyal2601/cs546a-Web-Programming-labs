const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;
const workData = data.work;
const personByIdData = data.personById;
const workByIdData = data.workById;

router.route("/people").get(async (req, res) => {
  try {
    const peopleList = await peopleData();
    res.json(peopleList);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.route("/people/:id").get(async (req, res) => {
  try {
    //console.log("Hello1");
    if (!req.params.id) {
      throw `ID required!`;
    } else if (typeof req.params.id === "string") {
      req.params.id = req.params.id.trim();
      req.params.id = Number(req.params.id);
      //console.log(Number.isInteger(req.params.id));
      if (!Number.isInteger(req.params.id)) {
        throw `${req.params.id} should have been a positive whole number or string which can be converted to a whole number`;
      }
    } else if (!Number.isInteger(req.params.id)) {
      throw `${req.params.id} should have been a positive whole number or string which can be converted to a whole number`;
    }
    const person = await personByIdData(req.params.id);
    res.json(person);
  } catch (e) {
    //console.log(e);
    res.status(500).send(e);
  }
});

router.route("/work").get(async (req, res) => {
  try {
    const workList = await workData();
    res.json(workList);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.route("/work/:id").get(async (req, res) => {
  //console.log(req.params.id, typeof req.params.id);
  try {
    //console.log("Hello1");
    if (!req.params.id) {
      throw `ID required!`;
    } else if (typeof req.params.id === "string") {
      req.params.id = req.params.id.trim();
      req.params.id = Number(req.params.id);
      //console.log(Number.isInteger(req.params.id));
      if (!Number.isInteger(req.params.id)) {
        throw `${req.params.id} should have been a positive whole number or string which can be converted to a whole number`;
      }
    } else if (!Number.isInteger(req.params.id)) {
      throw `${req.params.id} should have been a positive whole number or string which can be converted to a whole number`;
    }
    //console.log("Hello", req.params.id, typeof req.params.id);
    const work = await workByIdData(req.params.id);
    res.json(work);
  } catch (e) {
    //console.log(e);
    res.status(500).send(e);
  }
});

// router.route("/work/:id").get(async (req, res) => {
//   try {
//     const workID = await workData();
//     res.json(workID);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

module.exports = router;
