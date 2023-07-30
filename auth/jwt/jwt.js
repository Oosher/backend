
const chalk = require("chalk");
const jwt = require ("jsonwebtoken");
require("dotenv").config();


const key = process.env.SECRET_KEY;


const generateToken = (user)=>{
    
    const {_id,isAdmin,name,imageUrl,imageAlt,address,phone,email} = user;

    const token = jwt.sign({_id,isAdmin,imageUrl,imageAlt,address,phone,email,name},key);

    return token;


}



const verifyToken = (tokenFromClient)=>{

    try{

        const userData = jwt.verify(tokenFromClient,key);

        return userData;

    }catch(err){
        
        console.log(chalk.red.bgBlue(err.message));


    }


}



module.exports = {generateToken,verifyToken};