const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  imagePath:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  }

});

const Product = mongoose.model('shopping',productSchema);
module.exports = Product;
