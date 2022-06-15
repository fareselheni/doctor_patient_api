const mongoose = require("mongoose");
const userSchema =   new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone_number: String,
  adresse: String,
  password: String,
  gender: String,
  gouvernorat:String,
  specialite:String,
  image:String,
  birthdate:String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
})
userSchema.set("timestamps",true);
const User = mongoose.model("User",userSchema);
module.exports = User;