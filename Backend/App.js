const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const crypto=require("crypto");
const { error } = require("console");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files (images)

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/auth");

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  profileImage: String, // Path to image file
});

const User = mongoose.model("User", UserSchema);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(12,(error,bytes)=>{
const fn=bytes.toString('hex') +path.extname(file.originalname);
cb(null, fn);
    })
  }
});
const upload = multer({ storage: storage });

// Signup Route with image upload
app.post("/signup", upload.single('profileImage'), async (req, res) => {
  const { username, password} = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    profileImage: req.file.path // Save image path
  });

  await newUser.save();
  res.status(201).json(
    { message: "User created successfully" }
    
  );
});

app.get("/",(req,res)=>{
  res.redirect("home");
})


// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, "your_jwt_secret");
  res.status(200).json({ token, username: user.username, profileImage: user.profileImage });
});




// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});