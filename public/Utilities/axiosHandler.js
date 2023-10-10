import axios from "axios";
import Cookies from "js-cookie";

export async function axiosHandler(method,path,data){
    const url = "https://lms-j2h1.onrender.com" + path;
    const token = Cookies.get("user_token")
    const response = await axios({
        method: method,
        url: url,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: data,
      });
      return response
}

