
const express = require("express");
const errorService = require("../../errorHandling/errorService");
const router = express.Router();
const Product = require("../models/mongodb/product");
const auth = require("../../auth/auth");
const productImageValidation = require("../joi/joiscema");

router.get("/", async (req,res)=>{

    try{

        const products = await Product.find();
        res.send(products);

    }catch(err){

        errorService(err,res);

    }


    })



router.get("/:id",async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.send(product);
    }
    catch(err){
        errorService("cannot find product",res)
    }


})


router.post("/createnewproduct",auth,async (req,res)=>{

    try{
        let errExst= false;
        req.body.imageArray.map((image)=>{
            let {error} =productImageValidation(image);
            if(error){
                console.log(error);
                errExst = true;
                return errorService(error.details[0].message,res)
            }
        })
        




        if (!errExst) {
            const product = new Product(req.body);

            await product.save();


            res.send(product);
        }

        

    }catch(err){
        errorService(err,res);

    }


})


//updates the product
router.put("/:id",auth,async (req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.send(product)

    }catch(err){

        errorService(err.message,res);

    }
    

})


router.delete("/:id",auth,async(req,res)=>{
    
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct===null) {
            errorService("Product was not found",res);
        }
        else{
        
            res.send("Product was deleted successfully")
        }


    }catch(err){
        errorService("Product was not found",res);

    }





})

module.exports= router;