const express =require("express");
const mongoose =require("mongoose");
const cors =require("cors");
const LoginInfo=require("./model/loginInfo");

const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/products", {
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


app.post("/update-cart", async (req, res) => {
  const { userId, cart } = req.body;

  try {
    const user = await LoginInfo.findById(userId);
    if (!user) return res.status(404).send("User not found");
    let updatedCart = [...user.cart];

    cart.forEach(newItem => {
      const index = updatedCart.findIndex(item => item.ASIN === newItem.ASIN);

      if (newItem.quantity <= 0) {
        if (index !== -1) {
          updatedCart.splice(index, 1);
        }
      } else {
        if (index !== -1) {
          updatedCart[index].quantity = newItem.quantity;
          console.log("new item added")
        } else {
          updatedCart.push(newItem);
          console.log("new item added")
        }
      }
    });

    user.cart = updatedCart;
    user.changes = true;
    await user.save();

    res.status(200).json({ message: "Cart updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating cart");
  }
});

app.get("/get-cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await LoginInfo.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const cartItems = user.cart || [];
    if (cartItems.length === 0) {
      return res.status(200).json([]); 
    }

    const ASINs = cartItems.map(item => item.ASIN);

    const products = await Product.find({ ASIN: { $in: ASINs } }).lean();

    const mergedCart = cartItems.map(cartItem => {
      const product = products.find(p => p.ASIN === cartItem.ASIN);
      if (!product) return null; 
      return {
        ...product,
        quantity: cartItem.quantity,
      };
    }).filter(Boolean); 

    res.status(200).json(mergedCart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart");
  }
});




app.post("/search", async (req, res) => {
    const { name, searchQuery } = req.body;

    if (!name || !searchQuery) {
        return res.status(400).json({ message: "❌ userId and query are required" });
    }

    try {
        const updatedUser = await LoginInfo.findOneAndUpdate(
            { UserName: name },
            {$push: { searches: searchQuery },
             $set: { changes: true } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "❌ User not found" });
        }

        res.status(200).json({
            message: "✅ Search saved successfully",
            searches: updatedUser.searches
        });
    } catch (error) {
        console.error("Error saving search:", error);
        res.status(500).json({ message: "❌ Server error", error: error.message });
    }
});

app.get("/search",async(req,res)=>{
    const data=req.body;
    res.json(data);
})

app.post("/signUp", async (req, res) => {
        const existingUser =await LoginInfo.findOne({ email: req.body.email });
        const existUser =await LoginInfo.findOne({ UserName: req.body.UserName });
        if (existingUser) {
            return res.status(400).json({ message: "❌ Email already registered" });
        }
        if (existUser) {
            return res.status(400).json({ message: "❌ Username already registered" });
        }
        console.log(req.body);
        const newUser = new LoginInfo(req.body);
        await newUser.save();
        res.status(201).json({ message: "✅ User registered successfully" });
});

app.post("/log", async(req,res)=>{
    const user = await LoginInfo.findOne({ UserName: req.body.UserName });
    if (!user || user.password !== req.body.password) {
        return res.status(400).json({ message: "❌ Incorrect User Name or Password" });
    }
    res.status(200).json({
        message: "✅ Login successful",
        userId: user._id,
        userName: user.UserName,
        userData: user
    });
})

app.get("/user/:id", async (req, res) => {
    try {
        const user = await LoginInfo.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// app.get("/signUp",async(req,res)=>{
//     try {
//         const users = await LoginInfo.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })

app.listen(5000, () => console.log("Server running on port 5000"));