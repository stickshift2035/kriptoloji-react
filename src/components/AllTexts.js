import React, { useEffect, useState } from "react";
import { api } from "../api";

const AllTexts = () => {
  const [plainTexts, setPlainTexts] = useState();
  const [cipherTexts, setCipherTexts] = useState();

  //   useEffect(() => {
  //     api()
  //       .get("/text/getalltexts")
  //       .then((response) => {
  //         setCipherTexts(response.data.cipherTexts);
  //         setPlainTexts(response.data.plainTexts);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  const getAllTexts = (event) => {
    event.preventDefault();
    api()
      .get("/text/getalltexts")
      .then((response) => {
        setCipherTexts(response.data.cipherTexts);
        setPlainTexts(response.data.plainTexts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <button className="ui black button" onClick={getAllTexts}>
        Bütün kayıtları göster
      </button>
      <div style={{ overflowX: "scroll" }}>
        <table className="ui very basic table">
          <thead className="">
            <tr className="">
              <th className="">Plain Text</th>
              <th className="">Cipher Text</th>
            </tr>
          </thead>
          {cipherTexts?.map((text, index) => (
            <tbody key={index} className="">
              <tr>
                <td>{plainTexts[index]}</td>
                <td>{text.content}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

export default AllTexts;
