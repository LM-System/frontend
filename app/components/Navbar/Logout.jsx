import React from "react";
import Link from "next/link";
import Option from "./Option";
import icons from "@/public/icons.jsx";
import Cookies from "js-cookie";

export default function Logout({ route }) {
  function clearAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  return (
    <div onClick={clearAllCookies}>
      <Option route={route} title="logout" type="logout" className="logout" />
    </div>
  );
}
