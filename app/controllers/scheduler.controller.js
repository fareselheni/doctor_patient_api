const db = require("../models");
const User = db.user;
const Scheduler = db.scheduler;
const Specialite = db.specialite
const Gouvernorat = db.specialite
exports.getAllUsers =async (req, res) => {
  try {
        await User.find(
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
exports.getAllGouvernorats =async (req, res) => {
  // const users =await User.find()
  // return users

  await Gouvernorat.find(
      {
      },
      (err, gouvernorats) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
          res.send({ allgouvernroats:  gouvernorats });
        });
};
exports.getAllspecialites =async (req, res) => {
  // const users =await User.find()
  // return users

  await Specialite.find(
      {
      },
      (err, specialites) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
          res.send({ allspecialites:  specialites });
        });
};
