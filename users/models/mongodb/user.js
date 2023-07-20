const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        first:{
            type:String,
            required:true,
            minlength:2,
            trim: true,
            loadClass:true,
        },
        last:{
            type:String,
            required:true,
            minlength:2,
            trim: true,
            lowercase:true,
        }
    },
    phone: {
        type: String,
        required: true,
        match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    },
    email: {
        type: String,
        required: true,
        match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
     /*    required: true, */
        trim: true,
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
    address: {
        country: {type:String,required:true,minlength:3},
        city: {type:String,required:true,minlength:3},
        street: {type:String,required:true,minlength:3},
        houseNumber: {
            type: Number,
            required: true,
            trim: true,
            minLength: 1,
        },
        zip: {
            type: Number,
            trim: true,
            minLength: 4,
            default: 0,
        }
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



const User =mongoose.model("users",userSchema);

module.exports= User;