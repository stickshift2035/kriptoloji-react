import React, { useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { toast } from "react-toastify";

const VerifyModal = ({modalOpen, setLoginCheck, nonce}) => {

  const [open, setOpen] = useState(modalOpen);
  const [hata, setHata] = useState("");
  const show = () => setOpen(true);
  const close = () => setOpen(false);
  const [verifyNonce, setVerifyNonce] = useState();


  let navigate = useNavigate()

  const handleChange = (e) => {
    setVerifyNonce(e.target.value)
  }
  const handleCommitNonce = () => {
    if(nonce === verifyNonce){
      navigate("/text")
      setOpen(false)
      setLoginCheck(true)
      toast("Giriş Başarılı")
    }
    else{
      setOpen(false)
      setLoginCheck(false)
      toast("Onay Kodu Hatalı")
    }
    // api()
    //   .post(`/auth/verifysign`,nonce)
    //   .then(() => {
    //     // setLoginCheck(true);
    //     // toast("Giriş Başarılı");
    //     setHata("")
    //     close();
    //     navigate("/text")
    //   })
    //   .catch(() => {setHata("Onay kodu hatalı!")});
  };

  console.log(verifyNonce, nonce)
  return (
    <React.Fragment>
      
      <Modal size="mini" open={open} onClose={close}>
        <Modal.Header>Onay Kodu</Modal.Header>
        <Modal.Content>
        <div className="ui input focus">
            <input onChange={handleChange} type="text" placeholder="Onay Kodu..."/>
        </div>
          {hata && <p>{hata}</p>}
        </Modal.Content>
        <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='cancel' /> No
        </Button>      
          <Button
            positive
            icon="chevron right"
            labelPosition="right"
            content="Gönder"
            onClick={handleCommitNonce}
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default VerifyModal;
