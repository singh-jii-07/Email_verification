import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    minlength: [6, "Password should be at least 6 characters"],
    maxlength: [32, "Password can't be more than 32 characters"],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  accountVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: Number,
  verificationCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.model("User", userSchema);
export default User;
