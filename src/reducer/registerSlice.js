import axios from "axios";

export const actionRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: "CHECK_REGISTER_RESQUEST" });
    const url = `https://fastapi-todos-be.onrender.com/user`;
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        "content-type": "application/json",
      },
      data,
    });

    dispatch({
      type: "CHECK_REGISTER_SUCCESS",
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    dispatch({
      type: "CHECK_REGISTER_ERROR",
      message: error,
    });
  }
};

const initalValue = {
  status: null,
  requesting: false,
  message: "",
  data: {},
};

const registerReducer = (state = initalValue, action) => {
  switch (action.type) {
    case "CHECK_REGISTER_RESQUEST":
      return {
        ...state,
        requesting: true,
      };
    case "CHECK_REGISTER_SUCCESS":
      return {
        ...state,
        requesting: false,
        status: action.status,
      };
    case "CHECK_REGISTER_ERROR":
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};

export default registerReducer;
