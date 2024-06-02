const express = require("express");
const router = express.Router();

// Middlewares
router.use(express.json());
router.use(require("cors")());

// Access Controller
const { LoginController } = require("./controllers/Access/loginControllers.js");
router.post("/login-main-user", LoginController);

// Patients
const {
  RegisterPatients,
} = require("./controllers/Patients/RegisterPatients.js");
router.post("/register-patient", RegisterPatients);
const { ListPatients } = require("./controllers/Patients/listPatients.js");
router.get("/list-patients", ListPatients);
const { UpdatePatient } = require("./controllers/Patients/updatePatients.js");
router.put("/update-patients", UpdatePatient);

// Schedule
const {
  RegisterAppointment,
} = require("./controllers/Schedule/RegisterAppointment.js");
router.post("/register-appointment", RegisterAppointment);
const {
  CancelAppointment,
} = require("./controllers/Schedule/CancelAppointment.js");
router.delete("/cancel-appointment", CancelAppointment);

// Schedule Not Register
const {
  NotRegisteredAppointment,
} = require("./controllers/ScheduleNotRegister/NotRegisteredAppointment.js");
router.post("/not-registered-appointment", NotRegisteredAppointment);

//ListAllAppointments
const {
  getAppointmentsByDay,
} = require("./controllers/ListAllAppointments/index.js");
router.get("/list-appointments", getAppointmentsByDay);

// SendMaster
const { SendSms } = require("./controllers/SendMaster/SendSms.js");
router.get("/Send-sms-Iagente", SendSms);

// Rotina
const {
  ListAndViewsInDay,
} = require("./controllers/SendMaster/ListAndViewsInDay.js");

// Endpoint para o cron job
router.get("/trigger-sms-job", async (req, res) => {
  console.log("Executando rotina de envio de SMS via endpoint");
  try {
    const result = await ListAndViewsInDay();
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao executar rotina de envio de SMS:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao executar rotina de envio de SMS.",
      error: error.message || error,
    });
  }
});

// Rota principal
router.get("/", (req, res) => {
  res.status(200).send("Service On! Deploy 3.0");
});

module.exports = router;
