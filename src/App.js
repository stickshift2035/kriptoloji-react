import { useEffect, useState } from "react";
import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import Text from "./components/Text";
import { ToastContainer } from "react-toastify";

function App() {
  
  const [loginCheck, setLoginCheck] = useState(false);

  return (
    <Router>
    <div className="main-wrapper">
      <header></header>
      <div className="ui raised very padded text container segment">
        <Routes>
          <Route path="/" element={<SignIn setLoginCheck={setLoginCheck} loginCheck={loginCheck}/>}></Route>
          <Route path="/text" element={<Text loginCheck={loginCheck}/>}></Route>
        </Routes>
      </div>
    </div>
    <ToastContainer />
  </Router>
  );
}

export default App;
