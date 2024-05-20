const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(express.json());
router.use(cors());

const { LoginController } = require("./controllers/loginControllers.js");
const { RegisterPatients } = require("./controllers/registerPatients.js");
const { ListPatients } = require("./controllers/listPatients.js");
const { UpdatePatient } = require("./controllers/updatePatients.js");

router.get("/", (req, res) => {
  res.status(200).send("Server up");
});

router.post("/login-main-user", LoginController);
router.post("/register-patient", RegisterPatients);
router.put("/update-patients", UpdatePatient);
router.get("/list-patients", ListPatients);

module.exports = router;
