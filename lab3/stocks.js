const peopleData = require("./people.js");
const { default: axios } = require("axios");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  //   console.log(data);
  return data;
}

function parameterCheck(param) {
  if (param === undefined) {
    throw `Incorrect/No parameter provided`;
  } else if (typeof param !== "string") {
    throw `${param} is not a string`;
  } else if (param.trim().length === 0) {
    throw `Empty string not permitted for parameter!`;
  }
}

async function listShareholders(stockName) {
  parameterCheck(stockName);
  stockName.trim();
  let stockData = await getStocks();
  let result = null;
  //console.log(stockName);
  for (let j = 0; j < stockData.length; j++) {
    //console.log(stockName);
    if (stockData[j]["stock_name"] === stockName) {
      //console.log(stockName);
      result = stockData[j];
      for (let i = 0; i < result["shareholders"].length; i++) {
        let person = await peopleData.getPersonById(
          result["shareholders"][i]["userId"]
        );
        // console.log(person);
        if (person) {
          result["shareholders"][i]["first_name"] = person["first_name"];
          result["shareholders"][i]["last_name"] = person["last_name"];
        }
        delete result["shareholders"][i]["userId"];
      }

      //   result["shareholders"].forEach(async (el) => {
      //     let person = await people.getPersonById(el["userId"]);
      //     console.log(person);
      //     if (person) {
      //       el["first_name"] = person["first_name"];
      //       el["last_name"] = person["last_name"];
      //     }
      //     delete el["userId"];
      //   });
    }
  }
  //   stockData.forEach(async (element) => {
  //     if (element["stock_name"] === stockName.trim()) {
  //       result = element;
  //       for (i = 0; i < result["shareholders"].length; i++) {
  //         let person = await people.getPersonById(
  //           result["shareholders"][i]["userId"]
  //         );
  //         console.log(person);
  //         if (person) {
  //           result["shareholders"][i]["first_name"] = person["first_name"];
  //           result["shareholders"][i]["last_name"] = person["last_name"];
  //         }
  //         delete result["shareholders"][i]["userId"];
  //       }

  //       //   result["shareholders"].forEach(async (el) => {
  //       //     let person = await people.getPersonById(el["userId"]);
  //       //     console.log(person);
  //       //     if (person) {
  //       //       el["first_name"] = person["first_name"];
  //       //       el["last_name"] = person["last_name"];
  //       //     }
  //       //     delete el["userId"];
  //       //   });
  //     }
  //   });
  //console.log(result);
  //console.log(stockName);
  if (result !== null) {
    //console.log(result);
    return result;
  } else {
    throw `No stock with given name ${stockName} found!`;
  }
}

//listShareholders("Aeglea BioTherapeutics, Inc.");

async function totalShares(stockName) {
  parameterCheck(stockName);
  stockName = stockName.trim();
  let stockData = await getStocks();
  let holders = 0;
  let shareTotal = 0;
  let stockFound = false;
  stockData.forEach((element) => {
    if (element["stock_name"] === stockName.trim()) {
      stockFound = true;
      holders = element["shareholders"].length;
      element["shareholders"].forEach((el) => {
        shareTotal += parseInt(el["number_of_shares"]);
      });
    }
  });
  if (stockFound) {
    if (holders === 0) {
      return `${stockName} currently has no shareholders.`;
    } else if (holders === 1 && shareTotal === 1) {
      return `${stockName}, has ${holders} shareholder that owns a total of ${shareTotal} share.`;
    } else if (holders === 1) {
      return `${stockName}, has ${holders} shareholder that owns a total of ${shareTotal} shares.`;
    } else {
      return `${stockName}, has ${holders} shareholders that own a total of ${shareTotal} shares.`;
    }
  } else {
    throw `No stock with given name ${stockName} found!`;
  }
}

async function listStocks(firstName, lastName) {
  parameterCheck(firstName);
  parameterCheck(lastName);
  firstName = firstName.trim();
  lastName = lastName.trim();

  let personData = await peopleData.getPeople();
  let personId = null;
  personData.forEach((element) => {
    if (
      element["first_name"].trim() === firstName &&
      element["last_name"] === lastName
    ) {
      personId = element["id"];
    }
  });
  if (personId == null) {
    throw `${firstName} ${lastName} does not exist as a stcokowner in people data!`;
  }

  let stockData = await getStocks();
  let ownedStocks = [];
  stockData.forEach((element) => {
    element["shareholders"].forEach((el) => {
      if (el["userId"] === personId) {
        ownedStocks.push({
          stock_name: element["stock_name"],
          number_of_shares: parseInt(el["number_of_shares"]),
        });
      }
    });
  });
  if (Object.keys(ownedStocks).length === 0) {
    throw `${firstName} ${lastName} does not own any stocks!`;
  } else {
    return ownedStocks;
  }
}

async function getStockById(id) {
  parameterCheck(id);
  id = id.trim();
  let stockData = await getStocks();
  // let stockFound = false;
  let result = null;
  stockData.forEach((element) => {
    if (element["id"].trim() === id) {
      // stockFound = true;
      result = element;
    }
  });
  if (result !== null) {
    return result;
  } else {
    throw `stock not found`;
  }
}

module.exports = {
  description: "These are functions on stocks!",
  listShareholders,
  totalShares,
  listStocks,
  getStockById,
};
