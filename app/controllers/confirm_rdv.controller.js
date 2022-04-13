const db = require("../models");
var nodemailer = require("nodemailer");
const Pre_appointment = db.pre_appointment;
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
var _id,event,user_id;
/*------------------SMTP Over-----------------------------*/

exports.send = (req, res) => {

    rand=Math.floor((Math.random() * 100) + 54);
	host=req.get('host');
    _id= req.query._id
    event= req.query.event
    user_id= req.query.user_id
	// link="http://"+req.get('host')+"/verify?id="+rand;
    link="http://localhost:8080"+"/mesRendezVous?id="+_id;
	mailOptions={
		to : req.query.to,
		subject : "Please confirm your Email account",
		html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        	console.log("Message sent: " + response.message);
		res.end("sent");
    	 }
});
};

exports.verify = (req, res) => {

        console.log("req.query.id" , req.query.id)
        console.log("_id" , _id)
        console.log("user_id" , user_id)
        console.log("event" , event[0].start_date)
        if(req.query.id==_id)
        {
            // console.log("email is verified");
            // res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
            // const PreApp = new Pre_appointment({
            //     text: "testtest",
            //     start_date: event.start_date,
            //     end_date: event.end_date,
            //     user_id: user_id,
            //     doctor_id: event.doctor_id,
            //   });
            //   PreApp.save((err, doctor) => {
            //     if (err) {
            //       res.status(500).send({ message: err });
            //       return ;
                  
            //     }
            //     res.send({ message: "PreApp was added successfully!" });
            //   });
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
};





