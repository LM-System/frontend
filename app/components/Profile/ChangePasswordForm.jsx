import { useState } from "react";

const ChangePasswordForm = ({ onSubmit }) => {
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
      <button
        className="w-60 bg-primary text-white  mt-4 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
