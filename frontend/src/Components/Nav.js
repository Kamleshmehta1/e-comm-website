import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "./e-comm.gif";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img src={img} alt="" className="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Products</Link>
          </li> */}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logOut} to="/signup">
              Log out ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
