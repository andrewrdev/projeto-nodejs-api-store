let express = require("express");
let router = express.Router();
let authService = require("../services/AuthService");
let ProductController = require('../controllers/ProductController');
let CustomerController = require('../controllers/CustomerController');
let OrderController = require("../controllers/OrderController");

// ----------------------------------------------------------------------------

router.get("/", (req, res, next) => {res.status(200).send({ title: "Node Store API", version: "0.0.1" });});

// Products -------------------------------------------------------------------

router.get("/products", ProductController.get);

router.get("/products/:slug", ProductController.getBySlug);

router.get("/products/id/:id", ProductController.getById);

router.get("/products/tag/:tag", ProductController.getByTag);

router.post("/products", authService.authorize, ProductController.post);

router.put("/products/:id", authService.authorize, ProductController.put);

router.delete("/products/:id", authService.authorize, ProductController.delete);

// Customers ------------------------------------------------------------------

router.get("/customers", CustomerController.get);

router.post("/customers", authService.authorize, CustomerController.post);

// Orders ---------------------------------------------------------------------

router.get("/orders", OrderController.get);

router.post("/orders", authService.authorize, OrderController.post);

// Authenticate ---------------------------------------------------------------

router.post("/customers/authenticate", CustomerController.authenticate);

module.exports = router;
