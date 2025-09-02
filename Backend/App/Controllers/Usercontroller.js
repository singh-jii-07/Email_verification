import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/Usermodel.js";
import { sendStudentMail } from "../EmailVerify/Verify.js";
import { sendOtpMail } from "../EmailVerify/sendOtpMail.js";
import session from "../Models/SessionModel.js";

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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    newUser.token = token;
    await newUser.save();
    sendStudentMail(newUser);
    return res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


const Verification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    let decode;

    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        error: error.message,
      });
    }

    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isVerified = true;
    user.token = null;
    await user.save();

    res.status(200).json({
      message: "User verified successfully",
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
      return res.status(400).json({ message: "Email and password are required" });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

 
    if (!user.isVerified) {
      return res.status(403).json({ message: "User is not verified" });
    }

   
    const existingSession = await session.findOne({ userId: user._id });
    if (existingSession) {
      await session.delete({ userId: user._id });
    }
       await session.create({
      userId: user._id,
      userName: user.username || user.name, 
    });

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

   
    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 const Logout = async (req, res) => {
  try {
    const userId = req.userId; 

    if (!userId) {
      return res.status(400).json({ message: "User not found in request" });
    }

    
    await session.deleteOne({ userId });

    
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });

    res.status(200).json({
      message: "User logged out successfully",
      userId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

  
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    
    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

  
    await sendOtpMail(user);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
});
}
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: "OTP not generated. Please request again." });
    }

    
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    
    user.isVerified = true;
    user.otp = null; 
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully " });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { register, login, Verification,Logout,forgotPassword,verifyOtp };
