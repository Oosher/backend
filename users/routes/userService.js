const express = require("express");
const router = express.Router();
const User = require("../models/mongodb/user");
const errorService = require("../../errorHandling/errorService");
const { generateToken } = require("../../auth/jwt/jwt");
const auth = require("../../auth/auth");
const { encryptPassword, comperePass } = require("../../utils/bcrypt/brypt");

router.get("/:id", async (req,res)=>{

    try{

        const user = await User.findById(req.params.id,{password:0,__v:0});
        res.send(user);

    }
    catch(err){

        errorService(err.message,res)


    }



})





router.post("/newuser",async(req,res)=>{

    try{
        req.body.password= encryptPassword(req.body.password)
        const newUser = new User(req.body);

        await newUser.save();
        res.send(newUser);

    }
    catch(err){

        errorService(err.message,res);

    }

})

router.put("/login",async (req,res)=>{

    try{


        const user = await User.findOne({email:req.body.email})
        
        if(!user) errorService("Incorrect login info",res)
        else{
        if (comperePass(req.body.password,user.password)) {

            res.send(generateToken(user));

        }else{

            errorService("Incorrect login info",res);

        }
    }
        

    }catch(err){

        errorService(err.message,res);


    }



})

router.put("/:id",auth,async(req,res)=>{

    try{
        if (req.body.password) {

            req.body.password = encryptPassword(req.body.password);    
        
        }
        await User.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.send("User has been updated successfully ")
    }
    catch(err){
        errorService(err.message,res);
    }


})





module.exports= router;

