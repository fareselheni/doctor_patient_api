const db = require("../models");
const Signal = db.signal;
const ModelController = require('./model.controller');

exports.getNbSignalbyUserId =async (req, res) => {
  const user_id =req.params.user_id
  try {
        await Signal.find(
          {
          },
          (err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send(user);
            }).where('user_id').equals(user_id).clone();
  } catch (error) {
      console.log(error)
  }
    
};

exports.getSignalWithReturn =async (user_id,doctor_id)  => {
    try {
          const events = await Signal.find(
            {
            },
            (err, events) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              return events.length
              }).where('user_id').equals(user_id)
              .where('doctor_id').equals(doctor_id).clone();
          return events   
    } catch (error) {
        console.log(error)
    }
 
  };

exports.addSignal =async (req, res) => {
    let nbSignal = await this.getSignalWithReturn(req.body.user_id,req.body.doctor_id)
    let length = nbSignal.length
    if (length>0) {
        res.send({ message: "You already signaled this patient!" });
    } else {
        let doctor = await ModelController.getUserByIdWithReturn(req.body.doctor_id)
    let patient = await ModelController.getUserByIdWithReturn(req.body.user_id)
    let doctor_name = doctor.firstname + " " + doctor.lastname
    let patient_name = patient.firstname + " " + patient.lastname
    const newSignal = new Signal({
      user_id: req.body.user_id,
      doctor_id: req.body.doctor_id,
      user_name: patient_name,
      doctor_name: doctor_name,
    });
    newSignal.save((err, signal) => {
      if (err) {
        res.status(500).send({ message: err });
        return ;
        
      }
      res.send({ message: "Signal was added successfully!" });
    });
    }
    
    
  };


  exports.CheckExistingSignal =async (req, res) => {
    const user_id =req.query.user_id
    const doctor_id =req.query.doctor_id
    try {
      let nbSignal = await this.getSignalWithReturn(user_id,doctor_id)
      let length = nbSignal.length
      let resp =true
      if(length>0){
        resp = false;
      }
      res.send({Signal: resp})
    } catch (error) {
        console.log(error)
    }
      
  };


