const mongoose = require("mongoose");
const schedulerSchema = new mongoose.Schema({
  id:Number,
  start_date: String,
  end_date: String,
  text: String,
  user_id: String,
  doctor_id: String,
  user_name: String,
  doctor_name: String,
  typeRDV: { type: String, default: "presentiel" },
  meet_link: String,
  status: { type: String, default: "confirmé" }
})
schedulerSchema.set("timestamps",true);
const Scheduler = mongoose.model("Scheduler",schedulerSchema);
module.exports = Scheduler;