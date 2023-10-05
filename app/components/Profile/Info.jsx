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

export default function UserProfile() {
  const router = useRouter();
  const userDataCookie = Cookies.get("user_info");
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  if (!userData) {
    router.push("/login");
  }
  const [user, setUser] = useState(null);
  const [passVisOne, setPassVisOne] = useState(false);
  const [passVisTwo, setPassVisTwo] = useState(false);
  const [passVisThree, setPassVisThree] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordShowStyle = {
    WebkitTextSecurity: "none",
  };
  const passwordHideStyle = {
    WebkitTextSecurity: "disc",
  };
  const separateWords = (inputString) => {
    const wordsArray = inputString.match(/[A-Z][a-z]*/g);
    const resultString = wordsArray ? wordsArray.join(" ") : "";
    return resultString;
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
    setTextArea(JSON.parse(localStorage.getItem("user_data")).bio);
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

  // const separatedRole = separateWords(userData.role);

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

  return (
    <>
      <div className="font-bold text-2xl mb-4 ">
        <h2>Account</h2>
      </div>
      <div className="grid-2d ml-5 ">
        {/* Card 1 Start*/}
        <div className="details mx-auto   md:cols-2 border-b  rounded-lg shadow-lg p-8 w-1/2 p-6">
          <div className="flex-col">
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
            <div className="user-password ">
              <h4>Password</h4>
              <div className="details">
                <KeyRoundedIcon />
                <p style={passVisOne ? passwordShowStyle : passwordHideStyle}>
                  {"user.password"}`
                </p>
                <span onClick={() => setPassVisOne((prevState) => !prevState)}>
                  {passVisOne ? (
                    <VisibilityRoundedIcon />
                  ) : (
                    <VisibilityOffRoundedIcon />
                  )}
                </span>
              </div>
            </div>
            <div className="change-container">
              <button
                className="bg-primary text-white  mt-4 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                onClick={() => setChangePassword(true)}
              >
                Change Password
              </button>
              {changePassword && (
                <div>
                  <div>
                    <h4>New Password</h4>

                    <div
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      className="details"
                      style={
                        isNotMatch ? { borderBottom: "1px solid red" } : {}
                      }
                    >
                      <KeyRoundedIcon />
                      <p
                        className="new-password"
                        style={
                          passVisTwo ? passwordShowStyle : passwordHideStyle
                        }
                      ></p>
                      <span
                        onClick={() => setPassVisTwo((prevState) => !prevState)}
                      >
                        {passVisTwo ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4>Confirm Password</h4>
                    <div
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      className="details"
                      style={
                        isNotMatch ? { borderBottom: "1px solid red" } : {}
                      }
                    >
                      <KeyRoundedIcon />
                      <p
                        className="confirm-password"
                        style={
                          passVisThree ? passwordShowStyle : passwordHideStyle
                        }
                      ></p>
                      <span
                        onClick={() =>
                          setPassVisThree((prevState) => !prevState)
                        }
                      >
                        {passVisThree ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="card-buttons-container">
                    <button
                      onClick={() => {
                        saveHandler();
                      }}
                    >
                      {isLoading ? <Loading /> : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        cancleHandler();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Card 1 End*/}

        {/* Card 2 Start*/}
        <div className="details cols-1 border-b  rounded-lg shadow-lg p-8">
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
          <div className=" flex-col items-center">
            <h1 className="font-bold  text-3xl  mt-2">{userData.fullname}</h1>
            <div className="text-xl  mt-1">{userData.role}</div>
            <div className="bio">
              <h3>Bio</h3>
              <BorderColorRoundedIcon
                onClick={() => {
                  setIsEdit(true);
                }}
              />
            </div>
            {!isEdit && <div className="bio">{userData.bio}</div>}
            {isEdit && (
              <>
                <textarea
                  className=""
                  value={textArea}
                  name="textarea"
                  maxlength="300"
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
        {/* Card 2 End*/}
      </div>
    </>
  );
}
