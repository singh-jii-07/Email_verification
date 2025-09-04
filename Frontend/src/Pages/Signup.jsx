import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:4050/api/users/register`,
        formData
      );

      console.log(res.data);

      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setFormData({ username: "", email: "", password: "" });

     navigate("/checkmail");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || " Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        
          <div>
            <label className="block text-gray-100 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          
          <div>
            <label className="block text-gray-100 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

        
          <div className="relative">
            <label className="block text-gray-100 mb-2 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
            Sign Up
          </button>
        </form>

        
        <p className="text-sm text-center text-gray-200 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-300 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

    
      <ToastContainer />
    </div>
  );
};

export default Signup;
