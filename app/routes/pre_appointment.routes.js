const controller = require("../controllers/pre_appointment.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/pre_app/user/getall", controller.UsergetAllPreApp);
  app.get("/api/pre_app/doctor/getall", controller.DoctorgetAllPreApp);
  app.post(
    "/api/pre_app/new",
    controller.addPreApp
  );
  // app.put(
  //   "/api/scheduler/updateevent/:id",
  //   controller.updateEvent
  // );
  // app.delete(
  //   "/api/scheduler/deleteevent/:id",
  //   controller.deleteEvent
  // );
  // app.get("/api/scheduler/getstart", controller.checkCollision);
};