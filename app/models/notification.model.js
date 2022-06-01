const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  title: String,
  body: String,
  user_id: String,
  seen: { type: Boolean, default: false }
})
notificationSchema.set("timestamps",true);
const Notification = mongoose.model("Notification",notificationSchema);
module.exports = Notification;