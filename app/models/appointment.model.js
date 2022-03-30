const mongoose = require("mongoose");
const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
    date: String,
    time: String,
    user_id: String,
    doctor_id: String
  })
);
module.exports = Appointment;