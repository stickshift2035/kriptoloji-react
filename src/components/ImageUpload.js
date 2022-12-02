import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../api";

const ImageUpload = () => {
  const [image, setImage] = useState("");

  useEffect(() => {


  },[])
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleApi = () => {
    const formData = new FormData();
    formData.append("profile_image", image);
    axios
      .post("http://localhost:5000/auth/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <input type="file" name="file" onChange={handleImage} />
      <button onClick={handleApi}>Submit</button>
      <div>
        <img style={{height: "144px", width: "192px"}}src="http://localhost:5000/uploads/profile_image.jpeg"/>
      </div>
    </div>
  );
};

export default ImageUpload;
