const db = require("../models");
const ModelController = require('./model.controller');
const Prescription = db.prescription;

exports.addPrescription =async (req, res) => {
  let doctor = await ModelController.getUserByIdWithReturn(req.body.doctor_id)
  let patient = await ModelController.getUserByIdWithReturn(req.body.user_id)
  let doctor_name = doctor.firstname + " " + doctor.lastname
  let patient_name = patient.firstname + " " + patient.lastname
  const newPrescription = new Prescription({
    drugs: req.body.drugs,
    date: req.body.date,
    user_id: req.body.user_id,
    doctor_id: req.body.doctor_id,
    user_name: patient_name,
    doctor_name: doctor_name,
  });
  newPrescription.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "Prescription was added successfully!" });
  });
  
};

exports.patientGetAllPerscriptions =async (req, res) => {
    const _id =req.query._id
    try {
          await Prescription.find(
            {
            },
            (err, events) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
                res.send({ allevents: events });
              }).where('user_id').equals(_id).clone();
    } catch (error) {
        console.log(error)
    }
      
  };
 
  exports.doctorGetAllPerscriptions =async (req, res) => {
    const _id =req.query._id
    try {
          await Prescription.find(
            {
            },
            (err, events) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
                res.send({ allevents: events });
              }).where('doctor_id').equals(_id).clone();
    } catch (error) {
        console.log(error)
    }
      
  };  

  exports.deleteEvent = (req, res) => {
    id=req.params.id
    Prescription.findByIdAndDelete({"_id":id}
    , function(err, result){
  
      if(err){
          res.send(err)
      }
      else{
          res.send(result)
      }
  
  })
    
  };  
