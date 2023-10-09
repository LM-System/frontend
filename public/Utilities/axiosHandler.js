import axios from "axios";
import Cookies from "js-cookie";

export async function axiosHandler(method,path){
  // "https://lms-j2h1.onrender.com"
  // "http://localhost:4000"
    const url ="https://lms-j2h1.onrender.com" +path;
    const token = Cookies.get("user_token")
    const response = await axios({
        method: method,
        url: url,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response
}
// id | title |file|createdAt |updatedAt|courseId