const db = require("../models");
const User = db.user;
const Role = db.role;
const Specialite = db.specialite
const Gouvernorat = db.gouvernorat
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
exports.getUserbyId =async (req, res) => {
  const _id =req.params.id
  try {
        await User.find(
          {
          },
          (err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send(user);
            }).where('_id').equals(_id).clone();
  } catch (error) {
      console.log(error)
  }
    
};
exports.getUserByIdWithReturn =async (id) =>{
  try {
      const user = await User.findById(id).exec();
      return user
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
          res.send({ allgouvernorats:  gouvernorats });
        }).clone();
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
        }).clone();
};

