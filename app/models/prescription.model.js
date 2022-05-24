const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema({
    drugs: String,
    date: String,
    user_id: String,
    doctor_id: String,
    user_name: String,
    doctor_name: String,
})
prescriptionSchema.set("timestamps",true);
const Prescription = mongoose.model("Prescription",prescriptionSchema);
module.exports = Prescription;