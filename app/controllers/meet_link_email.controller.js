require('datejs')
var nodemailer = require("nodemailer");
const schedule = require('node-schedule');
const SchedulerController = require('./scheduler.controller');
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
      pass: "azerty@12345"
  }
});
var rand,mailOptions,host,link;
// rand=Math.floor((Math.random() * 100) + 54);


exports.sendDailyEmails =async () => {
        
        const job = schedule.scheduleJob("32 11 * * *",async function(){

          const events = await SchedulerController.getAllSchedulerWithReturn()
          for(let i=0; i< events.length; i++){
            let doctor = await ModelController.getUserByIdWithReturn(events[i]['doctor_id'])
            let patient = await ModelController.getUserByIdWithReturn(events[i]['user_id'])
            start_date= events[i]['start_date']
            // console.log("events[i]['typeRDV']",events[i]['typeRDV'])
            if((Date.parse(start_date).isToday())&&(events[i]['typeRDV']=='visio')){
              const room_link =await create_room.createRoom()
              console.log(room_link.url)
              mailOptions={
                to : doctor['email']+','+patient['email'],
                subject : "Lien de votre réunion",
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
            
        }
        });
       
    };


