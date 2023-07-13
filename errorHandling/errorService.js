
const chalk =require("chalk")


const errorService = (err,res)=>{
    console.log(chalk.red.bgWhite(err) );
    res.status(400).send(err)
}





module.exports = errorService;