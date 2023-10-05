import Cookies from "js-cookie";
import axios from "axios";

export async function LoginHandler(formData, setIsLoading, router) {
  const url = "https://lms-j2h1.onrender.com";
  setIsLoading(true);
  const { email, password } = formData;
  const encodedData = btoa(`${email}:${password}`);
  const response = await axios({
    method: "POST",
    url: url + "/signin",
    headers: {
      authorization: `Basic ${encodedData}`,
    },
  });
  console.log(response);
  if (response.status === 200) {
    Cookies.set("user_token", response.data.token);
    if (response.data.student) Cookies.set("user_info",  JSON.stringify(response.data.student));
    if (response.data.instructor)
      Cookies.set("user_info", JSON.stringify(response.data.instructor));
    if (response.data.admin) Cookies.set("user_info", JSON.stringify(response.data.admin));

    // Cookies.set()
    router.push("/");
  } else {
    setIsLoading(false);
  }
}
