const { authJwt } = require("../middlewares");
const controller = require("../controllers/scheduler.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/scheduler/getall", controller.getAllEvents);
  app.post(
    "/api/scheduler/newevent",
    controller.addEvent
  );
  app.put(
    "/api/scheduler/updateevent/:id",
    controller.updateEvent
  );
  app.delete(
    "/api/scheduler/deleteevent/:id",
    controller.deleteEvent
  );
};