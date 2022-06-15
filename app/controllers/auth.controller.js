const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Specialite = db.specialite
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  console.log(req.body)
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    adresse: req.body.adresse,
    phone_number: req.body.phone_number,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8),
    gouvernorat:req.body.gouvernorat,
    specialite:req.body.specialite,
    image:req.body.image,
    birthdate:req.body.birthdate
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    
    // if (req.body.specialites) {
    //   Specialite.find(
    //     {
    //       name: { $in: req.body.specialites }
    //     },
    //     (err, sp) => {
    //       if (err) {
    //         res.status(500).send({ messagefind: err });
    //         return;
    //       }
          
    //       user.specialites = sp.map(spec => spec._id);
    //       console.log('sp',user)
    //     }
    //   );
    // }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          console.log('rp',user)
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    }

  });
};
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
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
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image: user.image,
        roles: authorities,
        accessToken: token
      });
    });
};