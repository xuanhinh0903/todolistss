import axios from "axios";

// add todo
export const actionAddTodo = (datas) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    // dispatch({ type: "DATA_RESQUEST" });
    const url = `https://fastapi-todos-be.onrender.com/todos`;
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: datas,
    });

    dispatch({
      type: "DATA_ADD_SUCCESS",
      transaction: response.data.transaction,
      data: datas,
    });
  } catch (error) {
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
  }
};

// delete todo

export const actionDeleteTodo = (datas) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    // dispatch({ type: "DATA_RESQUEST" });
    const url = `https://fastapi-todos-be.onrender.com/todos/${datas.id}`;
    const response = await axios({
      method: "delete",
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "DATA_DELETE",
      transaction: {
        status: response.data.transaction,
        deleteId: datas.id,
      },
    });
  } catch (error) {
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
  }
};

// get todo
export const actionGetTodo = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "DATA_RESQUEST" });
    const url = `https://fastapi-todos-be.onrender.com/todos`;
    const response = await axios({
      method: "get",
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "DATA_SUCCESS",
      list: response.data,
      status: response.status,
    });
  } catch (error) {
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
  }
};

// update todo

export const actionUpdateTodo = (datas, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    // dispatch({ type: "DATA_RESQUEST" });
    const url = `https://fastapi-todos-be.onrender.com/todos/${id}`;
    const response = await axios({
      method: "put",
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: datas,
    });

    dispatch({
      type: "DATA_UPDATE",
      payload: {
        status: response.data.transaction,
        updateId: id,
        data: datas,
      },
    });
  } catch (error) {
    dispatch({
      type: "DATA_ERROR",
      message: error,
    });
  }
};
