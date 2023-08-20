const mongoose = require("mongoose");
const { productSchema } = require("./product");


const changeSchema= ()=>{
    const schemaObj = {...productSchema.obj};

    delete schemaObj.name;

    return schemaObj;
}



const modifiedProductSchema= new mongoose.Schema({
    ...changeSchema(),
    name:{
        type: String,
        required:true,
        minlength:2,
        trim: true,
        lowercase: true,
    },
    amount:{
        type:Number,
        min:1,
        required:true,
    },

})

const orderSchema = new mongoose.Schema({

    userName:{
        type:String,
        minlength:4,
        require,
    },
    email:{
        type: String,
        required: true,
        match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
        lowercase: true,
        trim: true,
        
    },
    
    orderDetails:{
        type:[modifiedProductSchema],
        unique:false,
    },
    
    totalPriceNis:{
        type:Number,
        min:1,
        required:true,
    },

    OrderId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Order = mongoose.model("orders",orderSchema);

module.exports = Order;