const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:2,
        trim: true,
        lowercase: true,


    },
    description:{
        type: String,
        required:true,
        minlength:2,
        trim: true,
        lowercase: true,

    },

    imageUrl:{
        type: String,
        match: RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        ),
        trim: true,
        lowercase: true,


    },
    imageAlt:{
        type: String,
        required:true,
        minlength:3,

    },

    price:{
        type: Number,
        required:true,
        minlength:1,
    },

    productId:{
        type:mongoose.Schema.Types.ObjectId,
    }
})

const Product = mongoose.model("products",productSchema);

module.exports = Product;