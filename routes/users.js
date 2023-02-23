const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/quizApplication");

const userSchema = mongoose.Schema({
  name: String,
  username: String, 
  email:{
    type: String,
    unique: true
  },
  password: String
})

userSchema.plugin(plm);

module.exports = mongoose.model("users", userSchema);