import axios from "axios";

export const actionLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: "CHECK_LOGIN_RESQUEST" });
    const url = `https://fastapi-todos-be.onrender.com/token`;
    const response = await axios({
      method: "Post",
      url: url,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data,
    });

    response.data.access_token &&
      localStorage.setItem("token", response.data.access_token);
    dispatch({
      type: "CHECK_LOGIN_SUCCESS",
      status: response.status,
    });
  } catch (error) {
    dispatch({
      type: "CHECK_LOGIN_ERROR",
      message: error,
    });
  }
};

const initalValue = {
  status: null,
  requesting: false,
  message: "",
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
    case "CLEAR_LOGIN_SUCCESS":
      return {
        ...state,
        requesting: false,
        message: undefined,
      };
    case "CHECK_LOGIN_ERROR":
      return {
        ...state,
        message: action.message,
        status: null,
      };

    default:
      return state;
  }
};

export default loginReducer;
