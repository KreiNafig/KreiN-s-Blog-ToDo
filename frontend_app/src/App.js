import {Routes, Route} from "react-router-dom"
import HeaderOutlet from "./pages/HeaderOutlet";
import "./index.css"
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Posts } from "./pages/Posts";
import {Todo} from './pages/Todo'
import { CreatePost } from "./pages/CreatePost";
import { Post } from "./pages/Post";
import { UpdatePost } from "./pages/UpdatePost";
import { Profile } from "./pages/Profile";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderOutlet />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<Todo />} />
          <Route path="posts" element={<Posts/>} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/:id/update" element={<UpdatePost />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
