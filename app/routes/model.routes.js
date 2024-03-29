const { authJwt } = require("../middlewares");
const controller = require("../controllers/model.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/model/allusers", controller.getAllUsers);
  app.get("/api/model/alldoctors", controller.getAllDoctors);
  app.get("/api/model/allpatients", controller.getAllPatients);
  app.get("/api/model/alladmins", controller.getAllAdmins);
  app.get("/api/model/getDoctorById/:id", controller.getUserbyId);
  app.get("/api/model/allspecialite", controller.getAllspecialites);
  app.get("/api/model/allgouvernorats", controller.getAllGouvernorats);
//   app.get("/api/test/doctor", [authJwt.verifyToken, authJwt.isDoctor],
//    controller.doctorBoard
//    );

};