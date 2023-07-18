const errorService = require("../errorHandling/errorService");
const { verifyToken } = require("./jwt/jwt");





const auth =(req,res,next)=>{

    try{

        const tokenFromClient = req.header("auth-token") ;

        if(!tokenFromClient)throw new Error("Authentication error");

        const userInfo = verifyToken(tokenFromClient);


        if(!userInfo)throw new Error("Unauthorized user");

        req.user = userInfo;

        return next();



    }
    catch(err){

        errorService(err.message,res);
    }

}




module.exports = auth ;