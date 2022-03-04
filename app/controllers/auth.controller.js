const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
//import Doctor from '../models/user.model';
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signupDoctor = (req, res) => {
  const doctor = new User.Doctor({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    adresse: req.body.adresse,
    phone_number: req.body.phone_number,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8),
    specialité:req.body.specialité
  });
  doctor.save((err, doctor) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "Doctor was registered successfully!" });
  });
  
};
exports.signupPatient = (req, res) => {
  const patient = new User.Patient({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    adresse: req.body.adresse,
    phone_number: req.body.phone_number,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  patient.save((err, patient) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "Patient was registered successfully!" });
  });
  
};
exports.signupAdmin = (req, res) => {
  const admin = new User.Admin({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    adresse: req.body.adresse,
    phone_number: req.body.phone_number,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  admin.save((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return ;
      
    }
    res.send({ message: "Admin was registered successfully!" });
  });
  
};


// exports.signin = (req, res) => {
//   User.findOne({
//     email: req.body.email
//   })
//     .populate("roles", "-__v")
//     .exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }
//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );
//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }
//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400 // 24 hours
//       });
//       var authorities = [];
//       for (let i = 0; i < user.roles.length; i++) {
//         authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
//       }
//       res.status(200).send({
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         roles: authorities,
//         accessToken: token
//       });
//     });
// };

exports.signindoctor = (req, res) => {
    User.Doctor.findOne({
      email: req.body.email
    })
      // .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
      });
};

exports.signinpatient = (req, res) => {
  User.Patient.findOne({
    email: req.body.email
  })
    // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};

exports.signinadmin = (req, res) => {
  User.Admin.findOne({
    email: req.body.email
  })
    // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};