import { useState } from "react";

const ChangePasswordForm = ({ onSubmit, setIsChangeForm }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ oldPassword, newPassword });
  };

  return (
    <form className=" flex flex-col" onSubmit={handleSubmit}>
      <label>
        Old Password:
        <input
          className="details"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        New Password:
        <input
          type="password"
          className="details"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
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
