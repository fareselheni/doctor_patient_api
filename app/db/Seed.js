const db = require("../models");
const Specialite = db.specialite;
const Role = db.role

const listSpecialite=['Tunis','Sfax']
const listRole=['admin','doctor','patient']
addSpecialite = () => {
    Specialite.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          for(let i =0 ;i<listSpecialite.length;i++)
          {
            new Specialite({
                name: listSpecialite[i]
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added "+listSpecialite[i]+" to specialites collection");
              });
          }  
          
    
          
        }
      });
  };

  addRole = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          for(let i =0 ;i<listRole.length;i++)
          {
            new Role({
                name: listRole[i]
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added "+listRole[i]+" to roles collection");
              });
          }  
          
    
          
        }
      });
  };  

  // function addRole() {
  //   Role.estimatedDocumentCount((err, count) => {
  //     if (!err && count === 0) {
  //       new Role({
  //         name: "doctor"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'doctor' to roles collection");
  //       });
  
  //       new Role({
  //         name: "patient"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'patient' to roles collection");
  //       });
  
  //       new Role({
  //         name: "admin"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'admin' to roles collection");
  //       });
  //     }
  //   });
  // }

const dbs = {
  addSpecialite,
  addRole
};
module.exports = dbs;