const db = require("../models");
const ModelController = require('./model.controller');
const Pre_appointment = db.pre_appointment;
exports.UsergetAllPreApp =async (req, res) => {
  const _id =req.query._id
  try {
        await Pre_appointment.find(
          {
          },
          (err, events) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send({ allpreApp: events });
            }).where('user_id').equals(_id).clone();
            // 
  } catch (error) {
      console.log(error)
  }
    
};
exports.DoctorgetAllPreApp =async (req, res) => {
  const _id =req.query._id
  try {
        await Pre_appointment.find(
          {
          },
          (err, events) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send({ allpreApp: events });
            }).where('doctor_id').equals(_id).clone();
            // 
  } catch (error) {
      console.log(error)
  }
    
};

exports.addPreApp =async (req, res) => {
  let doctor = await ModelController.getUserByIdWithReturn(req.body.doctor_id)
  let patient = await ModelController.getUserByIdWithReturn(req.body.user_id)
  let doctor_name = doctor.firstname + " " + doctor.lastname
  let patient_name = patient.firstname + " " + patient.lastname
  const PreApp = new Pre_appointment({
    text: req.body.text,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    user_id: req.body.user_id,
    doctor_id: req.body.doctor_id,
    user_name: patient_name,
    doctor_name: doctor_name,
  });
  PreApp.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "PreApp was added successfully!" });
  });
  
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
exports.deleteEvent = (req, res) => {
  id=req.params.id
  Pre_appointment.findByIdAndDelete({"_id":id}
  , function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})
  
};

exports.CheckExistingPreApp =async (req, res) => {
  const _id =req.query._id
  const user_id =req.query.user_id
  try {
        await Pre_appointment.find(
          {
          },
          (err, events) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send({ allpreApp: events.length });
            }).where('doctor_id').equals(_id)
            .where('user_id').equals(user_id).clone();
            // 
  } catch (error) {
      console.log(error)
  }
    
};

