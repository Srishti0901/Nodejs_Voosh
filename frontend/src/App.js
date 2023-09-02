import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GetOrder from "./pages/GetOrder";
import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.userSlice.userState);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {user && (
            <>
              <Route path="/" element={<Home />}></Route>
              <Route path="/getorder" element={<GetOrder />}></Route>
            </>
          )}
          {!user && (
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
