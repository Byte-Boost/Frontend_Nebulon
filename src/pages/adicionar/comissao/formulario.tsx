import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { extractFloat, formatCNPJ, formatCPF, formatMoney } from '@/scripts/validation/dataFormatter';
import Head from 'next/head';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CommissionModal from '@/modules/commissions_modal';

interface Comissao {
  sellerData: string;
  clientData: string;
  value: string;
  paymentMethod: string;
  sellerCPF: string;
  clientCNPJ: string;
  productId: string;
}

const FormularioCadastroComissao: React.FC = () => {
  const [comissao, setComissao] = useState<Comissao>({
    sellerData: '',
    clientData: '',
    value: '',
    paymentMethod: '',
    sellerCPF: '',
    clientCNPJ: '',
    productId: ''
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<string>('md');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setComissao({ ...comissao, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Formatação dos dados
    comissao.sellerCPF=comissao.sellerCPF.replace(/\D/g, '');
    comissao.clientCNPJ=comissao.clientCNPJ.replace(/\D/g, '');
    comissao.value=extractFloat(comissao.value).toString();

    // Requisição POST
    instance.post('/commissions',{
      sellerData: comissao.sellerData,
      clientData: comissao.clientData,
      date: Date.now(),
      value: comissao.value,
      paymentMethod: comissao.paymentMethod,
      sellerCPF: comissao.sellerCPF,
      clientCNPJ: comissao.clientCNPJ,
      productId: comissao.productId
    }) 
    .then(function(response){
      Swal.fire({
        title: 'Sucesso',
        text: "Commissão cadastrada com sucesso!",
        icon: 'success',
        showConfirmButton: false,
        timer: 1750,
        timerProgressBar: true,
      })
      console.log("Commission added." )
      setComissao({
        sellerData: '',
        clientData: '',
        value: '',
        paymentMethod: '',
        sellerCPF: '',
        clientCNPJ: '',
        productId: ''
      });
    })
    .catch(error => {
      Swal.fire({
        title: 'Oops!',
        text: `Algo de errado aconteceu :(`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1750,
      });
      console.log("Error adding new commission.")
    })
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Adicionar - Formulário</title>
    </Head>
    <Sidebar/>
    <div className="flex justify-center">
    <div className="mt-8">
      <div className='container mt-8 mx-auto max-w-xl'>

      <form onSubmit={handleSubmit} className="bg-white  border-black border-solid border rounded px-8 pt-6 pb-8 mb-4 min-w-96">
      <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Comissão</h2>

      <div className="mb-8 mt-8">
        <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
      </div>  

      <div className="mb-4">
        <label htmlFor="value" className="block text-gray-700 text-sm font-bold mb-2">Valor de Venda: </label>
        <input
          type="text"
          id="value"
          name="value"
          placeholder="Digite o valor da venda"
          value={formatMoney(comissao.value)}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-bold mb-2">Método do pagamento: </label>
        <input
          type="text"
          id="paymentMethod"
          name="paymentMethod"
          placeholder="Digite o método de pagamento"
          value={comissao.paymentMethod}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label htmlFor="productId" className="block text-gray-700 text-sm font-bold mb-2">ID do produto: </label>
        <input
          type="text"
          id="productId" 
          name="productId"
          placeholder="Digite o Id do produto"
          value={comissao.productId}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label htmlFor="sellerCPF" className="block text-gray-700 text-sm font-bold mb-2">CPF do Vendedor: </label>
        <input
          type="text"
          id="sellerCPF" 
          name="sellerCPF"
          placeholder="Digite o CPF do vendedor"
          value={formatCPF(comissao.sellerCPF)}
          onChange={handleChange}
          required
          maxLength={14}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label htmlFor="clientCNPJ" className="block text-gray-700 text-sm font-bold mb-2">CNPJ do Cliente: </label>
        <input
        type="text"
        id="clientCNPJ"
        name="clientCNPJ"
        placeholder="Digite o CNPJ do cliente"
        value={formatCNPJ(comissao.clientCNPJ)}
        onChange={handleChange}
        required
        maxLength={18}  
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className='grid grid-flow-row'>
      <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8 w-full' type="button" onClick={() => setModalIsOpen(true)}>Cadastro por upload</button>
            </div>
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="submit">Cadastrar</button>
            </div>
      </div>
      
      </form>
    </div>
    </div>
    </div>
    <CommissionModal isOpen={modalIsOpen} closeModal={closeModal} />
    </main>
  );
};

export default FormularioCadastroComissao;