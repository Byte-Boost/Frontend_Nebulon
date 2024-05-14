import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import UploadCard from '@/modules/upload_card';
import instance from '@/scripts/requests/instance';
import xlsxToJSON from '@/scripts/dataUtils/xlsxToJSON';
import Head from 'next/head';
import { useState } from 'react';

export default function Client(){

  let jsonData: Array<any> = [];

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
 <main>
        <Head>
        <title>Nebulon - Adicionar - Vendendor</title>
        </Head>
        <Sidebar/>
        <ContentArea>
        <UploadCard handleChange={handleChange} onSend={onSend} />
        </ContentArea>
    </main>
  );
}
