import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, SetName] = useState("");
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  });

  const CollectData = async () => {
    console.log(name, email, password);
    if (!name || !email || !password) {
      alert("Kindly insert data");
      return false;
    }
    const result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result1 = await result.json();
    console.log(result1);
    localStorage.setItem("user", JSON.stringify(result1.result1));
    localStorage.setItem("token", JSON.stringify(result1.auth));
    if (result1) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <label htmlFor=""></label>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => SetName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter E-mail"
      />
      <input
        className="inputBox"
        type="Password"
        value={password}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Enter Password"
      />
      <button className="appButton" onClick={CollectData}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
