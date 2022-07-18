const controller = require("../controllers/doctor_dashboard/doctor_api.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/dashboard/doctor/allApp", controller.CountAllAppointments);
  app.get("/api/dashboard/doctor/countWeekApp", controller.CountThisweekAppointments);
  app.get("/api/dashboard/doctor/PourcentageweekAppointments", controller.PourcentageweekAppointments);
  app.get("/api/dashboard/doctor/countTodayApp", controller.CountTodayAppointments);
  app.get("/api/dashboard/doctor/PourcentageTodayAppointments", controller.PourcentageTodayAppointments);
  app.get("/api/dashboard/doctor/countMonthApp", controller.CountThisMonthAppointments);
  app.get("/api/dashboard/doctor/PourcentageMonthAppointments", controller.PourcentageMonthAppointments);
  app.get("/api/dashboard/doctor/CountEveryDayAppointments", controller.CountEveryDayAppointments);
  app.get("/api/dashboard/doctor/CountEveryMonthAppointments", controller.CountEveryMonthAppointments);

};