var express = require('express');
var router = express.Router();
var fs = require('fs');
const querystring = require('querystring');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', (req, res) => {
  
  let users = fs.readFileSync('./database/users.json');
  let usersArray = JSON.parse(users);
  usersArray.forEach(user => {
    if (user.username == req.body.username){
      console.log(`${user.username} already exsists`);
      // res.send(`${user.username} already exsists`);
      
      //res.render('register', { title: "title" });
      res.redirect('/login');

    }
  });
  req.body.ID = usersArray[usersArray.length-1].ID+1;
  usersArray.push(req.body);
  fs.writeFileSync('./database/users.json', JSON.stringify(usersArray));
  res.redirect('/login');
});

router.post('/login', (req, res) => {
  console.log("LOGIN");
  
  let users = fs.readFileSync('./database/users.json');
  let usersArray = JSON.parse(users);
  usersArray.forEach(user => {
    console.log(user);
    console.log(user.username, req.body.username);
    if (user.username == req.body.username && user.password == req.body.password){

      const query = querystring.stringify({
        "valid":"your string here"
    });
   
    res.redirect('/?' + query);
     
    } 
     
    
  });
  res.render('login', { title: 'title', message: "username or password is wrong", users: "" });
  // res.send('username or password is wrong');
  
});

module.exports = router;
