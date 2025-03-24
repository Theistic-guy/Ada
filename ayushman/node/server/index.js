const express =require("express");
const mongoose =require("mongoose");
const cors =require("cors");
const LoginInfo=require("./model/loginInfo");

const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const ProductSchema = new mongoose.Schema({
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

const Product = mongoose.model("Product", ProductSchema,"ada");

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/signUp", async (req, res) => {
        const existingUser =await LoginInfo.findOne({ email: req.body.email });
        const existUser =await LoginInfo.findOne({ UserName: req.body.UserName });
        if (existingUser) {
            return res.status(400).json({ message: "❌ Email already registered" });
        }
        if (existUser) {
            return res.status(400).json({ message: "❌ Username already registered" });
        }
        const newUser = new LoginInfo(req.body);
        await newUser.save();
        res.status(201).json({ message: "✅ User registered successfully" });
});

app.post("/log", async(req,res)=>{
    const ex=await LoginInfo.findOne({UserName:req.body.UserName});
    if(ex.password===req.body.password){
        return res.status(201);
    }
    res.status(400).json({message: "❌ Incorrect User Name or Password"});
})
// app.get("/signUp",async(req,res)=>{
//     try {
//         const users = await LoginInfo.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })

app.listen(5000, () => console.log("Server running on port 5000"));