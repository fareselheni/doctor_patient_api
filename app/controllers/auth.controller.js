const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Blacklist = db.blacklist;
const Specialite = db.specialite;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// exports.getBlacklistWithReturn =async (id) =>{
//   try {
//       const blacklist = await Blacklist.find().exec();
//       return blacklist
//   } catch (error) {
//       console.log(error)
//   }
// };

exports.checkInBlacklist =async (tel) =>{
  try {
    let check = false
    let blacklist = await Blacklist.find().exec();
    // console.log("ggbb",blacklist)
    for (let index = 0; index < blacklist.length; index++) {
      const element = blacklist[index];
      if (element.phone_number === tel){
        check = true
      }
    }
    return check;

  } catch (error) {
      console.log(error)
  }
};

exports.signup =  async  (req, res) => {

  let checkForBlacklist = await this.checkInBlacklist(req.body.phone_number)
  console.log(checkForBlacklist)

  if (checkForBlacklist === true) {
    
    res.status(500).send({ message: "vous etes placé dans la liste noire!" });

  } else {
    
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
      birthdate:req.body.birthdate,
      prixConsultation:req.body.prixConsultation
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      
  
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
  
    }
    );

  }

  
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
        prixConsultation: user.prixConsultation,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.deleteUser = (req, res) => {
  id=req.params.id
  User.findByIdAndDelete({"_id":id}
  , function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})
  
};