import TodoList from "../../pages/todo";
import GetData from "../getData";

const PublicRouter = [
  { path: "/", component: TodoList },
  { path: "/getData", component: GetData },
];

export default PublicRouter;
