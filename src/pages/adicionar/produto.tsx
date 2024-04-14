import '@/app/globals.css'    
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import TopBar from '@/modules/topbar';
import xlsxToJSON from '@/scripts/xlsxUtils/xlsxToJSON';
import { useState } from 'react';
import instance from '@/scripts/requests/instance';
import UploadCard from '@/modules/upload_card';
import Head from 'next/head';

export default function Products() {

  let jsonData: Array<any> = [];

  const [file, setFile] = useState()

  function handleChange(event:any) {
    setFile(event.target.files[0])
  }
  const onSend = async () =>{
    if(file) {
      const jsonData = await xlsxToJSON(file);
      let i:number = 0;
      while (jsonData.length > i) {
  

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
    <main>
        <Head>
        <title>Nebulon - Adicionar - Produto</title>
        </Head>
        <TopBar/>
        <Sidebar/>
        <ContentArea>
        <UploadCard handleChange={handleChange} onSend={onSend} />
        </ContentArea>
    </main>
  );
}
