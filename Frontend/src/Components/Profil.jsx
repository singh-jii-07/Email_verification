import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:4050/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch profile", { position: "top-right", autoClose: 3000 });
      }
    };
    fetchProfile();
  }, [token, navigate]);

 
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4050/api/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Logged out successfully", { position: "top-right", autoClose: 2000 });
      localStorage.removeItem("token");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed", { position: "top-right", autoClose: 3000 });
    }
  };

  if (!user) return <p className="text-white text-center mt-20">Loading profile...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white/30">
        <h2 className="text-3xl font-bold text-white mb-6">Profile</h2>
        <p className="text-gray-200 mb-2"><strong>Name:</strong> {user.username}</p>
        <p className="text-gray-200 mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-200 mb-6"><strong>Status:</strong> {user.isVerified ? "Verified" : "Not Verified"}</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Profile;
