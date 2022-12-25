import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../api";
import Loading from "./Loading";
import VerifyModal from "./VerifyModal";

const USER_INFO = {
  name: "",
  password: "",
};

const SignIn = ({ setLoginCheck }) => {
  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(USER_INFO);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nonce, setNonce] = useState("");

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  // useEffect(() => {
  //   const getNonce = async () => {
  //    await axios
  //     .post("http://localhost:5000/auth/sign")
  //     .then((res) => {
  //       setNonce(res.data.nonce);
  //     })
  //     .catch((err) => console.error(err));
  //   }
  //   getNonce()
  // },[firstStep])

  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    api()
      .post("/auth/login", userInfo)
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          setLoginCheck(true);
          navigate("/text")
          toast("Giriş Başarılı")
        } else {
          setLoading(false);
          setLoginCheck(false);
          console.log(response.data.message);
          toast(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const onFormSubmitt = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   let response = await api().post("/auth/login", userInfo);
  //   if (response.data.success) {
  //     let res = await api().post("/auth/sign",{});
  //     setNonce(res.data.hashDigest);
  //     alert(res.data.hashDigest);
  //     setModalOpen(true);
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     setLoginCheck(false);

  //     console.log(response.data.message);
  //     toast(response.data.message);
  //   }
  // };

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <VerifyModal
        setLoginCheck={setLoginCheck}
        nonce={nonce}
        modalOpen={modalOpen}
      />
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
    </>
  );
};

export default SignIn;
