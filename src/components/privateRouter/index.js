import Login from "../login/login";
import Page404 from "../page404";
import Register from "../register/register";

const PrivateRouter = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "*", component: Page404 },
];

export default PrivateRouter;
