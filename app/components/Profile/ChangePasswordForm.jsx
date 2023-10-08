import React, { useState } from "react";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const ChangePasswordForm = ({ onSubmit, isLoading, setIsChangeForm }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);

  const handleToggleOldPasswordVisibility = () => {
    setOldPasswordVisibility(!oldPasswordVisibility);
  };

  const handleToggleNewPasswordVisibility = () => {
    setNewPasswordVisibility(!newPasswordVisibility);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ oldPassword, newPassword });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label className="text-headtxt dark:text-white">
        Old Password:
        <div className="relative">
          <input
            className="details"
            type={oldPasswordVisibility ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={handleToggleOldPasswordVisibility}
          >
            {oldPasswordVisibility ? (
              <VisibilityRoundedIcon fontSize="small" />
            ) : (
              <VisibilityOffRoundedIcon fontSize="small" />
            )}
          </button>
        </div>
      </label>
      <br />
      <label className="text-headtxt dark:text-white">
        New Password:
        <div className="relative">
          <input
            type={newPasswordVisibility ? "text" : "password"}
            className="details"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={handleToggleNewPasswordVisibility}
          >
            {newPasswordVisibility ? (
              <VisibilityRoundedIcon fontSize="small" />
            ) : (
              <VisibilityOffRoundedIcon fontSize="small" />
            )}
          </button>
        </div>
      </label>
      <br />
      <div className="flex gap-4">
        <button
          className=" py-3 px-6 transition duration-300 hover:bg-primary bg-secondary text-white mt-4  font-bold rounded-lg focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Change Password
        </button>
        <span
          className="py-3 px-6 cursor-pointer flex justify-center items-center transition duration-300 bg-gray-500 hover:bg-gray-600  mt-4 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={() => setIsChangeForm(false)}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
