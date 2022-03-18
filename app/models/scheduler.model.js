const mongoose = require("mongoose");
const Scheduler = mongoose.model(
  "Scheduler",
  new mongoose.Schema({
    start_date: String,
    end_date: String,
    text: String,
    user_id: String,
    doctor_id: String
  })
);
module.exports = Scheduler;