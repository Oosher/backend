const express = require("express");
const router = express.Router();
const User = require("../models/mongodb/user");
const errorService = require("../../errorHandling/errorService");

router.get("/:id", async (req,res)=>{

    try{

        const user = await User.findById(req.params.id);
        res.send(user);

    }
    catch(err){

        errorService(err.message,res)


    }



})





router.post("/newuser",async(req,res)=>{

    try{

        const newUser = new User(req.body)
        await newUser.save();
        res.send(newUser);

    }
    catch(err){

        errorService(err.message,res);

    }

})






module.exports= router;

