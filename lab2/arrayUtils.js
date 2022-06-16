function mean(array) {
  if (array === undefined) {
    throw "No argument provided!";
  } else if (Array.isArray(array) == false) {
    throw `Array not provided. ${array} is  not an array. Provide arrays only!`;
  } else if (array.length === 0) {
    throw "Empty array provided!";
  } else if (array.some(isNaN)) {
    throw `Non numerical values contained in the array ${array}!`;
  }

  let sum_value = 0;
  array.forEach((element) => {
    sum_value += element;
  });

  return sum_value / array.length;
}
//console.log(mean([1, "Hello"]));

function medianSquared(array) {
  if (array === undefined) {
    throw "No array exists!";
  } else if (Array.isArray(array) == false) {
    throw `Array not provided. ${array} is  not an array. Provide arrays only!`;
  } else if (array.length === 0) {
    throw "Empty array provided!";
  } else if (array.some(isNaN)) {
    throw `Non numerical values contained in the array ${array}!`;
  }

  let median;
  sorted_arr = [...array].sort(function (a, b) {
    return a - b;
  });
  //console.log(sorted_arr);
  if (sorted_arr.length % 2 === 0) {
    median =
      (sorted_arr[sorted_arr.length / 2] +
        sorted_arr[sorted_arr.length / 2 - 1]) /
      2;
  } else {
    median = sorted_arr[Math.floor(sorted_arr.length / 2)];
  }

  return median * median;
}
//console.log(medianSquared([4, 1, 3, 2]));

function maxElement(array) {
  if (array === undefined) {
    throw "No array exists!";
  } else if (Array.isArray(array) == false) {
    throw `Array not provided. ${array} is  not an array. Provide arrays only!`;
  } else if (array.length === 0) {
    throw "Empty array provided!";
  } else if (array.some(isNaN)) {
    throw `Non numerical values contained in the array ${array}!`;
  }

  let max_element = array[0];
  let max_el_index = 0;
  for (let i = 0; i <= array.length; i++) {
    if (array[i] > max_element) {
      max_element = array[i];
      max_el_index = i;
    }
  }

  obj_max = {};
  obj_max[max_element] = max_el_index;
  return obj_max;
}
//console.log(maxElement([5, 6, 7, 8, 8]));

function fill(end, value) {
  if (end === undefined) {
    throw "No end argument provided!";
  } else if (typeof end !== "number") {
    throw `Non numerical value of 'end' - ${end} provided!`;
  } else if (end <= 0) {
    throw `Value less than 0 provided for 'end' ${end}!`;
  }

  let arr = [];
  if (value === undefined) {
    for (let i = 0; i < end; i++) {
      arr.push(i);
    }
  } else {
    for (let i = 0; i < end; i++) {
      arr.push(value);
    }
  }

  return arr;
}
//console.log(fill(-4));

function countRepeating(array) {
  if (array === undefined) {
    throw "No array provided!";
  } else if (Array.isArray(array) == false) {
    throw `Array not provided. ${array} is  not an array. Provide arrays only!`;
  }

  let obj = {};
  array.forEach((element) => {
    if (element in obj) {
      obj[element] += 1;
    } else {
      obj[element] = 1;
    }
  });
  //console.log(obj);
  let repeat_obj = {};
  for (const key in obj) {
    if (obj[key] > 1) {
      repeat_obj[key] = obj[key];
    }
  }

  return repeat_obj;
}

function isEqual(arrayOne, arrayTwo) {
  if (arrayOne === undefined || arrayTwo === undefined) {
    throw "No argument provided. Provide both the arguments as arrays!";
  } else if (Array.isArray(arrayOne) == false) {
    throw `Array not provided. ${arrayOne} is  not an array. Provide arrays only!`;
  } else if (Array.isArray(arrayTwo) === false) {
    throw `Array not provided. ${arrayTwo} is  not an array. Provide arrays only!`;
  } else if (arrayOne.length != arrayTwo.length) {
    throw `Length of arrays ${arrayOne} and ${arrayTwo} do not match!`;
  }

  //checking nested
  if (Array.isArray(arrayOne[0])) {
    for (let i = 0; i < arrayOne.length; i++) {
      if (!isEqual(arrayOne[i], arrayTwo[i])) {
        return false;
      }
    }
  } else {
    arrayOne.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    arrayTwo.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
  }

  return true;
}

module.exports = {
  description: "This is utilities on arrays",
  mean,
  medianSquared,
  maxElement,
  fill,
  countRepeating,
  isEqual,
};
