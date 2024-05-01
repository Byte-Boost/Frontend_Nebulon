import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import xlsxToJSON from '@/scripts/xlsxUtils/xlsxToJSON';
import { useState } from 'react';
import Router from 'next/router'
import UploadCard from '@/modules/upload_card';
import Head from 'next/head';

export default function Client(){

  let jsonData: Array<any> = [];

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
 <main>
        <Head>
        <title>Nebulon - Adicionar - Cliente</title>
        </Head>
        <Sidebar/>
        <ContentArea>
        <UploadCard handleChange={handleChange} onSend={onSend} />
        </ContentArea>
    </main>
  );
}
