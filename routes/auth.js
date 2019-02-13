var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var csrfProtection = csrf();
const { check, validationResult } = require('express-validator/check');



router.use(csrfProtection);



/* GET Login page. */
router.get('/',csrfProtection,function(req,res,next){

    res.render('../views/user/signin',{ csrfToken: req.csrfToken() });

});

/* POST Login form data. */
router.post('/', passport.authenticate("local", { failureRedirect: '/signup' }),
  function(req, res) {
    res.redirect('/home/movies');
  });


/* GET Sign up page. */
router.get('/signup',csrfProtection,function(req,res,next){

    res.render('../views/user/signup',{ csrfToken: req.csrfToken() });

});

/* POST Sign up form data. */
router.post('/signup',csrfProtection,function(req,res,next){

    User.findOne({username:req.body.username,email:req.body.email}).then(function(result){
        if(result === null){
          console.log(result);
          var user = new User();
            user.username = req.body.username,
            user.email = req.body.email,
            user.password = user.encryptPassword(req.body.password);

          user.save().then(function(err){
            console.log("Saved NewUser");
              res.redirect('/');
           });
        }
        else{
          console.log(result + "Here");
          res.redirect('/');
        }
    });

});


/* GET Login page. */
router.get('/signout',csrfProtection,function(req,res,next){

    req.logout();
    res.redirect('/');

});


module.exports = router;
