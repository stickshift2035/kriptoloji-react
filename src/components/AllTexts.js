import React, { useEffect, useState } from "react";
import { api } from "../api";
import Loading from "./Loading";

const AllTexts = () => {
  const [plainTexts, setPlainTexts] = useState();
  const [cipherTexts, setCipherTexts] = useState();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    api()
      .get("/text/getalltexts")
      .then((response) => {
        setLoading(false)
        setCipherTexts(response.data.cipherTexts);
        setPlainTexts(response.data.plainTexts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    loading ? <Loading/> :
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
