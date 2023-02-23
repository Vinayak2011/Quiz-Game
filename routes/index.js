const express = require('express');
const passport = require('passport');
const router = express.Router();
const localStrategy = require('passport-local');

const userInfo = require("./users");

passport.use(new localStrategy(userInfo.authenticate()));

/* GET home page. */
router.post('/',function(req,res){
 let users = new userInfo({
  name: req.body.name,
  username: req.body.username,
  email: req.body.email,
 })
 userInfo.register(users, req.body.password)
  .then(function(newUser){
    passport.authenticate('local')(req,res,function(){
      res.redirect("/mainpage");
    })
  })
  .catch(function(err){
    res.send(err);
  })
})

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login',function(req,res){
  res.render('login');
})

router.post('/login',passport.authenticate('local',{
  successRedirect: "/mainpage",
  failureRedirect: "/login"
}),function(){});

router.get('/mainpage', function(req,res){
  res.render('quiz');
})

module.exports = router;
 