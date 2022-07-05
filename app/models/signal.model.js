const mongoose = require("mongoose");
const signalSchema = new mongoose.Schema({
    user_id: String,
    doctor_id: String,
    user_name: String,
    doctor_name: String,
})
signalSchema.set("timestamps",true);
const Signal = mongoose.model("Signal",signalSchema);
module.exports = Signal;