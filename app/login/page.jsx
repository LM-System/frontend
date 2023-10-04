'use client';
import Image from "next/image";
import base64 from "base-64";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validEmail, setValidEmail] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [isloading, setIsloading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    isValidEmail(email);
    if (isValidEmail(email)) {
      setIsloading(true);
      // let basicAuth =base64.encode(`${email}:${password}`)
      // const user = await axios.post(`${URL}/signin`,{headers: { 'Authorization': + basicAuth }})
      // localStorage.setItem('user',user)
      // props.setUser(user)
    }
  }
  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setValidEmail(false);
      return false;
    } else {
      setValidEmail(true);
      return true;
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-300 h-screen w-screen  overflow-hidden">
      <div className="w-screen h-screen overflow-hidden absolute ">
        {/* <Image
          src={bgBot}
          alt="bgbot"
          className="absolute -bottom-96 -right-80 overflow-hidden"
        />
        <Image
          src={bgTop}
          alt="bgtop"
          className="absolute -left-80 -top-96 overflow-hidden"
        /> */}
      </div>
      <div className="h-4/6 w-5/6 max-w-screen-lg flex bg-white rounded-3xl overflow-hidden z-10 shadow-xl bg-opacity-70">
        <div className=" w-7/12 min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80"
            alt="image"
            width={500}
            height={600}
            className="contrast-150 h-full w-full"
          />
        </div>
        <div className=" w-5/12 min-h-full bg-opacity-20">
          <h2 className="font-bold m-10 mt-20 text-3xl text-center ">
            Sign in
          </h2>
          <form onSubmit={submitHandler} className="grid gap-8 p-8 mt-16">
            <div className="relative pb-1">
              <input
                id="email"
                onChange={changeHandler}
                name="email"
                type="text"
                className={` w-full border-b-2 border-gray-500 bg-inherit  peer placeholder-transparent h-10  text-gray-900 focus:outline-none focus:borer-rose-600 ${
                  validEmail ? "" : " border-red-700"
                }`}
                placeholder="Email address"
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm -z-10">
                Email Address
              </label>
              {!validEmail && (
                <p className="text-red-600 font-semibold text-xs">
                  write a valid email
                </p>
              )}
            </div>
            <div className="relative pb-5">
              <input
                id="password"
                onChange={changeHandler}
                name="password"
                type={passwordType}
                className={`bg-inherit peer placeholder-transparent h-10 w-full border-b-2 border-gray-500  text-gray-900 focus:outline-none focus:borer-rose-600`}
                placeholder="Password"
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm -z-10">
                Password
              </label>
              {passwordType == "text" && (
                <AiFillEye
                  onClick={() => {
                    setPasswordType("password");
                  }}
                  className="absolute right-1 top-4 text-xl cursor-pointer"
                />
              )}
              {passwordType == "password" && (
                <AiFillEyeInvisible
                  onClick={() => {
                    setPasswordType("text");
                  }}
                  className="absolute right-1 top-4 text-xl cursor-pointer"
                />
              )}
              {/* {!validPassword && (
                <p className="text-red-600 font-semibold text-xs">
                  password should be 8 char and contain at least capital and
                  number
                </p>
              )} */}
            </div>
            <a href="" className="underline float-right block text-right pr-3">
              Forget password?
            </a>
            <button className="p-1 font-semibold rounded-xl bg-cyan-700 text-lg text-white mt-8 ">
              {isloading && (
                <CircularProgress
                  sx={{
                    color: (theme) =>
                      theme.palette.grey[
                        theme.palette.mode === "light" ? 200 : 800
                      ],
                  }}
                  thickness={7}
                  className="p-1"
                />
              )}
              {!isloading && <span className="p-3">Log in</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
