const express = require('express');

const User = require('../models/users');
const isEmpty = require('../utils/is-empty');

var router = express.Router();

// Display the register page
router.get("/", async function (req, res) {
  req.TPL.register_error = req.session.register_error;
  req.session.register_error = "";
  req.TPL.register_success = req.session.register_success;
  req.session.register_success = false;

  // render the login page
  res.render("register", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptRegister", async function (req, res) {
  const { username, password, password2 } = req.body;

  if (username.trim().length < 2 || password.trim().length < 2 || password2.trim().length < 2) {
    req.session.register_error = "Username/password cannot be blank!";
    return res.redirect('/register');
  } else if (password !== password2) {
    req.session.register_error = "Password must match!";
    return res.redirect('/register');
  }

  try {
    const user = await User.findUser(username);

    if (!isEmpty(user)) {
      req.session.register_error = "User already exists";
      res.redirect('/register');
    } else {
      const result = await User.createUser(username, password);
      req.session.register_success = true;
      res.redirect('/register');
    }
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;
