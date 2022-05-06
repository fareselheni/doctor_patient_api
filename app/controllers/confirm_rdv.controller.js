const db = require("../models");
var nodemailer = require("nodemailer");
const ModelController = require('./model.controller');
const Pre_appointment = db.pre_appointment;
const timedispo = db.timedispo;
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
var _id,event,user_id,typeRDV;
/*------------------SMTP Over-----------------------------*/

exports.send = (req, res) => {

    rand=Math.floor((Math.random() * 100) + 54);
	host=req.get('host');
    _id= req.query._id
    event= req.query.event
    user_id= req.query.user_id
    typeRDV= req.query.typeRDV
	// link="http://"+req.get('host')+"/verify?id="+rand;
    link="http://localhost:8080"+"/mesRendezVous?id="+_id;
	mailOptions={
		to : req.query.to,
		subject : "Please confirm your Email account",
		html : "Hello,<br> Please Click on the link to verify your appointment.<br><a href="+link+">Click here to verify</a>"	
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        	// console.log("Message sent: " + response.message);
		res.end("sent");
    	 }
})
};

exports.verify =async (req, res) => {
        let patient = await ModelController.getUserByIdWithReturn(user_id)
        var eventparsed  = JSON.parse(event)
        console.log("parsed" , eventparsed)
        console.log("typeRDV" , typeRDV)
        const checkDup = await timedispo.findOne({ _id: eventparsed._id });
        if(req.query.id==_id)
        {
            console.log("email is verified");
            // res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
            
            if (checkDup){
                Pre_appointment.create({
                    text: "Rendez-vous avec "+patient.firstname+" " +patient.lastname,
                    start_date: eventparsed.start_date,
                    end_date: eventparsed.end_date,
                    user_id: user_id,
                    doctor_id: eventparsed.doctor_id, 
                    typeRDV: typeRDV,
                    }, function (err, small) {
                    if (err) return handleError(err);
                    // saved!
                  });
                timedispo.deleteOne({ _id: eventparsed._id }, function (err) {
                    if (err) return handleError(err);
                    // deleted at most one tank document
                  });  
            }
            
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
};





