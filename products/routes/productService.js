
const express = require("express");
const errorService = require("../../errorHandling/errorService");
const router = express.Router();
const {Product} = require("../models/mongodb/product");
const auth = require("../../auth/auth");
const productImageValidation = require("../joi/joiscema");
const firstProductValidation = require("../joi/firstProductValidation.js");
const Order = require("../models/mongodb/orders");
const User = require("../../users/models/mongodb/user");


const orderStatuses=["Order Accepted", "In delivery" , "Delivered" ]


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
        firstProductValidation(req.body.imageArray[0]);
        req.body.imageArray.map((image)=>{
            let {error} = productImageValidation(image);
            if(error){
                console.log(error);
                errExst = true;
                return error.details[0].message
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


router.delete("/:productId/:userId",auth,async(req,res)=>{
    
    try{

        const user  = await User.findById(req.params.userId)
        if(user.isAdmin){ 
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (deletedProduct===null) {
            return errorService("Product was not found",res);
        }
        else{
            
            return res.send("Product was deleted successfully")
        }

    }
    else{

        return errorService("Unauthorized user")

    }

    }catch(err){
        errorService("Product was not found",res);

    }





})



router.post("/neworder",auth,async (req,res)=>{

    try{

        const newOrder = new Order(req.body);

        await newOrder.save();

        res.send(newOrder);

    }catch(err){

        errorService(err,res)

    }


})





router.get("/orders/:email/:userName",auth,async(req,res)=>{


    try{


        const user = await User.find({email:req.params.email});
        
        
        if (req.params.userName=== user[0].name.first ) {
            res.send(await Order.find({email:req.params.email}))
        }else(
            errorService("the user doesn't mach our database",res)
        ) 
        

    }catch(err){

        errorService(err.message,res);

    }


})
router.get("/orders/statuses",auth,async(req,res)=>{


    try{

            res.send(orderStatuses);

    }catch(err){

        errorService(err.message,res);

    }


})



router.get("/orders/allorders/:email/:firstname",auth,async (req,res)=>{

    try{

        const user = await User.find({email:req.params.email});

        if (user[0]?.name.first === req.params.firstname && user[0]?.isAdmin) {

            return res.send(await Order.find())
            
        }

        return errorService("The user is not authorized", res)

    }catch(err){

        errorService(err,res);

    }


})





router.put("/orders/updateOrders",auth, async(req,res)=>{

try{    



    const user = await User.findOne({_id:req.body.userId})
    if (user.isAdmin) {
        await Order.deleteMany({})

        await Order.insertMany(req.body.updatedOrders);

        return res.send("The database has been updated")
    }
       

    return errorService("Unable to compleat the update",res);

}catch(err){
    
    errorService(err,res);

}


})


module.exports= router;