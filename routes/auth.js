var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var bodyParser = require('body-parser');
/* GET home page. */
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const csrfProtection = csrf();
router.use(csrfProtection);

function encryptPassword(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};


router.get('/',csrfProtection,function(req,res,next){

    res.render('../views/user/signin',{ csrfToken: req.csrfToken() });

});

router.post('/', passport.authenticate('local', { failureRedirect: '/signup' }),
  function(req, res) {
    res.redirect('/home/movies');
  });



router.get('/signup',csrfProtection,function(req,res,next){

    res.render('../views/user/signup',{ csrfToken: req.csrfToken() });

});

router.post('/signup',csrfProtection,function(req,res,next){

    User.findOne({username:req.username,email:req.email}).then(function(result){
        if(!result){
          var user = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
          });
          user.save().then(function(){
            console.log(encryptPassword(req.body.password));
            res.redirect('/signup');
          });
        }
        else{
          console.log(encryptPassword(req.body.password));
          res.redirect('/signup');
        }
    });

});

//$2a$05$TEzUWxANGa2C/qHSX/q73.pnFC8jt9BYzFVRxXr32sVTIau9CVGYK
module.exports = router;
