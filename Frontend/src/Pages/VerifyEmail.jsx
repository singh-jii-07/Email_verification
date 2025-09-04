import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const { token } = useParams(); // get token from URL
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:4050/api/users/verify", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pass token in headers
          },
        });

        toast.success(res.data.message || "✅ Email verified!", {
          position: "top-right",
          autoClose: 2000,
        });
        setStatus("success");

        setTimeout(() => navigate("/login"), 2500);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "❌ Verification failed!", {
          position: "top-right",
          autoClose: 3000,
        });
        setStatus("failed");
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white/30">
        <h2 className="text-3xl font-bold text-white mb-6">Email Verification</h2>

        {status === "loading" && (
          <p className="text-yellow-200 text-lg animate-pulse">
            ⏳ Verifying your email...
          </p>
        )}

        {status === "success" && (
          <p className="text-green-300 text-lg">🎉 Your email is verified!</p>
        )}

        {status === "failed" && (
          <p className="text-red-300 text-lg">❌ Verification failed!</p>
        )}

        <div className="mt-6">
          <Link
            to="/login"
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
