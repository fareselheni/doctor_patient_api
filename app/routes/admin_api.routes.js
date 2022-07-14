const controller = require("../controllers/admin_dashboard/admin_api.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/dashboard/admin/allApp", controller.CountAllAppointments);
  app.get("/api/dashboard/admin/countWeekApp", controller.CountThisweekAppointments);
  app.get("/api/dashboard/admin/PourcentageweekAppointments", controller.PourcentageweekAppointments);
  app.get("/api/dashboard/admin/countTodayApp", controller.CountTodayAppointments);
  app.get("/api/dashboard/admin/PourcentageTodayAppointments", controller.PourcentageTodayAppointments);
  app.get("/api/dashboard/admin/countMonthApp", controller.CountThisMonthAppointments);
  app.get("/api/dashboard/admin/PourcentageMonthAppointments", controller.PourcentageMonthAppointments);
  app.get("/api/dashboard/admin/CountEveryDayAppointments", controller.CountEveryDayAppointments);
  app.get("/api/dashboard/admin/CountEveryMonthAppointments", controller.CountEveryMonthAppointments);

};