

const bcrypt = require("bcryptjs");




const encryptPassword = (password)=>bcrypt.hashSync(password,10);




const comperePass = (password,oldPassword)=> bcrypt.compare(password,oldPassword);







module.exports = {encryptPassword,comperePass};