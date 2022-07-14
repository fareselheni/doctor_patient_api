const controller = require("../controllers/notification.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/subscribe", controller.pushNot);
  app.post("/api/notification/addNotification", controller.addNotification);
  app.get("/api/notification/getNotifications", controller.GetAllNotifications);
  app.put(
    "/api/notification/updateSeen",
    controller.updateSeenNotification
  );
  // app.get("/*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "public", "sw.js"));
  // });
};