let express = require("express");
let router = express.Router();
let ProductController = require('../controllers/ProductController')

// ----------------------------------------------------------------------------

router.get("/", (req, res, next) => {
    res.status(200).send({ title: "Node Store API", version: "0.0.1" });
});

router.get("/products", ProductController.get);

router.get("/products/:slug", ProductController.getBySlug);

router.get("/products/id/:id", ProductController.getById);

router.get("/products/tag/:tag", ProductController.getByTag);

router.post("/products", ProductController.post);

router.put("/products/:id", ProductController.put);

router.delete("/products/:id", ProductController.delete);

module.exports = router;
