(function () {
  let userForm = document.getElementById("userForm");
  let username_provided = document.getElementById("username");
  let password_provided = document.getElementById("password");
  let errorUsername = document.getElementById("errorUsername");
  let errorPassword = document.getElementById("errorPassword");
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    userValid = checkValidUsername(username_provided.value);
    passwordValid = checkValidPassword(password_provided.value);
    if (userValid === false && passwordValid === false) {
      userForm.reset();
      username_provided.focus();
      errorUsername.hidden = false;
      errorPassword.hidden = false;
    } else if (!userValid) {
      userForm.reset();
      username_provided.focus();
      errorUsername.hidden = false;
    } else if (!passwordValid) {
      userForm.reset();
      username_provided.focus();
      errorPassword.hidden = false;
    } else {
      errorUsername.hidden = true;
      errorPassword.hidden = true;
      event.currentTarget.submit();
    }
  });

  function checkValidUsername(username) {
    username = username.trim();
    if (!username) return false;
    if (typeof username !== "string") return false;
    if (username.trim().length < 4) return false;
    if (username.trim().match(/^[0-9a-zA-Z]+$/) === null) return false;
    //console.log(username);
    return true;
  }

  function checkValidPassword(password) {
    password = password.trim();
    if (!password) return false;
    if (typeof password !== "string") return false;
    if (password.trim().length < 6) return false;
    if (password.match(/[\s]/) !== null) return false;
    return true;
  }
})();
