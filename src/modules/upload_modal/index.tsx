import React, { useState } from "react";

import UploadCard from "../upload_card";
import xlsxToJSON from "@/scripts/file-format-scripts/xlsxToJSON";
import { Modal } from "flowbite-react";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { ModalProps } from "@/models/models";

const UploadModal: React.FC<ModalProps> = ({ isOpen, closeModal, postSequence, success }) => {
  const [file, setFile] = useState()

  function handleChange(event:any) {
    setFile(event.target.files[0])
  }
  const onSend = async () =>{
    if(file) {
      const jsonData = await xlsxToJSON(file);
      let i = 0;
      try{
        while(jsonData.length > i) {
          postSequence(jsonData[i])
          i++;
        };
        successAlert(success.msg, success.log, closeModal);
      } catch (err: any){
        failureAlert(err.message)
      }
    }
  }
      
  return (
    <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30 grid place-content-center" size={"lg"}>
      <Modal.Body>
        <UploadCard handleChange={handleChange} onSend={onSend} closeModal={closeModal}/>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;