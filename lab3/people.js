const { default: axios } = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  //   console.log(data);
  return data;
}

//  1. getPersonById
async function getPersonById(id) {
  if (id === undefined || typeof id !== "string") {
    throw `Incorrect type of input provided. ${
      id || "Id"
    } should have been a valid string!`;
  } else if (id.trim() === 0) {
    throw "Empty string provided!";
  }

  let peopleDetails = await getPeople();
  //console.log(peopleDetails);
  //console.log("Hello");
  //   for (i = 0; i < peopleDetails.length; i++) {
  //       if (peopleDetails[i][id] === id.trim)
  //   }
  let result = null;
  peopleDetails.forEach((element) => {
    if (element["id"] === id.trim()) {
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

//getPersonById("2a9896a4-9f83-4478-bdc4-bc528fde97a4");

//  2. sameEmail
async function sameEmail(emailDomain) {
  // Error check
  if (emailDomain === undefined) {
    throw "No email provided!";
  } else if (typeof emailDomain !== "string") {
    throw `${emailDomain} is not a string!`;
  } else if (emailDomain.trim().length === 0) {
    throw `Empty string provided!`;
  } else if (emailDomain.indexOf(".") === -1) {
    throw `${emailDomain} is not a valid domain as not dot contained!`;
  } else if (emailDomain.trim().split(".").at(-1).length < 2) {
    throw `In the ${emailDomain} the characters after . should be at least 2!`;
  }

  let peopleDetails = await getPeople();
  let result = [];
  emailDomain = emailDomain.trim().toLowerCase();
  //console.log(emailDomain);
  peopleDetails.forEach((element) => {
    //console.log(element);

    if (
      element["email"].trim().toLowerCase().split("@").at(-1) === emailDomain
    ) {
      //console.log(element);
      result.push(element);
    }
  });
  // result.forEach((element) => {
  //   JSON.stringify(element.address.home);
  //   element.address.work = element.address.work.toString();
  // });
  //console.log(result);
  if (result.length >= 2) {
    //console.log(result);
    return result;
  } else {
    throw "No emailDomain matches of more than one found throughout!";
  }
}

//sameEmail("harvard.edu");

//  3. manipulateIp()
async function manipulateIp() {
  let peopleDetails = await getPeople();
  let highest = {};
  let lowest = {};
  let max_ip, min_ip;
  max_ip = min_ip = null;
  let total = 0;
  peopleDetails.forEach((element) => {
    let ip = element["ip_address"];
    ip = ip.split(".").join("");
    ip = ip.split("0").join("");
    ip = ip.split("");
    ip = ip.sort(function (a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });

    ip = ip.join("");
    //console.log(ip);
    ip = parseInt(ip);
    if (max_ip === null || max_ip < ip) {
      max_ip = ip;
      highest["firstName"] = element["first_name"];
      highest["lastName"] = element["last_name"];
    }
    if (min_ip === null || min_ip > ip) {
      min_ip = ip;
      lowest["firstName"] = element["first_name"];
      lowest["lastName"] = element["last_name"];
    }
    total += ip;
  });
  let result = {
    highest: highest,
    lowest: lowest,
    average: Math.floor(total / peopleDetails.length),
  };
  //console.log(result);
  return result;
}

//manipulateIp();

// 4. sameBirthday
async function sameBirthday(month, day) {
  //Error checking
  if (month === undefined) {
    throw `No month provided`;
  } else if (day === undefined) {
    throw `No day provided`;
  }

  day = parseInt(day);
  month = parseInt(month);

  if (!Number.isInteger(month)) {
    throw `Month should be an integer. ${month} is not an integer!`;
  } else if (!Number.isInteger(day)) {
    throw `Month should be an integer. ${day} is not an integer!`;
  } else if (month > 12 || month < 1) {
    throw `Month should be between 1 to 12 only. ${month} is not valid!`;
  } else if (day < 1) {
    throw `Day should be greater than 1. ${day} is not valid!`;
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
    throw `As per the month ${month}, day should be less than or equal to 31. ${day} is not in range!`;
  } else if (
    (month === 4 || month === 6 || month === 9 || month === 11) &&
    day > 30
  ) {
    throw `As per the month ${month}, day should be less than or equal to 31. ${day} is not in range!`;
  } else if (month === 2 && day > 28) {
    throw `In the month of February there are only 28 days!`;
  }

  let peopleDetails = await getPeople();
  let bday_array = [];
  peopleDetails.forEach((element) => {
    //console.log(element);
    let bday = element["date_of_birth"].trim().split("/");
    if (parseInt(bday[0]) === month && parseInt(bday[1]) === day) {
      bday_array.push(element["first_name"] + " " + element["last_name"]);
    }
  });
  //console.log(bday_array);
  if (bday_array.length === 0) {
    throw `No person with birthday on ${month} / ${day} is present!`;
  } else {
    return bday_array;
  }
}
//sameBirthday("09", 25);
module.exports = {
  description: "These are functions on arrays!",
  getPeople,
  getPersonById,
  sameEmail,
  manipulateIp,
  sameBirthday,
};
