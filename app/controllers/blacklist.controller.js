const db = require("../models");
const ModelController = require('./model.controller');
const Blacklist = db.blacklist;

exports.addToBlackList =async (req, res) => {
  let patient = await ModelController.getUserByIdWithReturn(req.body.user_id)
  let patient_name = patient.firstname + " " + patient.lastname  
  const newBlacklist = new Blacklist({
    user_id: req.body.user_id,
    user_name: patient_name,
    phone_number: req.body.phone_number,
  });
  newBlacklist.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "Successfully added to blacklist!" });
  });
  
};


exports.getBlackList =async (req, res) => {
    try {
          await Blacklist.find(
            {
            },
            (err, blacklist) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
                res.send({ allBlacklist: blacklist });
              }).clone();
              // 
    } catch (error) {
        console.log(error)
    }
      
  };




