
const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = ()=>{

    const userName = process.env.ATLAS_USER_NAME;
    const password = process.env.ATLAS_PASSWORD;


    mongoose
        .connect(
            `mongodb+srv://${userName}:${password}@onlinestore.oc4pm4j.mongodb.net/shop`
        )
        .then(() => console.log("connected to MongoDb Atlas!"))
        .catch((error) => console.log(`could not connect to mongoDb: ${error}`));
    }



    module.exports = connectToDb; 