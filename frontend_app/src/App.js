import {Routes, Route} from "react-router-dom"
import HeaderOutlet from "./pages/HeaderOutlet";
import "./index.css"
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderOutlet />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
