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

router.post('/login', function(req, res, next) {
  let users = fs.readFileSync('./database/users.json');
  let usersArray = JSON.parse(users);
  
  usersArray.forEach(user => {
    console.log(user);
    console.log(user.username, req.body.username);
    if (user.username == req.body.username && user.password == req.body.password){
      res.locals.userLoggedIn = user.ID;
      
    }
  })
    next();
  }, function(req, res){
      res.render('login', { title: 'Login', users: res.locals.userLoggedIn, message: "" });
    }    
   
);

router.get('/login/:id', function(req, res, next) {
  let user = fs.readFileSync('./database/users.json');
  let userArray = JSON.parse(user);
  let users;
  console.log(req.params.id);
  userArray.map(user => {
    if (user.ID == req.params.id) {
      users = user.ID;
    }
  })
  res.render('login', { title: 'Login', users: users, message: "",  });
});

router.get('/register', function(req, res, next) {
  let user = fs.readFileSync('./database/users.json');
  let userArray = JSON.parse(user);

  res.render('register', { title: 'Register', useris: userArray });
});



module.exports = router;
