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

const CommissionModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    const [file, setFile] = useState()
  
    function handleChange(event:any) {
      setFile(event.target.files[0])
    }
    const onSend = async () =>{
        if(file) {
          const jsonData = await xlsxToJSON(file);
          let i = 0
          while (jsonData.length > i) {
          instance.post('/commissions',{
            date: new Date(jsonData[i]["Data da venda"]).toISOString().slice(0, 19).replace('T', ' '),
            value: jsonData[i]["Valor de Venda"],
            paymentMethod: jsonData[i]["Forma de Pagamento"],
            sellerCPF: jsonData[i]["CPF Vendedor"].replace(/[^\w\s]/gi, ''),
            clientCNPJ: jsonData[i]["CNPJ/CPF Cliente"].replace(/[^\w\s]/gi, ''),
            productId: jsonData[i]["ID Produto"]
          })
          .then(function(response){
            Swal.fire({
              title: 'Sucesso',
              text: `Comissão cadastrada com sucesso!`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1750,
              timerProgressBar: true,
            })
            console.log("Commission added")
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
            console.log("Error adding new Commission")
          })

          i++;
          }}
          else{console.log("No file selected")}
        }; 
          
  return (
    <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30" size={"lg"}>
      <Modal.Body>
        <UploadCard handleChange={handleChange} onSend={onSend} closeModal={closeModal}/>
      </Modal.Body>
    </Modal>
  );
};

export default CommissionModal;