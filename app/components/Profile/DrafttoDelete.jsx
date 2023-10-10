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

export default function UserProfile({ userId }) {
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {}, [user]);
  function cancleHandler() {
    document.querySelector(".new-password").textContent = "";
    document.querySelector(".confirm-password").textContent = "";
    setChangePassword(false);
    setPassVisTwo(false);
    setPassVisThree(false);
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  const separatedRole = separateWords(user.role);

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
    <div>
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="col pb-5">
          <div className=" ">
            <div className=" justify-center items-center">
              <Avatar
                style={{
                  width: "75px",
                  height: "75px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                sx={{ bgcolor: deepPurple[500] }}
              >
                {user.instructor.fullname.slice(0, 1)}
              </Avatar>
            </div>
            <h1 className="font-bold text-3xl text-center mt-2">
              {user.instructor.fullname}
            </h1>
            <div className="text-xl text-center mt-3">{separatedRole}</div>
          </div>
        </div>
        <div className="container text-gray-500 sm:text-lg dark:text-gray-400 dark:border-gray-700  mx-auto my-8  ">
          <div className="w-1/2 p-6 ">
            <div className=" border-b  rounded-lg shadow-lg p-8">
              <div className="user-email">
                <h4>Email</h4>
                <div className="details">
                  <AlternateEmailRoundedIcon />
                  <p>{`${user.email}`}</p>
                </div>
              </div>

              <div className="user-password ">
                <h4>Password</h4>
                <div className="details">
                  <KeyRoundedIcon />
                  <p
                    style={passVisOne ? passwordShowStyle : passwordHideStyle}
                  >{`${user.password}`}</p>
                  <span
                    onClick={() => setPassVisOne((prevState) => !prevState)}
                  >
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
                          onClick={() =>
                            setPassVisTwo((prevState) => !prevState)
                          }
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
                    <div className="account-buttons-container">
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
          <div className="w-1/2 p-6">
            <div className="border-b text-gray-500 sm:text-lg dark:text-gray-400 dark:border-gray-700 rounded-lg shadow-lg p-8">
              <div className="user-gender">
                <h4>Gender</h4>
                <div className="details">
                  {user.instructor.gender === "male" ? (
                    <MaleRoundedIcon />
                  ) : (
                    <FemaleRoundedIcon />
                  )}
                  <p>{user.instructor.gender}</p>
                </div>
              </div>
              <div className="user-birthDate">
                <h4>Birth date</h4>
                <div className="details">
                  <CalendarTodayIcon />
                  <p>{`${user.instructor.birth_date.slice(0, 10)}`}</p>
                </div>
              </div>
              <div className="user-birthDate">
                <h4>Phone Number</h4>
                <div className="details">
                  <SmartphoneIcon />
                  <p>{`0${user.instructor.phone_number}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
