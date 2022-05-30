const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.specialite = require("./specialite.model");
db.gouvernorat = require("./gouvernorat.model");
db.scheduler = require("./scheduler.model");
db.timedispo = require("./timedispo.model");
db.pre_appointment = require("./pre_appointment.model")
db.rating = require("./rating.model")
db.prescription = require("./prescription.model")
db.notification = require("./notification.model")
db.ROLES = ["doctor","patient", "admin"];
module.exports = db;