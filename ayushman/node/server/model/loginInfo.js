const mongoose=require("mongoose");


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
    }
});

const LoginInfo=mongoose.model("User",loginSchema);
module.exports=LoginInfo;