"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Loading from "../Loading/Loading";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ChangePasswordForm from "@/app/components/Profile/ChangePasswordForm";

export default function UserProfile() {
  const router = useRouter();
  const userDataCookie = Cookies.get("user_info");
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  if (!userData) {
    router.push("/login");
  }
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [passVisOne, setPassVisOne] = useState(false);
  const [passVisTwo, setPassVisTwo] = useState(false);
  const [passVisThree, setPassVisThree] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const passwordShowStyle = {
    WebkitTextSecurity: "none",
  };
  const passwordHideStyle = {
    WebkitTextSecurity: "disc",
  };
  console.log(userData);
  const [isEdit, setIsEdit] = useState(false);
  const [textArea, setTextArea] = useState(userData.bio);
  function changeHandler(event) {
    setTextArea((prevText) => event.target.value);
  }

  async function saveHandlerBio() {
    setIsLoading(true);
    const user = userData;
    const body = { ...user, bio: textArea };
    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}userinformtion/${user.id}`,
      body
    );
    localStorage.setItem("user_data", JSON.stringify(body));
    setIsEdit(false);
    setIsLoading(false);
  }

  function cancleHandlerBio() {
    setTextArea(userData.bio);
    setIsEdit(false);
  }

  useEffect(() => {}, [user]);
  function cancleHandler() {
    document.querySelector(".new-password").textContent = "";
    document.querySelector(".confirm-password").textContent = "";
    setChangePassword(false);
    setPassVisTwo(false);
    setPassVisThree(false);
  }

  async function saveHandler() {
    setIsLoading(true);

    const newPassword = document.querySelector(".new-password").textContent;
    const confirmPassword =
      document.querySelector(".confirm-password").textContent;

    if (newPassword === confirmPassword) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}users/${userId}/change-password`,
          { password: newPassword }
        );

        const updatedUser = response.data;

        localStorage.setItem("user_data", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsNotMatch(false);
        setIsLoading(false);
        cancleHandler();
      } catch (error) {
        console.error("Error updating password:", error);
        setIsNotMatch(true);
        setIsLoading(false);
      }
    } else {
      setIsNotMatch(true);
      setIsLoading(false);
    }
  }

  const handleChangePassword = async ({ oldPassword, newPassword }) => {
    try {
      const response = await fetch(
        "https://lms-j2h1.onrender.com/changepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.userEmail,
            oldPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Error: Something went wrong");
    }
  };

  return (
    <>
      <div className="font-bold text-2xl mb-4 ">
        <h2>Account</h2>
      </div>
      <div className="grid-2d ml-5 ">
        {/* Card 1 Start*/}
        <div className="details mx-auto p-4  md:col-span-2 border-b  rounded-lg shadow-lg p-8 w-1/2 p-6">
          <div className="flex flex-col w-full p-4 gap-4 font-bold">
            <div className="user-email ">
              <h4>Email</h4>
              <div className="details">
                <AlternateEmailRoundedIcon />
                <p>{userData.userEmail}</p>
              </div>
            </div>
            <div className="user-gender">
              <h4>Gender</h4>
              <div className="details">
                {userData.gender === "male" ? (
                  <MaleRoundedIcon />
                ) : (
                  <FemaleRoundedIcon />
                )}
                <p>{userData.gender}</p>
              </div>
            </div>
            <div className="user-birthDate">
              <h4>Birth date</h4>
              <div className="details">
                <CalendarTodayIcon />
                <p>{`${userData.birth_date.slice(0, 10)}`}</p>
              </div>
            </div>
            <div className="user-phoneNumber">
              <h4>Phone Number</h4>
              <div className="details">
                <SmartphoneIcon />
                <p>{`0${userData.phone_number}`}</p>
              </div>
            </div>
            <div>
              <h1>Change Password</h1>
              <ChangePasswordForm onSubmit={handleChangePassword} />
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
        {/* Card 1 End*/}

        {/* Card 2 Start*/}
        <div className="  gap-5 bg-[#99999910]   cols-1 border-b rounded-lg shadow-lg ">
          <div className="flex p-2.5 mr-10 avatar-and-details  ">
            <Avatar
              style={{
                width: "75px",
                height: "75px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              sx={{ bgcolor: deepPurple[500] }}
            >
              {userData.fullname.slice(0, 1)}
            </Avatar>
            <div className="flex-col items-center ml-2">
              <h1 className="font-bold text-3xl">
                {capitalizeFirstLetter(userData.fullname)}
              </h1>
              <div className="text-xl mt-1">
                {capitalizeFirstLetter(userData.role)}
              </div>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <h3 className="">Bio</h3>
            <BorderColorRoundedIcon
              className=" justify-end"
              onClick={() => {
                setIsEdit(true);
              }}
            />
            {!isEdit && <div className="bio">{userData.bio}</div>}
            {isEdit && (
              <>
                <textarea
                  className=""
                  value={textArea}
                  name="textarea"
                  maxLength="300"
                  onChange={(event) => {
                    changeHandler(event);
                  }}
                ></textarea>
                <div className="card-buttons-container">
                  <button
                    onClick={() => {
                      saveHandlerBio();
                    }}
                  >
                    {isLoading ? <Loading /> : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      cancleHandlerBio();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card 2 End*/}
    </>
  );
}
