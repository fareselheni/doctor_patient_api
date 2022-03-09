exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.doctorBoard = (req, res) => {
    res.status(200).send("doctor Content.");
  };
  exports.patientBoard = (req, res) => {
    res.status(200).send("patient Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  