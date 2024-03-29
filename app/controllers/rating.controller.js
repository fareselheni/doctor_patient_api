const db = require("../models");
const ModelController = require('./model.controller');
const Rating = db.rating;

exports.addRating =async (req, res) => {
  let doctor = await ModelController.getUserByIdWithReturn(req.body.doctor_id)
  let patient = await ModelController.getUserByIdWithReturn(req.body.user_id)
  let doctor_name = doctor.firstname + " " + doctor.lastname
  let patient_name = patient.firstname + " " + patient.lastname
  const newRating = new Rating({
    score: req.body.score,
    user_id: req.body.user_id,
    doctor_id: req.body.doctor_id,
    user_name: patient_name,
    doctor_name: doctor_name,
  });
  newRating.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "Rating was added successfully!" });
  });
  
};

exports.getDoctorscore =async (req, res) => {
    const doctor_id =req.query.doctor_id
    var doctorScore
    try {
        var length = await Rating.countDocuments({doctor_id:doctor_id}, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var sum = await db.rating.aggregate([
            { $match: { doctor_id: doctor_id } },
            { $group: { _id: null, sum_score: { $sum: "$score" } } }
        ])
        if (length === 0) {
            doctorScore = 0
        } else {
            doctorScore= sum[0]["sum_score"]/length
        }
        
        res.json({score: doctorScore})


    } catch (error) {
        console.log(error)
    }
      
  };

exports.getDoctorAllRating =async (req, res) => {
    const doctor_id =req.query.doctor_id
    try {
          await Rating.find(
            {
            },
            (err, ratings) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
                res.send({ allratings: ratings });
              }).where('doctor_id').equals(doctor_id).clone();
              // 
    } catch (error) {
        console.log(error)
    }
      
  };
// exports.updateEvent =(req, res) => {
//   id=req.params.id
//   console.log("id",req.body)
//   Scheduler.findByIdAndUpdate({"_id":id}
//   ,{"text": req.body.text,
//   "start_date": req.body.start_date,
//   "end_date": req.body.end_date
//   }
//   , function(err, result){

//     if(err){
//         res.send(err)
//     }
//     else{
//         res.send(result)
//     }

// });

  
// };



