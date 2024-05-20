import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/requests/instance";
import xlsxToJSON from "@/scripts/dataUtils/xlsxToJSON";
import { Modal } from "flowbite-react";


interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ClientModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
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
            console.log("Client added")
          })
          .catch(error =>{
            console.log("Error adding client")
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

export default ClientModal;