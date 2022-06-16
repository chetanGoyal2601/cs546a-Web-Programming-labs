const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

//login form
router.get("/", async (req, res) => {
  checkUserLoggedIn(req, res);
  res.render("users/login", { pageTitle: "Login" });
});

//signup form
router.get("/signup", async (req, res) => {
  checkUserLoggedIn(req, res);
  res.render("users/sign-up", { pageTitle: "Sign Up" });
});

//signup attempt
router.post("/signup", async (req, res) => {
  checkUserLoggedIn(req, res);

  try {
    let username = req.body.username;
    let password = req.body.password;
    //console.log(username);

    checkValidUsername(username);
    username = username.trim().toLowerCase();

    checkValidPassword(password);
    password = password.trim();

    const user = await userData.createUser(username, password);
    //console.log(user);
    if (!user.userInserted) {
      throw { code: 400, message: "User could not be created!" };
    }
    res.redirect("/");
  } catch (e) {
    res.status(e.code || 400).render("users/sign-up", {
      pageTitle: "Sign up",
      error: e.message || "Error!",
    });
  }
});

//login attempt
router.post("/login", async (req, res) => {
  checkUserLoggedIn(req, res);

  try {
    let username = req.body.username;
    let password = req.body.password;

    checkValidUsername(username);
    username = username.trim().toLowerCase();

    checkValidPassword(password);
    password = password.trim();

    const user = await userData.checkUser(username, password);

    if (!user.authenticated) {
      throw { code: 400, message: "User could not be authenticated!" };
    }

    req.session.user = { username };

    res.redirect("/private");
  } catch (e) {
    res.status(e.code || 400).render("users/login", {
      pageTitle: "Login",
      error: e.message || "Error!",
    });
  }
});

//private
router.get("/private", async (req, res) => {
  const user = req.session.user;

  res.render("users/private", {
    username: user.username,
    pageTitle: "Private",
  });
});

//logout
router.get("/logout", async (req, res) => {
  const user = req.session.user;

  if (!user) {
    res.redirect("/");
  } else {
    req.session.destroy();

    res.render("users/logged-out", {
      username: user.username,
      pageTitle: "Logged Out",
    });
  }
});

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

function checkUserLoggedIn(req, res) {
  if (req.session.user) {
    res.redirect("/private");
  }
}

module.exports = router;
