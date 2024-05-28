import React, { useState } from "react";

import UploadCard from "../upload_card";
import instance from "@/scripts/http-requests/instance";
import xlsxToJSON from "@/scripts/file-format-scripts/xlsxToJSON";
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { getCutFromCommission } from "@/scripts/http-requests/InstanceSamples";


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
      let i = 0;
      try{
        while(jsonData.length > i) {
          let clienteCnpj = jsonData[i]["CNPJ/CPF Cliente"].replace(/[^\w\s]/gi, '');
          let productId = jsonData[i]["ID Produto"]
          let value = jsonData[i]["Valor de Venda"]
          let cut = await getCutFromCommission({clienteCnpj, productId, value});

          await instance.post('/commissions',{
            date: new Date(jsonData[i]["Data da venda"]).toISOString().slice(0, 19).replace('T', ' '),
            value: value,
            commissionCut: cut,
            paymentMethod: jsonData[i]["Forma de Pagamento"],
            sellerCPF: jsonData[i]["CPF Vendedor"].replace(/[^\w\s]/gi, ''),
            clientCNPJ: clienteCnpj,
            productId: productId,
          }).catch(()=>{throw new Error("Error adding new Commission")})
          i++;
        }
        successAlert("Comissão cadastrada com sucesso!", "Commission added", closeModal);
      } catch (err: any){
        failureAlert(err.message)
      }
    }
  }; 
          
  return (
    <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30 grid place-content-center" size={"lg"}>
      <Modal.Body className="">
        <UploadCard handleChange={handleChange} onSend={onSend} closeModal={closeModal}/>
      </Modal.Body>
    </Modal>
  );
};

export default CommissionModal;