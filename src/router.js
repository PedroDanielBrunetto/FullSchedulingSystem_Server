const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(express.json());
router.use(cors());

const LoginController = require("./controllers/loginControllers.js");
const RegisterPatientController = require("./controllers/loginControllers.js");
const ListPatients = require("./controllers/listPatients.js");
const UpdatePatients = require("./controllers/updatePatients.js");

router.get("/", (req, res) => {
    res.status(200).send("Server up");
});

router.post("/login-main-user", LoginController.LoginController);
router.post("/register-patient", RegisterPatientController.RegisterPatientController);
router.put("/update-patients", UpdatePatients.UpdatePatients);
router.get("/list-patients", ListPatients.ListPatients);

module.exports = router;
