import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastifyOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}
const showToastify = (action) => {
  const msg = `${action.charAt(0).toUpperCase() + action.slice(1)} successfully`
  switch(true) {
    case (action === "added"):
      toast.success(msg, toastifyOptions)
      break;
    case (action === "updated"):
      toast.info(msg, toastifyOptions);
      break;
    case (action === "deleted"):
      toast.error(msg, toastifyOptions);
      break;
    default:
      toast.error('Error Occured', toastifyOptions)
      break;
  }
}

export default showToastify;