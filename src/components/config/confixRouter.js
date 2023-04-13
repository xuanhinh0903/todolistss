import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRouter = (props) => {
  const tokenLocal = window.localStorage.getItem("token");
  return tokenLocal ? <Navigate to={"/"} /> : <props.component />;
};

export const PublicRouter = (props) => {
  const tokenLocal = window.localStorage.getItem("token");
  return tokenLocal ? <props.component /> : <Navigate to={"/login"} />;
};
