const mongoose = require("mongoose");
const Gouvernorat = mongoose.model(
  "Gouvernorat",
  new mongoose.Schema({
    name: String
  })
);
module.exports = Gouvernorat;
