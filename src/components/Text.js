import React from "react";
import { Link } from "react-router-dom";
import AllTexts from "./AllTexts";
import TextForm from "./TextForm";

const Text = ({ loginCheck }) => {
  return (
    <React.Fragment>
      {loginCheck ? (
        <React.Fragment>
          <TextForm/>
          
        </React.Fragment>
      ) : (
        <>
          <div className="ui message">
            <div className="header">Sayfa</div>
            <p>Lütfen Giriş yapınız.</p>
          </div>
          <Link className="ui brown button" to="/">Giriş Ekranına Dön</Link>
        </>
      )}
    </React.Fragment>
  );
};

export default Text;
