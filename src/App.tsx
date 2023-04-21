import "./App.css";
// import Home from "./pages/Home";
import ContextWrapper from "./ContextWrapper";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <ContextWrapper>
      {/* <div className="App">
        <p>Hello World</p>
        <Home />
      </div> */}
      <Routes>
        <Route path="/job" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ContextWrapper>
  );
}

export default App;
