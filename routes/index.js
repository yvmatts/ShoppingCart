var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
/* GET home page. */

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) {

    Product.find(function(error,docs) {
     var productChunks = [];
     var chunkSize = 3;
     for (var i = 0; i < docs.length; i += chunkSize) {
         productChunks.push(docs.slice(i, i + chunkSize));
     }
     res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
   });
});

router.get('/user/signup',csrfProtection,function(req,res,next){

    res.render('../views/user/signup',{ csrfToken: req.csrfToken() });

});

router.post('/user/signup',csrfProtection,function(req,res,nect){

    res.redirect('/')

});

module.exports = router;
