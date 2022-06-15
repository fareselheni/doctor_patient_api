const controller = require("../controllers/paiement.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/paiement/addPaiement", controller.Add);
  app.get("/api/paiement/getDetailPaiement/:id", controller.verify);

};