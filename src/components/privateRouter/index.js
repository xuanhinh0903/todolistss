import Login from "../login/login";
import Register from "../register/register";

const PrivateRouter = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export default PrivateRouter;
