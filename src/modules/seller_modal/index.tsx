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

const SellerModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    const [file, setFile] = useState()
  
    function handleChange(event:any) {
      setFile(event.target.files[0])
    }
    const onSend = async () =>{
      if(file) {
      const jsonData = await xlsxToJSON(file);
      let i:number = 0;
      while(jsonData.length > i) {
        instance.post('/account/register',{
          name: jsonData[i].Nome,
          username:jsonData[i].Nome.replace(/\s/g, '').toLowerCase(),
          cpf: jsonData[i]["CPF"].replace(/[^[^\w\s]/gi, ''),
          password: '12345678',
        })
        .then(function(response){
          Swal.fire({
            title: 'Sucesso',
            text: `Vendedor cadastrado com sucesso!`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1750,
            timerProgressBar: true,
          })
          console.log("Seller added")
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
          console.log("Error adding new seller")
        });
        i++;
        }
      }
    }
      
  return (
    <Modal size={'xl'} show={isOpen} onClose={closeModal} dismissible>
      <Modal.Body className="flowbite-modal">
        <UploadCard handleChange={handleChange} onSend={onSend} closeModal={closeModal}/>
      </Modal.Body>
    </Modal>
  );
};

export default SellerModal;