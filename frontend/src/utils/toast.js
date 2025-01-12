import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const success = (message) => {
  toast.success(message, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

const error = (message) => {
  toast.error(message, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export { success };
