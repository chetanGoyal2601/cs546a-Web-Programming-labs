function makeArrays(array) {
  if (array === undefined) {
    throw "No array provided in the argument!";
  } else if (Array.isArray(array) == false) {
    throw `Parameter ${array} should be a array. Incorrect type provided.`;
  } else if (array.length < 2) {
    throw `Length of ${array} is less than 2.`;
  }

  arr_result = [];
  array.forEach((element) => {
    //console.log(element)
    if (
      typeof element !== "object" &&
      !Array.isArray(element) &&
      element !== null
    ) {
      throw `Array ${array} contains non object type data - ${element}!`;
    } else if (Object.keys(element).length === 0) {
      throw `Array ${array} contains empty object!`;
    }

    for (let i in element) {
      arr_result.push([i, element[i]]);
    }
  });
  return arr_result;
}

//console.log(makeArrays([{ x: 0, y: 9, q: 10 }, {}]));

function isDeepEqual(obj1, obj2) {
  if (obj1 === undefined) {
    throw `First parameter not provided!`;
  } else if (typeof obj1 !== "object" || Array.isArray(obj1) || obj1 === null) {
    throw `First parameter ${obj1} is not of object type!`;
  }
  if (obj2 === undefined) {
    throw `Second parameter not provided!`;
  } else if (typeof obj2 !== "object" || Array.isArray(obj2) || obj2 === null) {
    throw `Second parameter ${obj2} is not of object type!`;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const i in obj1) {
    if (!(i in obj2)) {
      return false;
    } else if (typeof obj1[i] === "object") {
      if (typeof obj2[i] !== "object" || !isDeepEqual(obj1[i], obj2[i])) {
        return false;
      }
    } else {
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
  }

  return true;
}

function computeObject(object, func) {
  if (typeof object === "undefined" || typeof func === "undefined") {
    throw "Incorrect arguments provided!";
  } else if (
    typeof object !== "object" &&
    !Array.isArray(object) &&
    object !== null
  ) {
    throw `Object type was expected as the first argument! ${object} is not an object.`;
  } else if (typeof func !== "function") {
    throw `Function type was expected as second argument. ${func} is not an object`;
  } else if (Object.keys(object).length === 0) {
    throw "Empty object provided!";
  }

  let obj_result = {};
  for (const i in object) {
    if (typeof object[i] !== "number") {
      throw `Object ${object} contains non numerical value - ${object[i]}`;
    }
    obj_result[i] = func(object[i]);
  }

  return obj_result;
}

module.exports = {
  description: "This is utilities on object",
  makeArrays,
  isDeepEqual,
  computeObject,
};
