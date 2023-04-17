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
  const DATA = useSelector((state) => state?.todolistReducer);

  return (
    <>
      <ToastContainer />
      <div className="App">{check ? <GetData data={DATA} /> : <AddData />}</div>
    </>
  );
};

export default TodoList;
