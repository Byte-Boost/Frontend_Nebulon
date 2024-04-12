import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import TopBar from '@/modules/topbar';
import instance from '@/scripts/requests/instance';
import xlsxToJSON from '@/scripts/xlsxUtils/xlsxToJSON';
import axios from 'axios';
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

      instance.post('http://127.0.0.1:3200/account/register',{
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
        <TopBar/>
        <Sidebar/>
        <ContentArea>
        <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <h1 className='text-3xl mb-4'>Extrair informações do excel</h1>
              Selecionar arquivo
              <div className='bg-slate-300 border-dashed border-2 border-black h-56 flex items-center flex-col justify-center cursor-pointer'>
                <p>Arraste e solte o arquivo aqui</p>
                <p>ou</p>
                <label className='mt-12 bg-purple-500 hover:bg-purple-600 text-white p-2 cursor-pointer' htmlFor='file'>Escolha um arquivo</label>
                <input className='hidden' type="file" name="file" id='file' required accept='.xlsx' onChange={handleChange}/>
              </div>
              <div className="text-right">
                <button className='mt-4' onClick={onSend}>Upload</button>
                </div>
            </div>
          </div>
        </ContentArea>
    </main>
  );
}
