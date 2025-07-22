import React from "react";
import "./Signup.css";
import Headingcomp from "./Headingcomp";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
const SignIn = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!Inputs.email || !Inputs.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/signin",
        Inputs
      );

      // Success case
      sessionStorage.setItem("id", response.data.user_id);
      console.log("ID stored in session:", sessionStorage.getItem("id"));
      dispatch(authActions.login());
      history("/todo");
    } catch (error) {
      // Handle errors (wrong password, user not found, etc.)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Sign in failed. Please try again.");
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center ">
            <Headingcomp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={Inputs.email}
                onChange={change}
              ></input>

              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={Inputs.password}
                onChange={change}
              ></input>

              <button className="btn-signup p-2" onClick={submit}>
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
