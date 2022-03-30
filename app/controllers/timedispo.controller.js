const db = require("../models");
const Timedispo = db.timedispo;
exports.getAllTimedispo =async (req, res) => {
  const _id =req.query._id
  try {
        await Timedispo.find(
          {
          },
          (err, times) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send({ alltimes: times });
            }).where('doctor_id').equals(_id).clone();
  } catch (error) {
      console.log(error)
  }
    
};

exports.addTimedispo = (req, res) => {
  const time = new Timedispo({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    doctor_id: req.body.doctor_id,
  });
  time.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "event was added successfully!" });
  });
  
};
exports.updateEvent =(req, res) => {
  id=req.params.id
  console.log("id",req.body)
  Timedispo.findByIdAndUpdate({"_id":id}
  ,{
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
  Timedispo.findByIdAndDelete({"_id":id}
  , function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})
  
};

