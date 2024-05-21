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

const ClientModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    const [file, setFile] = useState()
  
    function handleChange(event:any) {
      setFile(event.target.files[0])
    }
    const onSend = async () =>{
        if(file) {
          const jsonData = await xlsxToJSON(file);
          let i = 0;
          while(jsonData.length > i) {
          instance.post('/clients',{
            tradingName: jsonData[i]["Nome Fantasia"],
            companyName: jsonData[i]["Razão Social"],
            cnpj: jsonData[i]["CNPJ"].replace(/[^\w\s]/gi, ''),
            segment: jsonData[i]["SEGMENTO"],
            contact: jsonData[i]["CONTATO"],
            status: jsonData[i]["STATUS"]
          })
          .then(function(response){
            Swal.fire({
              title: 'Sucesso',
              text: `Cliente cadastrado com sucesso!`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1750,
              timerProgressBar: true,
            })
            console.log("Client added")
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
            console.log("Error adding new Client")
          })
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

export default ClientModal;