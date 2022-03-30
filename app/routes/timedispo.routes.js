const { authJwt } = require("../middlewares");
const controller = require("../controllers/timedispo.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/newtimedispo",
    controller.addTimedispo
  );
  app.put(
    "/api/updatetimedispo/:id",
    controller.updateEvent
  );
  app.delete(
    "/api/deletetimedispo/:id",
    controller.deleteEvent
  );
};