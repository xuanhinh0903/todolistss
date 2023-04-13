import AddData from "../components/addData";
import GetData from "../components/getData";
import "../App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { actionGetTodo } from "../action/actionTodo";
import { useNavigate } from "react-router-dom";

const TodoList = (props) => {
  const { check } = props;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const DATA = useSelector((state) => state?.todolistReducer);

  // useEffect(() => {
  //   dispatch(actionGetTodo());
  // }, []);

  useEffect(() => {
    if (DATA?.message?.message === "Request failed with status code 404") {
      toast.error("token expires");
      dispatch({ type: "CLEAR_DATA" });
      localStorage.removeItem("token");
      navigation("/login");
    }
  }, [DATA?.message?.message]);

  return (
    <>
      <ToastContainer />
      <div className="App">{check ? <GetData data={DATA} /> : <AddData />}</div>
    </>
  );
};

export default TodoList;
