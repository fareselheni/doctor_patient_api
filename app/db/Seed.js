const db = require("../models");
const Specialite = db.specialite;
const Role = db.role
const Gouvernorat = db.gouvernorat

const listSpecialite=['cardio','test']
const listRole=['admin','doctor','patient']
const listGouvernorat=['Tunis','Bizerte','Ariana','Manouba','Ben Arous','Zaghouan','Nabeul','Jendouba','Béja','Kef','Seliana','Sousse','Monastir','Mahdia','Kairouan','Kasserine','Sidi Bouzid','Sfax','Gabes','Tataouin','Médenine','Gafsa','Tozeur','Kébili']
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
addGouvernorat= () => {
  Gouvernorat.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        for(let i =0 ;i<listGouvernorat.length;i++)
        {
          new Gouvernorat({
              name: listGouvernorat[i]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("added "+listGouvernorat[i]+" to gouvernorats collection");
            });
        }  
        
  
        
      }
    });
};


const dbs = {
  addSpecialite,
  addRole,
  addGouvernorat
};
module.exports = dbs;