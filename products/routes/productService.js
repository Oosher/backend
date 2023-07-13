
const express = require("express");
const errorService = require("../../errorHandling/errorService");
const router = express.Router();

const Product = require("../models/mongodb/product")

router.get("/", async (req,res)=>{

try{

    const products = await Product.find();
    res.send(products);

}catch(err){

    errorService(err,res);

}


})





router.post("/createnewproduct",async (req,res)=>{


    try{
    const product = new Product(req.body);

    await product.save();


    res.send(product);

    }catch(err){
        errorService(err,res);

    }




})





module.exports= router;