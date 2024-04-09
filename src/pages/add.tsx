import '@/app/globals.css'
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
import axios from 'axios';
import { useState } from 'react';
import extrairTabela from '../scripts/xlsxToDict';
export default function Products() {


  let commission_table;

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  const onSend = ( ) =>{
    commission_table = file;
    console.log(commission_table)
  }
 
  // axios.post('localhost:3200/clients',{
  //   name:commission_table.Cliente,
  //   cpf:commission_table.CNPJCPFCliente,
  //   segment:commission_table.SegmentoCliente,
  //   bonus:null
  // })
  // .then(function(response){
  //   console.log("nice")
  // })
  // .then(function(error){
  //   console.log("deu ruim")
  // })
  
  // axios.get('localhost:3200/seller/')

  // axios.post('localhost:3200/commissions',{
  //   date:commission_table.DatadaVenda,
  //   value:commission_table.ValordaVenda,
  //   paymentMethod:commission_table.MetododePagamento,
  //   productId:commission_table.IDProduto,
  // })

  return (
    <main>
        <Navbar/>
        <div className='flex flex-row'>
        <Sidebar/>
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
        </div>
    </main>
  );
}
