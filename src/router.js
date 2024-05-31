const express = require("express");
const router = express.Router();

// Middlewares
router.use(express.json());
router.use(require("cors")());

// Access Controller
const { LoginController } = require("./controllers/Access/loginControllers.js");
router.post("/login-main-user", LoginController);

// Patients
const { RegisterPatients } = require("./controllers/Patients/RegisterPatients.js");
router.post("/register-patient", RegisterPatients);
const { ListPatients } = require("./controllers/Patients/listPatients.js");
router.get("/list-patients", ListPatients);
const { UpdatePatient } = require("./controllers/Patients/updatePatients.js");
router.put("/update-patients", UpdatePatient);

// Schedule
const { RegisterAppointment } = require("./controllers/Schedule/RegisterAppointment.js");
router.post("/register-appointment", RegisterAppointment);
const { CancelAppointment } = require("./controllers/Schedule/CancelAppointment.js");
router.delete("/cancel-appointment", CancelAppointment);

// SendMaster
const { SendSms } = require("./controllers/SendMaster/SendSms.js");
router.get("/Send-sms-Iagente", SendSms);

// Rotina
const { ListAndViewsInDay } = require("./controllers/SendMaster/ListAndViewsInDay.js");

// Endpoint para o cron job
router.get("/trigger-sms-job", async (req, res) => {
  console.log('Executando rotina de envio de SMS via endpoint');
  try {
    await ListAndViewsInDay();
    res.status(200).send("Rotina de envio de SMS executada com sucesso.");
  } catch (error) {
    console.error("Erro ao executar rotina de envio de SMS:", error);
    res.status(500).send("Erro ao executar rotina de envio de SMS.");
  }
});

// Rota principal
router.get("/", (req, res) => {
  res.status(200).send("Service On! Deploy 2.0");
});

module.exports = router;
