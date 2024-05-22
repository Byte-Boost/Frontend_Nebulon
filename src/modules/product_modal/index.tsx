import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/requests/instance";
import xlsxToJSON from "@/scripts/dataUtils/xlsxToJSON";
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";


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
        let i:number = 0;
        while (jsonData.length > i) {
        instance.post('/products',{
          name: jsonData[i].Nome,
          description: jsonData[i]["Descrição"],
          percentage: jsonData[i]["Alíquota"],
          status: jsonData[i].Status,
        })
        .then(function(response){
          Swal.fire({
            title: 'Sucesso',
            text: `Produto cadastrado com sucesso!`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1750,
            timerProgressBar: true,
          })
          console.log("Product added")
          closeModal()
        })
        .catch(error => {
          Swal.fire({
            title: 'Oops!',
            text: `Algo de errado aconteceu :(`,
            icon: 'error',
            showConfirmButton: false,
            timer: 1750,
          });
          console.log("Error adding new product")
        });
        i++;
        };
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