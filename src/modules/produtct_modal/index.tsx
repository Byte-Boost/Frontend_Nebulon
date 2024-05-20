import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/requests/instance";
import xlsxToJSON from "@/scripts/dataUtils/xlsxToJSON";
import { Modal } from "flowbite-react";


interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
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
        while (jsonData.length > i) {
    
          console.log(jsonData)
        instance.post('/products',{
          name: jsonData[i].Nome,
          description: jsonData[i]["Descrição"],
          percentage: jsonData[i]["Alíquota"],
          status: jsonData[i].Status,
        }
        )
        .then(function(response){
          console.log("Product added")
        })
        .catch(error =>{
          console.log("Product adding seller")
        })
        i++;
      };
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

export default ProductModal;