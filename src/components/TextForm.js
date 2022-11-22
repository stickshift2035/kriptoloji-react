import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api";
import AllTexts from "./AllTexts";
import Loading from "./Loading";

const TextForm = () => {
  const [plainText, setPlainText] = useState({ content: "", keyId: "" });
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (plainText.content === "") {
      setError("Plain Text alanı boş bırakılamaz!");
    } else {
      api()
        .post("/text/recordtext", plainText)
        .then((response) => {
          console.log(response);
          setPlainText({ content: "" });
          toast("Yazı Başarıyla Kaydedildi");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getLatestText = (event) => {
    event.preventDefault();
    api()
      .get("/text/gettext")
      .then((response) => {
        console.log(response);
        setText(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (event) => {
    setError("");
    setPlainText({
      ...plainText,
      content: event.target.value,
    });
  };
  const selectChange = (event) => {
    setPlainText({
      ...plainText,
      keyId: event.target.value,
    });
  };
  return (
    <>
      <div className="ui form">
        <div className="field">
          <label>Plain Text</label>
          <textarea
            name="content"
            placeholder="Please provide a plain text"
            value={plainText.content}
            onChange={handleChange}
          ></textarea>
          <p>{error}</p>
          <select onChange={selectChange} className="ui fluid dropdown">
            <option value="0">Anahtar 1</option>
            <option value="1">Anahtar 2</option>
          </select>
        </div>
        <button className="ui teal button" onClick={handleSubmit}>
          Kaydet
        </button>

        <div className="field">
          <label>Latest Text</label>
          <textarea rows="2" readOnly={true} value={text}></textarea>
        </div>
        <button className="ui blue button" onClick={getLatestText}>
          Getir
        </button>
        <AllTexts />
      </div>
    </>
  );
};

export default TextForm;
