import React from "react";
import "./Signup.css";
import axios from "axios";
import Headingcomp from "./Headingcomp";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
const Signup = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();

    // ... (your existing frontend validation code)

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/register",
        Inputs
      );

      if (response.data.message === "User already exists") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        });
        history("/signin");
      }
    } catch (error) {
      // THIS IS THE CRUCIAL CHANGE:
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message); // Display the specific error message from the backend
      } else {
        alert("Registration failed. Please try again."); // Generic error for unexpected issues
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={change}
                value={Inputs.email}
              ></input>
              <input
                className="p-2 my-3 input-signup"
                type="username"
                name="username"
                placeholder="Enter your username"
                onChange={change}
                value={Inputs.username}
              ></input>
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={change}
                value={Inputs.password}
              ></input>
              <button className="btn-signup" onClick={submit}>
                Signup
              </button>
            </div>
          </div>
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center ">
            <Headingcomp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
