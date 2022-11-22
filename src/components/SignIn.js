import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api";
import Loading from "./Loading";

const USER_INFO = {
  name: "",
  password: "",
};

const SignIn = ({ setLoginCheck, loginCheck }) => {
  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(USER_INFO);
  const [validation, setValidation] = useState({ name: "", password: "" });

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    api()
      .post("/auth/login", userInfo)
      .then((response) => {
        if (response.data.success) {
          setLoginCheck(true);
          navigate("/text");
          toast("Giriş Başarılı");
        } else {
          setLoginCheck(false);
          console.log(response.data.message);
          toast(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    loginCheck === false ? <Loading/> :
    <div className="ui form">
      <div className="field">
        <label>User Name</label>
        <input
          name="name"
          onChange={handleChange}
          value={userInfo.name}
          type="text"
          placeholder="User Name"
        />
      </div>

      <div className="field">
        <label>Password</label>
        <input
          name="password"
          onChange={handleChange}
          value={userInfo.password}
          type="password"
          placeholder="Password"
        />
      </div>

      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" name="terms" readOnly="" tabIndex="0" />
          <label>I agree to the Terms and Conditions</label>
        </div>
      </div>
      <button className="ui primary button" onClick={onFormSubmit}>
        Gönder
      </button>
    </div>
  );
};

export default SignIn;
