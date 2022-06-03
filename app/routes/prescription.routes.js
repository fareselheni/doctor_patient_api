const controller = require("../controllers/prescription.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/prescription/newPrescription", controller.addPrescription);
  app.get("/api/prescription/patient/getall", controller.patientGetAllPerscriptions);
  app.get("/api/prescription/patient/getBySchId", controller.patientGetPerscriptionsBySchId);
  app.get("/api/prescription/doctor/getall", controller.doctorGetAllPerscriptions);
  app.delete(
    "/api/prescription/delete/:id",
    controller.deleteEvent
  );

};