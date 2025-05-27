const mongoose=require("mongoose");

const cartItemSchema = new mongoose.Schema({
  ASIN: String,
  quantity: Number
});

const RecSchema = new mongoose.Schema({
    mainCategory: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    ASIN: {
        type: String,
        required: true,
        unique: true
    },
    productLink: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    productOverview: {
        brand: String,
        numberOfItems: String,
        colour: String,
        incontinenceProtectorType: String,
        ageRange: String,
        material: String,
        materialTypeFree: String,
        reusability: String,
        size: String,
        netQuantity: String
    },
    featureBullets: {
        type: [String],
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    ratings: {
        type: Number,
        required: true
    },
    listPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    bookDescription: {
        type: String,
        default: null
    }
}, { timestamps: true });


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