const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
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
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    // specialites: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Specialite"
    //   }
    // ],
    // gouvernorats: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Gouvernorat"
    //   }
    // ]
  })
);
module.exports = User;