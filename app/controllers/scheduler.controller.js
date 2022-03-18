const db = require("../models");
const User = db.user;
const Scheduler = db.scheduler;
const Specialite = db.specialite
const Gouvernorat = db.specialite
exports.getAllEvents =async (req, res) => {
  try {
        await Scheduler.find(
          {
          },
          (err, users) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send({ allusers: users });
            }).clone();
  } catch (error) {
      console.log(error)
  }
    
};

exports.addEvent = (req, res) => {
  const event = new Scheduler({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    text: req.body.text,
    user_id: req.body.user_id,
    doctor_id: req.body.doctor_id,
  });
  event.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "event was added successfully!" });
  });
  
};

