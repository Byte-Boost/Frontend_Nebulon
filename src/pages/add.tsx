import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import TopBar from '@/modules/topbar';
import xlsxToJSON from '@/scripts/xlsxUtils/xlsxToJSON';
import axios from 'axios';
import { useState } from 'react';

export default function Products() {

  let jsonData: Array<any> = [];

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  const onSend = async () =>{
    if(file) {
      const jsonData = await xlsxToJSON(file);
      axios.post('http://127.0.0.1:3200/sellers',{
        name: jsonData[0].Vendedor,
        cpf: jsonData[0]["CPF Vendedor"].replace(/[^[^\w\s]/gi, '')
      })
      .then(function(response){
        console.log("Seller added")
      })
      .catch(error =>{
        console.log("Error adding seller")
      })

      axios.post('http://127.0.0.1:3200/clientes',{
        name: jsonData[0].Cliente,
        cpf: jsonData[0]["CNPJ/CPF Cliente"].replace(/[^\w\s]/gi, ''),
        segment: jsonData[0]["Segmento do Cliente"],
        bonus: null
      })
      .then(function(response){
        console.log("Cliente added")
      })
      .catch(error =>{
        console.log("Error adding client")
      })

      let sellerData = await axios.get(`http:/127.0.0.1:3200/seller/cpf/${jsonData[0]["CPF Vendedor"].replace(/[^\w\s]/gi, '')}`)

      let clienteData = await axios.get(`http://129.0.0.1:3200/clientes/cpf/${jsonData[0]["CNPJ/CPF Cliente"].replace(/[^\w\s]/)/gi, ''}`)

      axios.post('http://127.0.0.1:3200/comissions',{
        date: jsonData[0]["Data da Venda"],
        value: jsonData[0]["Valor da Venda"],
        paymentMethod: jsonData[0]("Forma de Pagamento"),
        sellerId: sellerData.data[0]["id"],
        clienteId: clienteData.data[0]["id"],
        productId: jsonData[0]["ID Produto"]
      })
      .then(function(response){
        console.log("Commission added")
      })
      .catch(error =>{
        console.log("Error adding commission")
      })
      }
      else{console.log("No file selected")}
    }; 
    
  return (
    <main>
        <TopBar/>
        <Sidebar/>
        <ContentArea>
        <div className='w-full p-14'>
            <div className='container p-14'>
                <div className='flex items-center flex-col justify-center'>
                    <label className='label-p m-6' htmlFor='file'>Selecionar arquivo</label>
                    <input className='inp-p' type="file" name="file" id='file' required accept='.xlsx' onChange={handleChange}/>
                    <button className='btn-p-send' onClick={onSend}>
                        Enviar
                    </button>
                </div>
            </div>
          </div>
        </ContentArea>
    </main>
  );
}
