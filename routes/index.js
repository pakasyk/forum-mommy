var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/login', function(req, res, next) {
  let user = fs.readFileSync('./database/users.json');
  let userArray = JSON.parse(user);
  res.render('login', { title: 'Login', users: userArray, message: "" });
});

router.get('/register', function(req, res, next) {
  let user = fs.readFileSync('./database/users.json');
  let userArray = JSON.parse(user);
  res.render('register', { title: 'Register', useris: userArray });
});



module.exports = router;
