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
        if (await comperePass(req.body.password,user.password)) {
                
            res.send(generateToken(user));

        }else{

            errorService("Incorrect login info",res);

        }
    }
        

    }catch(err){

        errorService(err.message,res);


    }



})

router.put("/",auth,async(req,res)=>{

    try{
        const user = await User.findOne({email:req.body.email})
        if (req.body.password) {
            if(await comperePass(req.body.password.old,user.password)){

            req.body.password = encryptPassword(req.body.password.new);

            }else{
                    return errorService("Passwords dose not match",res) 
                }
        
        }
        await User.findByIdAndUpdate(req.body._id,req.body,{new:true})

        res.send(generateToken(req.body));
    }
    catch(err){
        errorService(err.message,res);
    }


})



/* router.put("/1",async(req,res)=>{
req.body.password =await encryptPassword(req.body.password);

    await User.findOneAndUpdate({email:req.body.email},req.body,{new:true})
    res.send(true)
})
 */
module.exports= router;

