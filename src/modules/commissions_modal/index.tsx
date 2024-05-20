import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/requests/instance";
import xlsxToJSON from "@/scripts/dataUtils/xlsxToJSON";
import { Modal } from "flowbite-react";


interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CommissionModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    let jsonData: Array<any> = [];
    const [openModal, setOpenModal] = useState(true);
    const [modalSize, setModalSize] = useState<string>('md');

    const [file, setFile] = useState()
  
    function handleChange(event:any) {
      setFile(event.target.files[0])
    }
    const onSend = async () =>{
        if(file) {
          const jsonData = await xlsxToJSON(file);
          let i = 0
          while (jsonData.length > i) {
          // console.log(i)
          // console.log(new Date(jsonData[i]["Data da venda"]).toISOString().slice(0, 19).replace('T', ' '),)
          console.log(jsonData)
          instance.post('/commissions',{
            date: new Date(jsonData[i]["Data da venda"]).toISOString().slice(0, 19).replace('T', ' '),
            value: jsonData[i]["Valor de Venda"],
            paymentMethod: jsonData[i]["Forma de Pagamento"],
            sellerCPF: jsonData[i]["CPF Vendedor"].replace(/[^\w\s]/gi, ''),
            clientCNPJ: jsonData[i]["CNPJ/CPF Cliente"].replace(/[^\w\s]/gi, ''),
            productId: jsonData[i]["ID Produto"]
          })
          .then(function(response){
            console.log("Commission added")
          })
          .catch(error =>{
            console.log("Error adding commission")
          })
          i++;
          }}
          else{console.log("No file selected")}
        }; 
          
  return (
    <Modal size={'lg'} show={isOpen} onClose={closeModal}>
      <div className="flowbite-modal">
        <UploadCard handleChange={handleChange} onSend={onSend} closeModal={closeModal}/>
      </div>
    </Modal>
  );
};

export default CommissionModal;