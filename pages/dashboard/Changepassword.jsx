import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
function Changepassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePassword({ ...changePassword, [name]: value });
  };

  const token = localStorage.getItem("token");
  const requestBody = {
    old_password: changePassword.old_password,
    new_password: changePassword.new_password,
    confirm_password: changePassword.confirm_password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: "https://api.resumeintellect.com/api/user/change-password",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      data: requestBody,
    })
      .then((response) => {
        console.log(response.data.message,'sd');
        toast("✅ Password has been changed successfully");
        
      })
      .catch((err) => {
        console.log(err)
        toast("❌ Something went wrong check the password again or try again later  ");
      });
    
  };

  return (
    <>
      <div className="bg-white min-h-screen p-4">
        <ToastContainer/>
        <div className="bg-white p-8 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-2xl font-bold uppercase">🔐 Change Password</h5>
            
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-7">
              <div>
                <label htmlFor="old_password" className="block mb-1">
                  Old Password
                </label>
                <div className="relative">
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    <i className={showOldPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                  </span>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={handleChange}
                    id="old_password"
                    name="old_password"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new_password" className="block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <span
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <i className={showNewPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                    </span>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      onChange={handleChange}
                      id="new_password"
                      name="new_password"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm_password" className="block mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <span
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      onChange={handleChange}
                      id="confirm_password"
                      name="confirm_password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-5 bg-white text-blue-800 border-blue-800 border-2 px-6 py-3 rounded-lg font-bold "
                >🔄
                  Update Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Changepassword;
