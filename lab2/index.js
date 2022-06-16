const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// Test for arrayUtils
// Mean tests
try {
  // Should Pass
  const meanOne = arrayUtils.mean([1, 2, 3]);
  console.log("Mean passed successfuly");
} catch (e) {
  console.error("mean failed test case");
}

try {
  // Should Fail
  const meanTwo = arrayUtils.mean(1234);
  console.error("mean did not error");
} catch (e) {
  console.log("mean failed successfully");
}

// Median tests
try {
  // Should Pass
  const medianOne = arrayUtils.medianSquared([4, 1, 2]);
  console.log("Median passed successfuly");
} catch (e) {
  console.error("Median failed test case");
}

try {
  // Should Fail
  const medianTwo = arrayUtils.medianSquared([]);
  console.error("Median did not error");
} catch (e) {
  console.log("Median failed successfully");
}

// Max Elemenet test
try {
  // Should Pass
  const maxOne = arrayUtils.maxElement([5, 6, 7]);
  console.log("Max passed successfuly");
} catch (e) {
  console.error("Max failed test case");
}

try {
  // Should Fail
  const maxTwo = arrayUtils.maxElement(5, 6, 7);
  console.error("Max did not error");
} catch (e) {
  console.log("Max failed successfully");
}

// Fill tests
try {
  // Should Pass
  const fillOne = arrayUtils.fill(3, "Welcome");
  console.log("Fill passed successfuly");
} catch (e) {
  console.error("Fill failed test case");
}

try {
  // Should Fail
  const fillTwo = arrayUtils.fill("test");
  console.error("Fill did not error");
} catch (e) {
  console.log("Fill failed successfully");
}

// Count repeating tests
try {
  // Should Pass
  const countOne = arrayUtils.countRepeating([
    7,
    "7",
    13,
    true,
    true,
    true,
    "Hello",
    "Hello",
    "hello",
  ]);
  console.log("Count repeating passed successfuly");
} catch (e) {
  console.error("Count repeating failed test case");
}

try {
  // Should Fail
  const countTwo = arrayUtils.countRepeating({ a: 1, b: 2, c: "Patrick" });
  console.error("Count repeating did not error");
} catch (e) {
  console.log("Count repeating failed successfully");
}

//Is Equal tests
try {
  // Should Pass
  const equalOne = arrayUtils.isEqual(
    ["Z", "R", "B", "C", "A"],
    ["R", "B", "C", "A", "Z"]
  );
  console.log("Equal passed successfuly");
} catch (e) {
  console.error("Equal failed test case");
}

try {
  // Should Fail
  const equalTwo = arrayUtils.isEqual("hello");
  console.error("Equal did not error");
} catch (e) {
  console.log("Equal failed successfully");
}

// Test for stringUtils
//Camel case tests
try {
  // Should Pass
  const camelOne = stringUtils.camelCase("my function rocks");
  console.log("Camel Case passed successfuly");
} catch (e) {
  console.error("Camel Case failed test case");
}

try {
  // Should Fail
  const camelTwo = stringUtils.camelCase("");
  console.error("Camel Case did not error");
} catch (e) {
  console.log("Camel Case failed successfully");
}

//Replace char tests
try {
  // Should Pass
  const replaceOne = stringUtils.replaceChar(
    "Hello, How are you? I hope you are well"
  );
  console.log("Replace char passed successfuly");
} catch (e) {
  console.error("Replace char failed test case");
}

try {
  // Should Fail
  const replaceTwo = stringUtils.replaceChar(1234);
  console.error("Replace char did not error");
} catch (e) {
  console.log("Replace char failed successfully");
}

//Mash up tests
try {
  // Should Pass
  const mashUpOne = stringUtils.mashUp("Patrick", "Hill");
  console.log("Mash up passed successfuly");
} catch (e) {
  console.error("Mash up failed test case");
}

try {
  // Should Fail
  const mashUpTwo = stringUtils.mashUp("John");
  console.error("Mash up did not error");
} catch (e) {
  console.log("Mash up failed successfully");
}

// Test for objUtils
//make arrays test
try {
  // Should Pass
  const makeArraysOne = objUtils.makeArrays([
    { x: 2, y: 3 },
    { a: 70, x: 4, z: 5 },
    { x: 0, y: 9, q: 10 },
  ]);
  console.log("Make Arrays passed successfuly");
} catch (e) {
  console.error("Make Arrays failed test case");
}

try {
  // Should Fail
  const makeArraysTwo = objUtils.makeArrays(1234);
  console.error("Make Arrays did not error");
} catch (e) {
  console.log("Make Arrays failed successfully");
}

//is deep equal tests
try {
  // Should Pass
  const deepEqualOne = objUtils.isDeepEqual(
    { a: { sA: "Hello", sB: "There", sC: "Class" }, b: 7, c: true, d: "Test" },
    { c: true, b: 7, d: "Test", a: { sB: "There", sC: "Class", sA: "Hello" } }
  );
  console.log("Is deep equal passed successfuly");
} catch (e) {
  console.error("Is deep equal failed test case");
}

try {
  // Should Fail
  const deepEqualTwo = objUtils.isDeepEqual([1, 2, 3], [1, 2, 3]);
  console.error("Is deep equal did not error");
} catch (e) {
  console.log("Is deep equal failed successfully");
}

//computeObject tests
try {
  // Should Pass
  const computeObjectsOne = objUtils.computeObject(
    { a: 3, b: 7, c: 5 },
    (n) => n * 2
  );
  console.log("Compute Objects passed successfuly");
} catch (e) {
  console.error("Compute Objects failed test case");
}

try {
  // Should Fail
  const computeObjectsTwo = objUtils.computeObject(1234);
  console.error("Compute Objects did not error");
} catch (e) {
  console.log("Compute Objects failed successfully");
}
