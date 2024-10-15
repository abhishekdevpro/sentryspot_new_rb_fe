import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./logo.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import "./Login.css";

function Resetpassword() {
  const { token } = useParams(); // Extract token from URL path
  const [new_password, setnew_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setnew_password(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!new_password) {
      toast.error("New password is required");
      return;
    }

    if (!token) {
      toast.error("Token is missing");
      return;
    }

    // Create FormData object and append token and new_password
    const formData = new FormData();
    formData.append("token", token);
    formData.append("new_password", new_password);

    try {
      const response = await axios.post(
        'https://api.resumeintellect.com/api/user/reset-password',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/login"); // Redirect to login page after successful reset
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      console.error(error.response?.data || error.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="p-8 rounded-xl shadow-lg shadow-slate-700 w-full max-w-lg bg-white">
        <div className="flex justify-center mb-6">
          <img src={logo} className="w-40 h-10" alt="Logo" />
        </div>
        <div className="text-2xl text-black text-center font-bold mb-4">
          Reset Password
        </div>
        <p className="text-black text-base text-center mb-6">
          People across the globe are joining us to upgrade their career with our Robust AI.
        </p>
        <form onSubmit={handleSubmit}>
        <label className="block text-black mb-2">New Password</label>
        <div className="relative mb-3">
           
            <input
               type={showPassword ? "text" : "password"} 
              name="new_password"
              value={new_password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your new password"
              required
            />
             <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? "🕵🏻 Hide " : "👁 View"}
                </button>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Resetpassword;
