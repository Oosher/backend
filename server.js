const chalk = require("chalk");
const express = require("express");
const connectToDb = require("./mongodb/connectToMongoDb");
const cors =require("cors");
const router = require("./router/router");
const morganLogger = require("./morgan/morganLogger");


const api = express();

api.use(cors({
    origin:"*",
    optionsSuccessStatus:200,

}));



api.use(morganLogger);
api.use(express.json());

api.use(router);




api.use((err,req,res,next)=>{

    res.send("no such route"+err);

})








api.listen(8181,()=>{
    console.log(chalk.green.bgCyan("server is Listening"));
    connectToDb();
})

