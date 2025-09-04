import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4050/api/users//forgot", { email });
      toast.success(res.data.message || "OTP sent to your email!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

 
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4050/api/users//otp", { email, otp });

      await axios.post(`http://localhost:4050/api/users/chnagepassword/${email}`, {
        newPassword,
        confirmPassword,
      });

      toast.success("Password changed successfully! You can login now.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center border border-white/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Forgot Password
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
