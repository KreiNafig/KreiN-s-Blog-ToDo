import {Routes, Route} from "react-router-dom"
import "./index.css"
import { lazy, Suspense } from "react";
import { User } from "./pages/User";
import { PrivateRoute } from "./features/private/PrivateRoute";


const HeaderOutlet = lazy(() => import("./pages/HeaderOutlet"))
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Posts = lazy(() => import("./pages/Posts"))
const Todo = lazy(() => import("./pages/Todo"))
const CreatePost = lazy(() => import("./pages/CreatePost"))
const Post = lazy(() => import("./pages/Post"))
const UpdatePost = lazy(() => import("./pages/UpdatePost"))
const Profile = lazy(() => import("./pages/Profile"))
const Error = lazy(() => import("./pages/Error"))

function App() {

  return (
    <>
    <Suspense fallback={<h1>Загрузка страницы...</h1>}>
      <Routes>
        <Route path="/" element={<HeaderOutlet />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<PrivateRoute><Todo /></PrivateRoute>} />
          <Route path="posts" element={<Posts/>} />
          <Route path="/posts/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/posts/:id" element={<PrivateRoute><Post /></PrivateRoute>} />
          <Route path="/posts/:id/update" element={<PrivateRoute><UpdatePost /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/profile/:id" element={<User />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
