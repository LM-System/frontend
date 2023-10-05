import Cookies from 'js-cookie'
import axios from 'axios'

export async function LoginHandler(formData, setIsLoading, router) {
  const url = "https://lms-j2h1.onrender.com";
  setIsLoading(true)
  const {email, password} = formData;
  const encodedData = btoa(`${email}:${password}`);
  const {data} = await axios({
    method: 'POST',
    url: url + '/signin',
    headers: {
      authorization: `Basic ${encodedData}`
    }
  });
  if(data.status === 200) {
      Cookies.set('user_token', data.token);
      // Cookies.set()
      router.push('/');
  }
  else {
    setIsLoading(false);
  }
}