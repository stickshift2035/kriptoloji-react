import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../api";

const ImageUpload = () => {
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleApi = () => {
    const formData = new FormData();
    formData.append("profile_image", image);
    api()
      .post("/auth/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <input type="file" className="" name="file" onChange={handleImage}/>
      <div>
        <img
          style={{
            height: "144px",
            width: "auto",
            padding: "15px",
            borderRadius: "50%",
          }}
          src="https://kriptoloji-api-ege.onrender.com/uploads/profile_image.jpeg"
          alt="profile_image"
        />
      </div>
      <div>
        <button onClick={handleApi} className="ui animated button">
          <div className="visible content">Yükle</div>
          <div className="hidden content">
            <i aria-hidden="true" className="arrow right icon"></i>
          </div>
        </button>
        
      </div>
    </div>
  );
};

export default ImageUpload;
