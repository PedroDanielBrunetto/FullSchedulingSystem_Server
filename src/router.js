// configurações e importações
const express = require("express")

const cors = require("cors")

const router = express.Router()
router.use(express.json());
router.use(cors())
const RegisterClient = require("./controllers/registerClient.js")
const DeleteProduto = require("./controllers/DeleteProduto.js")
const LoginClient = require("./controllers/loginControllers.js")
const GetInfosClient = require("./controllers/getInfosClient.js")
const CreateProduct = require("./controllers/CreateProduct.js")
const GetSelect = require("./controllers/SelectProducts.js")
const SelectedPedidos = require("./controllers/SelectedPedidos.js")
const CreatePedido = require("./controllers/CreatePedido.js")
const DeleteCliente = require("./controllers/DeletarUser.js")
const GetAllClients = require("./controllers/GetAllClients.js")
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './libs/uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static(path.join(__dirname, 'libs/uploads')));
router.get("/", (req, res)=>{
    res.status(200).send("Welcome to PizzaRuth")
});
router.post("/register", RegisterClient)
router.post("/login", LoginClient.LoginController)
router.get("/get-infos/:id", GetInfosClient.GetInfosClient)
router.post('/api/addPizza', upload.single('imagem'), CreateProduct.addPizza);
router.post('/api/addProduct', upload.single('imagem'), CreateProduct.addProduct);
router.get('/get-pizzas', GetSelect.SelectedPizza)
router.get('/get-produtos', GetSelect.SelectedProdutos)
router.post('/realizar-pedido', CreatePedido.CreatePedido)
router.get('/get-pedidos', SelectedPedidos.SelectedPedidos)
router.get('/get-all-clients', GetAllClients.GetAllClients)
router.delete('/deletar/:id', DeleteProduto.DeleteProduto)
router.delete('/deletar-cliente/:id', DeleteCliente.DeleteCliente)

module.exports = router