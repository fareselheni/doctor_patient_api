require('datejs')
var nodemailer = require("nodemailer");
const schedule = require('node-schedule');
const SchedulerController = require('./scheduler.controller');
const ModelController = require('./model.controller');
const db = require("../models");
const Scheduler = db.scheduler;
const User = db.user;

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "servicedpnm@gmail.com",
      pass: "azerty@12345"
  }
});
var rand,mailOptions,host,link;
// rand=Math.floor((Math.random() * 100) + 54);


exports.sendDailyEmails =async () => {
 
        const job = schedule.scheduleJob("49 3 * * *",async function(){

          const events = await SchedulerController.getAllSchedulerWithReturn()
          for(let i=0; i< events.length; i++){
            let doctor = await ModelController.getUserByIdWithReturn(events[i]['doctor_id'])
            let patient = await ModelController.getUserByIdWithReturn(events[i]['user_id'])
            start_date= events[i]['start_date']
            if(Date.parse(start_date).isToday()){
              mailOptions={
                to : doctor['email']+','+patient['email'],
                subject : "Your Meeting Link",
                html : "Hello,<br> Please Click on the link to verify your appointment.<br><a href=>Click here to verify</a>"	
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
            
        }
        });
       
    };


