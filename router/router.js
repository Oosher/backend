
const express = require("express");

const productService = require("../products/routes/productService");
const userService  =require("../users/routes/userService");
const errorService = require("../errorHandling/errorService");
const router = express.Router();


router.use("/products",productService);
router.use("/users",userService);




router.use((req, res) => {
    errorService("path not found ",res)
});

module.exports = router;