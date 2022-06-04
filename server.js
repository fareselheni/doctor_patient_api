const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
// const meet_link_email = require("./app/controllers/meet_link_email.controller");
const SchedulerController = require("./app/controllers/scheduler.controller");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//SOCKET.io BEGIN
const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  // forward the private message to the right recipient
  // socket.on("private message", ({ content, to }) => {
  //   socket.to(to).emit("private message", {
  //     content,
  //     from: socket.id,
  //   });
  // });
  socket.on('getDoctorId', (msg) => {
    console.log('message: ' + msg);
    io.sockets.emit('notify',msg)
  });
  socket.on('getPatientId', (msg) => {
    console.log('message: ' + msg);
    io.sockets.emit('notifyPatient',msg)
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});
//SOCKET.io END

const db = require("./app/models");
// const Role = db.role;
const dbs = require("./app/db/Seed")
const spec = dbs.addSpecialite
const role = dbs.addRole
const gouvernorat = dbs.addGouvernorat


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    role();
    spec();
    gouvernorat()
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wevioo application." });
});

//meet_link_email
// meet_link_email.sendDailyEmails()

//////CANCEL APPOINTMENTS
SchedulerController.cancelAppointments()

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/model.routes")(app);
require("./app/routes/scheduler.routes")(app);
require("./app/routes/searchdoctor.routes")(app);
require("./app/routes/timedispo.routes")(app);
require("./app/routes/pre_appointment.routes")(app);
require("./app/routes/confirm_rdv.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/rating.routes")(app);
require("./app/routes/prescription.routes")(app);
require("./app/routes/doctor_api.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


