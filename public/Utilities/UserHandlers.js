import Cookies from "js-cookie";
import axios from "axios";

export async function LoginHandler(formData, setIsLoading) {
  const url = "http://localhost:4000";
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
    console.log(response.data);
    if (response.status === 200) {
      Cookies.set("user_token", response.data.token);
      let userObject = {};

      if (response.data.student) {
        userObject = {
          ...response.data.student,
          role: "student",
        };
      } else if (response.data.role == "instructor") {
        userObject = {
          ...response.data.instructor,
          role: "instructor",
        };
      } else if (response.data.role == "admin") {
        userObject = {
          ...response.data.admin,
          role: "admin",
        };
      } else if (response.data.role == "superAdmin") {
        userObject = {
          ...response.data.admin,
          role: "superAdmin",
        };
      } else if (response.data.role == "instructorDepartmentHead") {
        userObject = {
          ...response.data.instructor,
          role: "instructorDepartmentHead",
        };
      }

      if (Object.keys(userObject).length > 0) {
        Cookies.set("user_info", JSON.stringify(userObject));
      }
    } else {
      setIsLoading(false);
    }
    return response;
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
