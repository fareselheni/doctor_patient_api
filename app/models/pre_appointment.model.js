const mongoose = require("mongoose");
const pre_appointmentSchema = new mongoose.Schema({
  text: String,
  start_date: String,
  end_date: String,
  user_id: String,
  doctor_id: String,
  user_name: String,
  doctor_name: String,
  typeRDV: { type: String, default: 'visio' },
  status: { type: String, default: 'en attente' }
})
pre_appointmentSchema.set("timestamps",true);
const Pre_appointment = mongoose.model("Pre_appointment",pre_appointmentSchema);
module.exports = Pre_appointment;