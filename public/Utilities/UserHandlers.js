import Cookies from "js-cookie";
import axios from "axios";

export async function LoginHandler(formData, setIsLoading, router) {
  const url = "https://lms-j2h1.onrender.com";
  setIsLoading(true);
  const { email, password } = formData;
  const encodedData = btoa(`${email}:${password}`);

  try {
    const response = await axios({
      method: "POST",
      url: `${url}/signin`,
      headers: {
        authorization: `Basic ${encodedData}`,
      },
    });

    if (response.status === 200) {
      Cookies.set("user_token", response.data.token);

      let userObject = {};

      if (response.data.student) {
        userObject = {
          ...response.data.student,
          role: "student",
        };
      } else if (response.data.instructor) {
        userObject = {
          ...response.data.instructor,
          role: "instructor",
        };
      } else if (response.data.admin) {
        userObject = {
          ...response.data.admin,
          role: "admin",
        };
      }

      if (Object.keys(userObject).length > 0) {
        Cookies.set("user_info", JSON.stringify(userObject));
      }

      router.push("/");
    } else {
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Login failed:", error);
    setIsLoading(false);
  }
}


// "{
//   "id": 1,
//   "fullname": "malek",
//   "gender": "male",
//   "birth_date": "1970-01-01T00:00:36.806Z",
//   "phone_number": "789999999",
//   "image": null,
//   "department_id": null,
//   "bio": null,
//   "address": null,
//   "createdAt": "2023-10-04T13:35:55.423Z",
//   "updatedAt": "2023-10-04T13:35:55.423Z",
//   "userEmail": "ma@ma.com"
// }"