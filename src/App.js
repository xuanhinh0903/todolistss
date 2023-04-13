import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRouter from "./components/privateRouter/index";
import Login from "./components/login/login";
import Register from "./components/register/register";
import TodoList from "./pages/todo";
import { Route, Routes } from "react-router-dom";
import PublicRouter from "./components/publicRouter";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./components/defaultLayout";
import { useState } from "react";

const App = () => {
  const [check, setCheck] = useState(false);
  const setCheckTrue = () => {
    setCheck(true);
  };
  const setCheckFalse = () => {
    setCheck(false);
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        {PrivateRouter.map((router, index) => {
          return (
            <Route
              key={index}
              path={router.path}
              element={<router.component />}
            />
          );
        })}
        {PublicRouter.map((router, index) => {
          return (
            <Route
              path={router.path}
              key={index}
              element={
                <ProtectedRoute>
                  <DefaultLayout
                    setCheckTrue={setCheckTrue}
                    setCheckFalse={setCheckFalse}
                    check={check}
                  >
                    <router.component check={check}/>
                  </DefaultLayout>
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
