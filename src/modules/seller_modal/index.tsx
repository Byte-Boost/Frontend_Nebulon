import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/requests/instance";
import xlsxToJSON from "@/scripts/dataUtils/xlsxToJSON";
import { Modal } from "flowbite-react";


interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const SellerModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
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
        let i:number = 0;
        while(jsonData.length > i) {
    
          instance.post('/account/register',{
            name: jsonData[i].Nome,
            username:jsonData[i].Nome.replace(/\s/g, '').toLowerCase(),
            cpf: jsonData[i]["CPF"].replace(/[^[^\w\s]/gi, ''),
            password: '12345678',
          })
          .then(function(response){
            console.log("Seller added")
          })
          .catch(error =>{
            console.log("Error adding seller")
          })
          i++;
        }
        }
    }
      
  return (
    <Modal size={'lg'} show={isOpen} onClose={closeModal}>
      <div className="flowbite-modal">
        <UploadCard handleChange={handleChange} onSend={onSend} closeModal={closeModal}/>
      </div>
    </Modal>
  );
};

export default SellerModal;