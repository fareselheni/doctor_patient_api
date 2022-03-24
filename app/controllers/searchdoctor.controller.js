const db = require("../models");
const User = db.user;
const Role = db.role;
const Scheduler = db.scheduler;
const Specialite = db.specialite
const Gouvernorat = db.specialite
exports.getAllDoctors =async (req, res) => {
  try {
        const roleId = await Role.findOne({name:"doctor"}).select('_id').clone()
        await User.find(
          {
          },
          (err, doctors) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
              res.send({ alldoctors: doctors });
            }).where('roles').in([roleId]).clone()
            // .equals(ObjectId("623459c08c4edb43dbb9ec11"));
  } catch (error) {
      console.log(error)
  }
    
};

  exports.getDoctorsByFiltre =async (req, res) => {
    try {
          const roleId = await Role.findOne({name:"doctor"}).select('_id').clone()
          if(req.query.specialite && req.query.gouvernorat){
            await User.find(
                {
                },
                (err, doctors) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                    res.send({ alldoctors: doctors });
                  }).where('roles').in([roleId])
                  .where('gouvernorat').in([req.query.gouvernorat])
                  .where('specialite').in([req.query.specialite]).clone()  
          }
          else if(req.query.specialite){
            await User.find(
                {
                },
                (err, doctors) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                    res.send({ alldoctors: doctors });
                  }).where('roles').in([roleId])
                  .where('specialite').in([req.query.specialite]).clone()
          }
          else if(req.query.gouvernorat){
            await User.find(
                {
                },
                (err, doctors) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                    res.send({ alldoctors: doctors });
                  }).where('roles').in([roleId])
                  .where('gouvernorat').in([req.query.gouvernorat]).clone()
          }
          else {
              res.send('empty')
          }
    } catch (error) {
        console.log(error)
    }
      
  };  



