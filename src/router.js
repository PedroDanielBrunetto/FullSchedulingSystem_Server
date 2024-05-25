const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

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

//SendMaster
const { SendSms } = require("./controllers/SendMaster/SendSms.js");
router.get("/Send-sms-Iagente", SendSms);
//Rotina
const { ListAndViewsInDay } = require("./controllers/SendMaster/ListAndViewsInDay.js")
cron.schedule('0 6 * * *', () => {
  console.log('Executando rotina de envio de SMS às 06:00 horário de Brasília');
  ListAndViewsInDay();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

router.get("/", (req, res) => {
  res.status(200).send("Server up");
});


module.exports = router;
