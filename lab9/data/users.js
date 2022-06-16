const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const saltRounds = 16;
const users = mongoCollections.users;

async function createUser(username, password) {
  try {
    checkValidUsername(username);
  } catch (e) {
    throw e;
  }
  //console.log(username);
  username = username.trim().toLowerCase();
  const userData = await users();

  const user = await userData.findOne({ username: username });

  if (user) {
    throw {
      code: 400,
      message: "Username is already taken. Please use another username.",
    };
  }

  try {
    checkValidPassword(password);
  } catch (e) {
    throw e;
  }
  password = password.trim();

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    username: username,
    password: passwordHash,
  };

  const insertedInfo = await userData.insertOne(newUser);
  if (!insertedInfo.insertedId) {
    throw { code: 500, message: "Unable to add user!" };
  }

  return { userInserted: true };
}

async function checkUser(username, password) {
  try {
    checkValidUsername(username);
  } catch (e) {
    throw e;
  }
  username = username.trim().toLowerCase();
  const userData = await users();

  const user = await userData.findOne({ username: username });

  if (!user) {
    throw {
      code: 400,
      message: "Either the username or password is invalid",
    };
  }

  try {
    checkValidPassword(password);
  } catch (e) {
    throw e;
  }
  password = password;

  const isPassMatched = await bcrypt.compare(password, user.password);
  //console.log(isPassMatched);
  if (!isPassMatched) {
    throw {
      code: 400,
      message: "Either the username or password is invalid",
    };
  }
  return { authenticated: true };
}

function checkValidUsername(username) {
  if (!username) throw { code: 400, message: "Username needs to be provided!" };
  if (typeof username !== "string")
    throw { code: 400, message: "Username must be of string type!" };
  if (username.trim().length < 4)
    throw {
      code: 400,
      message: "Username should be have at least 4 alphanumeric characters",
    };
  if (username.match(/^[0-9a-zA-Z]+$/) === null)
    throw { code: 400, message: "Username should only be alphanumeric" };
}

function checkValidPassword(password) {
  if (!password) throw { code: 400, message: "Password is required!!" };
  if (typeof password !== "string")
    throw { code: 400, message: "Password must be of string type!" };
  if (password.trim().length < 6)
    throw {
      code: 400,
      message: "Passowrd should be at least 6 character long!",
    };
  if (password.match(/[\s]/) !== null)
    throw { code: 400, message: "Passowrd can not contain any space!" };
}

module.exports = {
  createUser,
  checkUser,
};
