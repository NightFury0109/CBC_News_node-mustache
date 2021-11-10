const express = require('express');

const User = require('../models/users');
const Article = require('../models/articles');

var router = express.Router();

// Display the editors page
router.get("/", async function (req, res) {
  try {
    const articles = await Article.getAllArticles();
    const users = await User.findAll();

    req.TPL.articles = articles;
    req.TPL.users = users;
    res.render("editors", req.TPL);
  } catch (error) {
    console.log(error);
  }
});

// Delete user
router.get('/deleteUser', async (req, res) => {
  try {
    await User.deleteUser(req.query.username);
    const articles = await Article.getAllArticles();
    const users = await User.findAll();

    req.TPL.articles = articles;
    req.TPL.users = users;
    res.render("editors", req.TPL);
  } catch (error) {
    console.log(error);
  }
});

// Delete article
router.get('/deleteArticle', async (req, res) => {
  // console.log(req.query.username);
  try {
    await Article.deleteArticle(req.query.title);
    const articles = await Article.getAllArticles();
    const users = await User.findAll();

    req.TPL.articles = articles;
    req.TPL.users = users;
    res.render("editors", req.TPL);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
