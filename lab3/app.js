const people = require("./people");
const stock = require("./stocks.js");

async function main() {
  // getPersonById
  try {
    const personID = await people.getPersonById(
      "7989fa5e-8f3f-458d-ad58-23c8d9ef5a10   "
    );
    console.log(personID);
  } catch (e) {
    console.log(e);
  }
  // sameEmail
  try {
    const sameEmailData = await people.sameEmail("harvard.edu");
    console.log(sameEmailData);
  } catch (e) {
    console.log(e);
  }
  //   // manipulateIP
  try {
    const manipulateData = await people.manipulateIp();
    console.log(manipulateData);
  } catch (e) {
    console.log(e);
  }
  //   // samBirthday
  try {
    const bdayData = await people.sameBirthday();
    console.log(bdayData);
  } catch (e) {
    console.log(e);
  }
  //   //listShareholders
  try {
    const bdayData = await stock.listShareholders("Powell Industries, Inc.");
    console.log(bdayData);
  } catch (e) {
    console.log(e);
  }
  //   // totalShares
  try {
    const bdayData = await stock.totalShares();
    console.log(bdayData);
  } catch (e) {
    console.log(e);
  }
  //   // listStocks
  try {
    const bdayData = await stock.listStocks(1, 2);
    console.log(bdayData);
  } catch (e) {
    console.log(e);
  }
  //   // getStockById
  try {
    const bdayData = await stock.getStockById(
      "7989fa5e-5617-43f7-a931-46036f9dbcff"
    );
    console.log(bdayData);
  } catch (e) {
    console.log(e);
  }
}

//call main
main();
