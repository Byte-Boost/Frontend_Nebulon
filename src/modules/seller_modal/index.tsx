import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/requests/instance";
import xlsxToJSON from "@/scripts/dataUtils/xlsxToJSON";
import { Modal } from "flowbite-react";
import { failureAlert, successAlert } from "@/scripts/utils/shared";


interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const SellerModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
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
          await instance.post('/account/register',{
            name: jsonData[i].Nome,
            username:jsonData[i].Nome.replace(/\s/g, '').toLowerCase(),
            cpf: jsonData[i]["CPF"].replace(/[^[^\w\s]/gi, ''),
            password: '12345678',
          }).catch(()=>{throw new Error("Error adding new Seller")})
          i++;
        };
        successAlert("Vendedor cadastrado com sucesso!", "Seller added", closeModal);
      } catch (err: any){
        failureAlert(err.message)
      }
    }
  }
      
  return (
    <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30" size={"lg"}>
      <Modal.Body>
        <UploadCard handleChange={handleChange} onSend={onSend} closeModal={closeModal}/>
      </Modal.Body>
    </Modal>
  );
};

export default SellerModal;