const requestHome = require("../controllers/Home");
const requestProduct = require("../controllers/product");
const express = require("express");
const { Router } = require("express");
const router = express.Router();


router.get("/", requestHome.HomeApi);
router.get('/products_list', requestProduct.getProducts);
router.get('/products/:id', requestProduct.getProductById);
router.post('/products', requestProduct.saveProduct);
router.patch('/products/:id', requestProduct.updateProduct);
router.delete('/products/:id', requestProduct.deleteProduct);

module.exports = router;


