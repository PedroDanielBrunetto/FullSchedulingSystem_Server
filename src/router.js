const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(express.json());
router.use(cors());

//Access Controller
const { LoginController } = require("./controllers/Access/loginControllers.js");
router.post("/login-main-user", LoginController);

//Patients
const { RegisterPatients } = require("./controllers/Patients/RegisterPatients.js");
router.post("/register-patient", RegisterPatients);
const { ListPatients } = require("./controllers/Patients/listPatients.js");
router.get("/list-patients", ListPatients);
const { UpdatePatient } = require("./controllers/Patients/updatePatients.js");
router.put("/update-patients", UpdatePatient);

//Schedule
const { RegisterAppointment } = require("./controllers/Schedule/RegisterAppointment.js")
router.post("/register-appointment", RegisterAppointment);
const { CancelAppointment } = require ("./controllers/Schedule/CancelAppointment.js")
router.delete("/cancel-appointment", CancelAppointment);

router.get("/", (req, res) => {
  res.status(200).send("Server up");
});


module.exports = router;
