const mongoose = require("mongoose");
const blacklistSchema = new mongoose.Schema({
  user_id: String,
  phone_number: String,  
  user_name: String
})
blacklistSchema.set("timestamps",true);
const Blacklist = mongoose.model("Blacklist",blacklistSchema);
module.exports = Blacklist;