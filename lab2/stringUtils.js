function camelCase(string) {
  if (string === undefined) {
    throw "No parameter provided";
  } else if (typeof string !== "string") {
    throw `Parameter ${string} should be a string. Incorrect type provided.`;
  } else if (string.trim().length === 0) {
    throw `Empty string ${string} provided`;
  }

  let camelCasedString = "";
  let capitalize = false;
  string = string.trim();
  for (let i of string) {
    if (i === " ") {
      capitalize = true;
    } else if (capitalize === true) {
      camelCasedString += i.toUpperCase();
      capitalize = false;
    } else {
      camelCasedString += i.toLowerCase();
    }
  }

  return camelCasedString;
}

//console.log(camelCase(123));

function mashUp(string1, string2) {
  if (string1 === undefined) {
    throw "First parameter not provided!";
  } else if (typeof string1 !== "string") {
    throw `Incorrect type of string provided. ${string1} is not a string!`;
  } else if (string1.trim().length <= 1) {
    throw `${string1} is not of length greater than 1.`;
  }
  if (string2 === undefined) {
    throw "Second parameter not provided";
  } else if (typeof string2 !== "string") {
    throw `Incorrect type of argument provided. ${string2} is not a string!`;
  } else if (string2.trim().length <= 1) {
    throw `${string2} is not of length greater than 1.`;
  }

  string1 = string1.trim();
  string2 = string2.trim();
  return (
    string2[0] +
    string1.slice(1, string1.length) +
    " " +
    string1[0] +
    string2.slice(1, string2.length)
  );
}

//console.log(mashUp("he", "e"));

function replaceChar(string) {
  if (string === undefined) {
    throw "No parameter provided!";
  } else if (typeof string !== "string") {
    throw `Incorrect type of argument provided. ${string} is not a string!`;
  } else if (string.trim().length === 0) {
    throw "Empty string provided!";
  }
  string = string.trim();
  let s = string[0].toLowerCase();
  //console.log(string);
  let count = 0;
  let dollar = true;
  for (let i = 1; i < string.length; i++) {
    if (s === string[i].toLowerCase()) {
      if (dollar === true) {
        string = string.slice(0, i) + "*" + string.slice(i + 1, string.length);
        dollar = false;
      } else {
        string = string.slice(0, i) + "$" + string.slice(i + 1, string.length);
        dollar = true;
      }
    }
  }

  return string;
}
//console.log(replaceChar("Mommy"));

module.exports = {
  description: "This is utilities on string",
  camelCase,
  replaceChar,
  mashUp,
};
