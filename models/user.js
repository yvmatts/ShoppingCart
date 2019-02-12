const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const userSchema = new Schema({

  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }

});

// userSchema.methods.encryptPassword = function(password){
//   return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
// };
//
userSchema.methods.verifyPassword = function(password){
  return password === this.password;
};

const User = mongoose.model('user',userSchema);

module.exports = User;
