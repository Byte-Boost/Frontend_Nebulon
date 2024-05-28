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

const ProductModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
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
          await instance.post('/products',{
            name: jsonData[i].Nome,
            description: jsonData[i]["Descrição"],
            status: jsonData[i].Status,
          }).catch(()=>{throw new Error("Error adding new Product")})
          i++;
        };
        successAlert("Produto cadastrado com sucesso!", "Product added", closeModal);
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

export default ProductModal;