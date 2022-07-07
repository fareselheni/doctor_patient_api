const controller = require("../controllers/blacklist.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/blacklist/add", controller.addToBlackList);
  app.get("/api/blacklist/getAll", controller.getBlackList);
};