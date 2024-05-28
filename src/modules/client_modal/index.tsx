import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/http-requests/instance";
import xlsxToJSON from "@/scripts/file-format-scripts/xlsxToJSON";
import { Modal } from "flowbite-react";
import { failureAlert, successAlert } from "@/scripts/utils/shared";


interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ClientModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
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
          await instance.post('/clients',{
            tradingName: jsonData[i]["Nome Fantasia"],
            companyName: jsonData[i]["Razão Social"],
            cnpj: jsonData[i]["CNPJ"].replace(/[^\w\s]/gi, ''),
            segment: jsonData[i]["SEGMENTO"],
            contact: jsonData[i]["CONTATO"],
            status: jsonData[i]["STATUS"]
          }).catch(()=>{throw new Error("Error adding new Client")})
          i++;
        };
        successAlert("Cliente cadastrado com sucesso!", "Client added", closeModal);
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

export default ClientModal;