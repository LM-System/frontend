"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
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
  const [userData, setUserData] = useState(
    userDataCookie ? JSON.parse(userDataCookie) : null
  );
  const token = Cookies.get("user_token");
  if (!userData) {
    router.push("/login");
  }
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeForm, setIsChangeForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [textArea, setTextArea] = useState(userData.bio);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  console.log(userData);

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  function changeHandler(event) {
    setTextArea((prevText) => event.target.value);
  }

  const handleBioUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://lms-j2h1.onrender.com/update${userData.role.toLowerCase()}/${
          userData.id
        }`,
        { bio: textArea },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showMessage("Bio updated successfully");
      } else {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      showMessage("Error: Something went wrong");
    } finally {
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  function cancleHandlerBio() {
    setTextArea(userData.bio);
    setIsEdit(false);
  }

  const handleChangePassword = async ({ oldPassword, newPassword }) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://lms-j2h1.onrender.com/changepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.userEmail,
            oldPassword,
            newPassword,
          }),
        }
      );

      if (response.status === 200) {
        showMessage("Password updated successfully");
      } else {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      showMessage("Error: Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      bio: textArea,
    }));
    Cookies.set("user_info", JSON.stringify(userData));

    console.log(userData);
  }, [textArea]);

  return (
    <>
      <div className="font-bold text-2xl mb-4 ">
        <h2>Account</h2>
      </div>
      <div className="grid-2d ml-5 ">
        {/* Card 1 Start*/}
        <div className="details mx-auto p-4 md:col-span-2 rounded-lg shadow-lg w-1/2">
        <div className="details mx-auto p-4 md:col-span-2 rounded-lg shadow-lg w-1/2 ">
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

            <div className="flex flex-col gap-2">
              <span
                className="text-primary cursor-pointer dark:text-gray-400"
                onClick={() => setIsChangeForm(true)}
              >
                Change Password
              </span>
              {isChangeForm && (
                <ChangePasswordForm
                  setIsChangeForm={setIsChangeForm}
                  onSubmit={handleChangePassword}
                />
              )}
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
        {/* Card 1 End*/}

        {/* Card 2 Start*/}
        <div className="flex flex-col gap-4 bg-[#99999910] p-4 cols-1 rounded-lg shadow-lg">
          <div className="flex mr-10 avatar-and-details gap-4 ">
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
            <div className="flex-col items-center ">
              <h1 className="font-bold text-2xl">
                {capitalizeFirstLetter(userData.fullname)}
              </h1>
              <div className="text-xl mt-1">
                {capitalizeFirstLetter(userData.role)}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between w-full">
              <h3 className="font-bold">Bio</h3>
              <BorderColorRoundedIcon
                className="cursor-pointer"
                onClick={() => {
                  setIsEdit(true);
                }}
              />
            </div>
            {!isEdit && <div className="bio mt-2  text-lg">{userData.bio}</div>}
            {isEdit && (
              <>
                <textarea
                  className="rounded-lg"
                  value={textArea}
                  name="textarea"
                  rows="10"
                  maxLength="300"
                  rows="10"
                  onChange={(event) => {
                    changeHandler(event);
                  }}
                ></textarea>
                <div className="card-buttons-container">
                  <button
                    onClick={() => {
                      handleBioUpdate();
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
