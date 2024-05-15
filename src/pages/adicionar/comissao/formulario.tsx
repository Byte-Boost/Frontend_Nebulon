import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setComissao({ ...comissao, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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

    console.log(comissao);
    setComissao({
      sellerData: '',
      clientData: '',
      value: '',
      paymentMethod: '',
      sellerCPF: '',
      clientCNPJ: '',
      productId: ''
    });
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Adicionar - Formulário</title>
    </Head>
    <Sidebar/>
    <div className="flex justify-center">
    <div className="mt-4">
      <div className='container mx-auto max-w-xl'>

      <form onSubmit={handleSubmit} className="bg-white  border-black border-solid border rounded px-8 pt-6 pb-8 mb-4 min-w-96">
      <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Comissão</h2>

      <div className="mb-4">
        <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
      </div>  

      <div className="mb-4">
        <label htmlFor="value" className="block text-gray-700 text-sm font-bold mb-2">Valor de Venda: </label>
        <input
          type="text"
          id="value"
          name="value"
          placeholder="Digite o valor da venda"
          value={comissao.value}
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
          value={comissao.sellerCPF}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label htmlFor="clientCNPJ" className="block text-gray-700 text-sm font-bold mb-2">CNPJ/CPF do Cliente: </label>
        <input
        type="text"
        id="clientCNPJ"
        name="clientCNPJ"
        placeholder="Digite o CNPJ/CPF do cliente"
        value={comissao.clientCNPJ}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className='grid grid-flow-col'>
        <div className="text-left">
          <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4' onClick={() => Router.back()}>Voltar</button>
        </div>
        <div className="text-right">
          <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4' type="submit">Cadastrar</button>
        </div>
      </div>
      
      </form>
    </div>
    </div>
            </div>
    </main>
  );
};

export default FormularioCadastroComissao;