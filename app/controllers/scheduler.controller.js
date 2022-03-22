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
          (err, events) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send({ allevents: events });
            }).clone();
  } catch (error) {
      console.log(error)
  }
    
};

exports.addEvent = (req, res) => {
  const event = new Scheduler({
    id: req.body.id,
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
exports.updateEvent =(req, res) => {
  Scheduler.find({"_id":req.body._id}
  ,{"text": req.body.text,
  "start_date": req.body.start_date,
  "end_date": req.body.end_date
  }
  , function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

}).clone();

  
};
exports.deleteEvent = (req, res) => {
  id=req.params.id
  console.log("id",id)
  Scheduler.findByIdAndDelete({"_id":id}
  , function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})
  
};

