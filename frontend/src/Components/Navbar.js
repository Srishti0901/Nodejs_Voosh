import React from "react";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../services/apiSlice";
import { logoutState } from "../services/userSlice";

function Navbar() {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await logout();
    dispatch(logoutState({ ...res }));
    navigate("/login");
  };
  const user = useSelector((state) => state.userSlice.userState);
  // console.log(user);
  return (
    <>
      <div className="nav">
        <h2>
          <NavLink className="head" to="/">
            Voosh
          </NavLink>
        </h2>
        <div className="link">
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}

          {user && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </>
  );
}

export default Navbar;
