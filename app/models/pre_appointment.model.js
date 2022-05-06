const mongoose = require("mongoose");
const Pre_appointment = mongoose.model(
  "Pre_appointment",
  new mongoose.Schema({
    text: String,
    start_date: String,
    end_date: String,
    user_id: String,
    doctor_id: String,
    typeRDV: { type: String, default: 'visio' },
    status: { type: String, default: 'en attente' }
  })
);
module.exports = Pre_appointment;