import React from "react";
import { Link } from "react-router-dom";

const CheckMail = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white/30">
        <h2 className="text-3xl font-bold text-white mb-6">Verify Your Email</h2>
        <p className="text-gray-200 mb-4">
          Thanks for signing up! We’ve sent a verification link to your email.
        </p>
        <p className="text-yellow-200 mb-6">
          Please check your inbox (and spam folder) to verify your account.
        </p>

        
      </div>
    </div>
  );
};

export default CheckMail;
