import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let config = {
  position: "top-center",
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "light",
  hideProgressBar: false,
  newestOnTop: true,
  rtl: false,
};

export const notifySuccess = (message) => toast.success(message, config);

export const notifyError = (message) => toast.error(message, config);

export const notifyWarn = (message) => toast.warn(message, config);

export const notifyInfo = (message) => toast.info(message, config);

export const Notify = () => {
  return <ToastContainer draggable stacked pauseOnFocusLoss />;
};
