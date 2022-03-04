const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
// isAdmin = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "admin") {
//             next();
//             return;
//           }
//         }
//         res.status(403).send({ message: "Require Admin Role!" });
//         return;
//       }
//     );
//   });
// };
// isDoctor = (req, res, next) => {
//   User.Doctor.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "doctor") {
//             next();
//             return;
//           }
//         }
//         res.status(403).send({ message: "Require Doctor Role!" });
//         return;
//       }
//     );
//   });
// };
isAdmin = (req, res, next) => {
  User.Admin.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(user!=null){
      if (user._id==req.userId)
      {
        next();
        return
      }
    }
    
    res.status(403).send({ message: "Require Admin Role!" });
    return;
    
  });
    
    
  
};
isDoctor = (req, res, next) => {
  User.Doctor.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(user!=null){
      if (user._id==req.userId)
      {
        next();
        return
      }
    }
    
    res.status(403).send({ message: "Require Doctor Role!" });
    return;
    
  });
    
    
  
};
isPatient = (req, res, next) => {
    User.Patient.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if(user!=null){
        if (user._id==req.userId)
        {
          next();
          return
        }
      }
      
      res.status(403).send({ message: "Require Patient Role!" });
      return;
      
    });
      
      
    
  };
const authJwt = {
  verifyToken,
  isAdmin,
  isDoctor,
  isPatient
};
module.exports = authJwt;