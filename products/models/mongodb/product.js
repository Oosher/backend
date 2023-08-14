const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:2,
        trim: true,
        lowercase: true,
        unique:true,


    },
    description:{
        type: String,
        required:true,
        minlength:2,
        trim: true,
        lowercase: true,

    },

    imageArray:{
        type:Array,

    },
  /*   imageUrl:{
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

    }, */
    stock:{
        type:Number,
        required:true,
        default:1,
    },
    price:{
        type: Number,
        required:true,
        minlength:1,
    },
    category:{
        type:String,
        required:true,
        minlength:2,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
    }
})

const Product = mongoose.model("products",productSchema);

module.exports = Product;