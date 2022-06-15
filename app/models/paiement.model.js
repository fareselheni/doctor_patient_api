const mongoose = require("mongoose");
const paiementSchema = new mongoose.Schema({
  success: Boolean,
  accept_card: Boolean,
  expires_at: String,
  user_id: String,
  doctor_id: String,
  amount: Number,
  status: { type: String, default: "En Attente" },
  link: String,
  payment_id:String
})
paiementSchema.set("timestamps",true);
const Paiement = mongoose.model("Paiement",paiementSchema);
module.exports = Paiement;