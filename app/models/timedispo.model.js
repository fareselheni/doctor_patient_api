const mongoose = require("mongoose");
const Timedispo = mongoose.model(
  "Timedispo",
  new mongoose.Schema({
    start_date: String,
    end_date: String,
    doctor_id: String
  })
);
module.exports = Timedispo;