import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./logo.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import "./Login.css";

function Verifyaccount() {
  const { token } = useParams(); // Extract token from URL path
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      if (!token) {
        toast.error("Token is missing");
        return;
      }

      try {
        const response = await axios.get(
          `https://api.resumeintellect.com/api/user/verify-account/${token}`
        );

        if (response.status === 200) {
          toast.success("Account verified successfully");
          navigate("/login"); // Redirect to login page after successful verification
        } else {
          toast.error("Verification failed");
        }
      } catch (error) {
        console.error(error.response?.data || error.message || "An error occurred");
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="p-8 rounded-xl shadow-lg shadow-slate-700 w-full max-w-lg bg-white">
        <div className="flex justify-center mb-6">
          <img src={logo} className="w-40 h-10" alt="Logo" />
        </div>
        <div className="text-2xl text-black text-center font-bold mb-4">
          Verify Page
        </div>
        <p className="text-black text-base text-center mb-6">
          Verifying your account...
        </p>
      </div>
    </div>
  );
}

export default Verifyaccount;
