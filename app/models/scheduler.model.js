const mongoose = require("mongoose");
const Scheduler = mongoose.model(
  "Scheduler",
  new mongoose.Schema({
    id:Number,
    start_date: String,
    end_date: String,
    text: String,
    user_id: String,
    doctor_id: String,
    typeRDV: String
  })
);
module.exports = Scheduler;