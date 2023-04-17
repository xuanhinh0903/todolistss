import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../common/common";

const initalValue = {
  status: null,
  requesting: false,
  message: "",
};

export const actionLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: "CHECK_LOGIN_RESQUEST" });
    const response = await axios({
      method: "post",
      url: `${url}/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data,
    });

    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      toast.success("login success");
      dispatch({
        type: "CHECK_LOGIN_SUCCESS",
        status: response.status,
      });
    } else {
      toast.error("login error");
      dispatch({
        type: "CHECK_LOGIN_ERROR",
        message: "login error",
      });
    }
  } catch (error) {
    toast.error("login error");
    dispatch({
      type: "CHECK_LOGIN_ERROR",
      message: error,
    });
  }
};

const loginReducer = (state = initalValue, action) => {
  switch (action.type) {
    case "CHECK_LOGIN_RESQUEST":
      return {
        ...state,
        requesting: true,
      };
    case "CHECK_LOGIN_SUCCESS":
      return {
        ...state,
        requesting: false,
        status: action.status,
      };
    case "CHECK_LOGIN_ERROR":
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};

export default loginReducer;
