const mongoose = require("mongoose");
const Specialite = mongoose.model(
  "Specialite",
  new mongoose.Schema({
    name: String
  })
);
module.exports = Specialite;