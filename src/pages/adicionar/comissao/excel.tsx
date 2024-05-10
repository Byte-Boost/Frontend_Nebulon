import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import UploadCard from '@/modules/upload_card';
import instance from '@/scripts/requests/instance';
import xlsxToJSON from '@/scripts/xlsxUtils/xlsxToJSON';
import Head from 'next/head';
import { useState } from 'react';

export default function Products() {

  let jsonData: Array<any> = [];

  const [file, setFile] = useState()

  function handleChange(event:any) {
    setFile(event.target.files[0])
  }
  const onSend = async () =>{
    if(file) {
      const jsonData = await xlsxToJSON(file);
      let i = 0
      while (jsonData.length > i) {
      console.log(i)
      console.log(new Date(jsonData[i]["Data da venda"]).toISOString().slice(0, 19).replace('T', ' '),)
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
     <main>
        <Head>
        <title>Nebulon - Adicionar - Comissão</title>
        </Head>
        <Sidebar/>
        <ContentArea>
        <UploadCard handleChange={handleChange} onSend={onSend} />
        </ContentArea>
    </main>
  );
}
