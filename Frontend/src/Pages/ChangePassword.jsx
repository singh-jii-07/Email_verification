import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const { email } = useParams(); 
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:4050/api/users/chnagepassword/${email}`, formData);

      toast.success(res.data.message || "Password changed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({ newPassword: "", confirmPassword: "" });

     
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white/30">
        <h2 className="text-3xl font-bold text-white mb-6">Change Password</h2>
        <p className="text-gray-200 mb-6">
          Enter your new password and confirm it to update your account password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-100 mb-2 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-100 mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-600 hover:to-purple-700"
            }`}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
