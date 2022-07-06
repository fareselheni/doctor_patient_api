const controller = require("../controllers/signal.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/signal/getNbByUserId", controller.getNbSignalbyUserId);
  app.get("/api/signal/check", controller.CheckExistingSignal);
  app.get("/api/signal/patientOrderBySignal", controller.orderPatientBySignal);

  app.post(
    "/api/signal/add",
    controller.addSignal
  );
  app.put(
    "/api/signal/updateSignal",
    controller.updateUserSignalNb
  );

};