import axios from "axios";
import { url } from "../common/common";
import { toast } from "react-toastify";
import { CallToken } from "../common/common";

// add todo
export const actionAddTodo = (datas) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: `${url}/todos/`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${CallToken()}`,
      },
      data: datas,
    });

    if (response?.status === 200) {
      dispatch({
        type: "DATA_ADD_SUCCESS",
        transaction: response.data.transaction,
        data: datas,
      });
      toast.success("add todo successfully");
    } else {
      dispatch({
        type: "DATA_ERROR",
        message: "add data failed",
      });
      toast.error("add todo failed");
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      localStorage.removeItem("token");
      window.location.reload();
      toast.warning("please login again..");
    }
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
    toast.warning("Error! An error occurred. Please try again later");
  }
};

// delete todo
export const actionDeleteTodo = (datas) => async (dispatch) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${url}/todos/${datas.id}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${CallToken()}`,
      },
    });

    if (response?.status === 200) {
      dispatch({
        type: "DATA_DELETE",
        transaction: {
          status: response.data.transaction,
          deleteId: datas.id,
        },
      });
      toast.success("Delete todo successfully");
    } else {
      dispatch({
        type: "DATA_ERROR",
        message: "delete todo failed",
      });
      toast.error("Delete todo successfully");
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      // localStorage.removeItem("token");
      // window.location.reload();
      toast.warning("please login again..");
    }
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
    toast.warning("Error! An error occurred. Please try again later");
  }
};

// get todo
export const actionGetTodo = (data) => async (dispatch) => {
  try {
    dispatch({ type: "DATA_RESQUEST" });
    const response = await axios({
      method: "get",
      url: `${url}/todos/`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${CallToken()}`,
      },
    });

    if (response?.status === 200) {
      dispatch({
        type: "DATA_SUCCESS",
        list: response.data,
        status: response.status,
      });
    } else {
      dispatch({
        type: "DATA_ERROR",
        message: "get data error",
      });
      toast.error("get list todo error");
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      localStorage.removeItem("token");
      window.location.reload();
      toast.warning("please login again..");
    }
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
    toast.warning("Error! An error occurred. Please try again later");
  }
};

// update todo

export const actionUpdateTodo = (datas, id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "put",
      url: `${url}/todos/${id}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${CallToken()}`,
      },
      data: datas,
    });

    if (response?.status === 200) {
      dispatch({
        type: "DATA_UPDATE",
        payload: {
          status: response.data.transaction,
          updateId: id,
          data: datas,
        },
      });
      toast.success("update complete");
    } else {
      dispatch({
        type: "DATA_ERROR",
        message: "update data error",
      });
      toast.error("update todo error");
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      localStorage.removeItem("token");
      window.location.reload();
      toast.warning("please login again..");
    }
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
    toast.warning("Error! An error occurred. Please try again later");
  }
};
