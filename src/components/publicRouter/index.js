import TodoList from "../../pages/todo";
import DefaultLayout from "../defaultLayout/index";
import AddData from "../addData/";
import GetData from "../getData";

const PublicRouter = [
  { path: "/", component: TodoList },
  // { path: "/todolist", component: TodoList },
  { path: "/getData", component: GetData },
];

export default PublicRouter;
