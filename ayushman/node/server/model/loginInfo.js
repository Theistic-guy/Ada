const mongoose=require("mongoose");

const cartItemSchema = new mongoose.Schema({
  ASIN: String,
  quantity: Number
});


const loginSchema= new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    interests:{
        type:[String],
        default:[]
    },
    searches: {
        type: [String],
        default: []
    },
    cart: [cartItemSchema],

    recommendation: {
        type: [String],
        default: [],
    },
    changes: {
        type: Boolean,
        default: true,
    },
});

const LoginInfo=mongoose.model("User",loginSchema);
module.exports=LoginInfo;