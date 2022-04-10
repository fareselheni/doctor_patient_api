const db = require("../models");
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

exports.addPreApp = (req, res) => {
  const PreApp = new Pre_appointment({
    text: req.body.text,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    text: req.body.text,
    user_id: req.body.user_id,
    doctor_id: req.body.doctor_id,
  });
  PreApp.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "PreApp was added successfully!" });
  });
  
};
exports.updateEvent =(req, res) => {
  id=req.params.id
  console.log("id",req.body)
  Scheduler.findByIdAndUpdate({"_id":id}
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

});

  
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
exports.checkCollision =async  (req,res) => {
  table = [];
  const z =await Scheduler.find({}
  , function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.send(result)
        return result
    }

}).select('start_date').clone()
table= z
for (let i=0;i<table.length;i++){
  console.log(table[i].start_date.split(/[T,]+/))
}



};

