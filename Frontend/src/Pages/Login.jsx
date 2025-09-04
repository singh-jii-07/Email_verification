import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4050/api/users/login", formData);

      toast.success(res.data.message || "Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });

   
      localStorage.setItem("token", res.data.token);
     

      
      navigate("/")
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div>
            <label className="block text-gray-100 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          
          <div className="relative">
            <label className="block text-gray-100 mb-2 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-600 hover:text-indigo-500 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

       
        <p className="text-sm text-center text-gray-200 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-300 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
