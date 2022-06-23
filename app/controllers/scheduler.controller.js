require('datejs')
const db = require("../models");
const schedule = require('node-schedule');
var nodemailer = require("nodemailer");
const Scheduler = db.scheduler;
const ModelController = require('./model.controller');
const create_room = require("./create_room.controller");



/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "servicedpnm@gmail.com",
      pass: "obqjggxxtuflmppr"
  }
});
var rand,mailOptions,host,link;
// rand=Math.floor((Math.random() * 100) + 54);


exports.getAllEvents =async (req, res) => {
  const _id =req.query._id
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
            }).where('doctor_id').equals(_id).clone();
  } catch (error) {
      console.log(error)
  }
    
};
exports.getEventByLink =async (req, res) => {
  const link =req.query.link
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
            }).where('meet_link').equals(link).clone();
  } catch (error) {
      console.log(error)
  }
    
};
exports.patientAllConfirmedEvents =async (req, res) => {
  const _id =req.query._id
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
            }).where('user_id').equals(_id).clone();
  } catch (error) {
      console.log(error)
  }
    
};
exports.patientAllClosedEvents =async (req, res) => {
  const _id =req.query._id
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
            }).where('status').equals('cloturé')
            .where('user_id').equals(_id).clone();
  } catch (error) {
      console.log(error)
  }
    
};
exports.getAllSchedulerWithReturn =async (req, res) => {
  try {
        const events = await Scheduler.find(
          {
          },
          (err, events) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            return events
            }).clone();
        return events    
  } catch (error) {
      console.log(error)
  }

    
};

exports.getOnlyConfirmedSchedulerWithReturn =async (req, res) => {
  try {
        const events = await Scheduler.find(
          {
          },
          (err, events) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            return events
            }).where('status').equals('confirmé').clone();
        return events    
  } catch (error) {
      console.log(error)
  }

    
};



exports.addEvent = async (req, res) => {
  let doctor = await ModelController.getUserByIdWithReturn(req.body.doctor_id)
  let patient = await ModelController.getUserByIdWithReturn(req.body.user_id)
  let doctor_name = doctor.firstname + " " + doctor.lastname
  let patient_name = patient.firstname + " " + patient.lastname
  const room_link =await create_room.createRoom()
    console.log(room_link.url)
  const event = new Scheduler({
    id: req.body.id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    text: req.body.text,
    user_id: req.body.user_id,
    doctor_id: req.body.doctor_id,
    typeRDV: req.body.typeRDV,
    user_name: patient_name,
    doctor_name: doctor_name,
    meet_link: room_link.url
  });
  event.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "event was added successfully!" });
  });
  if(req.body.typeRDV=='visio'){
    
    mailOptions={
      to : doctor['email']+','+patient['email'],
      subject : "Lien de la réunion Dr."+doctor_name+" avec "+patient_name+"",
      html : "Bonjour,<br> veuillez utiliser ce lien pour accéder a votre réunion.<br>"+room_link.url+""	
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
      res.end("error");
     }else{
            // console.log("Message sent: " + response.message);
      res.end("sent");
         }
    })
    
  }
  
};
exports.updateEvent =(req, res) => {
  id=req.body._id
  // console.log("id",req.body)
  Scheduler.findByIdAndUpdate({"_id":id}
  ,{"text": req.body.text,
  "start_date": req.body.start_date,
  "end_date": req.body.end_date,
  "status": req.body.status
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

exports.cancelAppointments =async () => {
  try {
  const job = schedule.scheduleJob("*/30 * * * *",async function(){

    let allConfirmed = await Scheduler.find({},
      (err, events) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        return events
        }).where('status').equals('confirmé').clone();;
    // console.log(allConfirmed)
    for (let i=0; i< allConfirmed.length; i++)
    {
      // console.log("iiiii=", i)
      let Stringifyy = JSON.stringify(allConfirmed[i])
      let parsed = JSON.parse(Stringifyy)
      let DateMax = Date.parse(parsed['start_date']).addHours(1);
      let Datenow = new Date();
      let comparaison = Date.compare(DateMax,Datenow)
      // console.log("comparaison", comparaison)
      if(comparaison == -1){
        console.log("App to cancel detected")
        Scheduler.findByIdAndUpdate({"_id":parsed["_id"]}
        ,{"status": "annulé"}, function(err, result){
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
            }
        });
      }
   }
  });
  } catch (error) {
    console.log(error) 
  }
  
};

