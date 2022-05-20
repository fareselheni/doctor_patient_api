const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
    score: {
        type: Number,
        max: 5
      },
    user_id: String,
    doctor_id: String,
    user_name: String,
    doctor_name: String,
})
ratingSchema.set("timestamps",true);
const Rating = mongoose.model("Rating",ratingSchema);
module.exports = Rating;