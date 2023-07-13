
const express = require("express");

const productService = require("../products/routes/productService");
const errorService = require("../errorHandling/errorService");
const router = express.Router();


router.use("/products",productService)


router.use((req, res) => {
    errorService("path not found ",res)
});

module.exports = router;