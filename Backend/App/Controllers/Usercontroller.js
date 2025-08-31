import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/Usermodel.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

   
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

 
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      message: "User registered successfully",
      newUser
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

   
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,              
      { expiresIn: "1h" }                 
    );

   
    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



export { register,login}
