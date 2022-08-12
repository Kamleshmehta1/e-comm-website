import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="login">
      <h1>Log in</h1>
      <input
        className="inputBox"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter E-mail"
      />
      <input
        className="inputBox"
        type="password"
        onChange={(e) => setPass(e.target.value)}
        placeholder="EnterPassword"
      />
      <button className="appButton" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
