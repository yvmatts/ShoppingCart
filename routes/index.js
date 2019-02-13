var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
/* GET home page. */

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/movies', function(req, res, next) {

    Product.find(function(error,docs) {
     var productChunks = [];
     var chunkSize = 3;
     for (var i = 0; i < docs.length; i += chunkSize) {
         productChunks.push(docs.slice(i, i + chunkSize));
     }
     console.log(req.user);
     res.render('shop/index', { title: 'Shopping Cart', products: productChunks});
   });
});


module.exports = router;
