const mongoose = require("mongoose");
const timedispoSchema = new mongoose.Schema({
  start_date: String,
  end_date: String,
  doctor_id: String
})
timedispoSchema.set("timestamps",true);
const Timedispo = mongoose.model("Timedispo",timedispoSchema );
// Timedispo.set("timestamps",true)
module.exports = Timedispo;