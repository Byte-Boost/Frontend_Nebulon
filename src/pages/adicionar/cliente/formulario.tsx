import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Cliente {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  segmento: string;
  telefone: string;
}

const FormularioCadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    cnpj: '',
    nomeFantasia: '',
    razaoSocial: '',
    segmento: '',
    telefone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    instance.post('/clients',{
      tradingName: cliente.nomeFantasia,
      companyName: cliente.razaoSocial,
      cnpj: cliente.cnpj,
      segment: cliente.segmento,
      contact: cliente.telefone
    })
    .then(function(response){
      Swal.fire({
        title: 'Sucesso',
        text: `Cliente cadastrado com sucesso!`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1750,
        timerProgressBar: true,
      })
      console.log("Client added")
      setCliente({
        cnpj: '',
        nomeFantasia: '',
        razaoSocial: '',
        segmento: '',
        telefone: ''
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
      console.log("Error adding new client")
    })
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Criar Cliente</title>
      </Head>
    <Sidebar/>
    <div className="flex justify-center">
    <div className="mt-4">
      <div className='container mx-auto max-w-xl'>

      <form onSubmit={handleSubmit} className="bg-white  border-black border-solid border rounded px-8 pt-6 pb-8 mb-4 min-w-96">
      <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Cliente</h2>

      <div className="mb-4">
        <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
      </div>  

      <div className="mb-4">
          <label htmlFor="cnpj" className="block text-gray-700 text-sm font-bold mb-2">CNPJ: </label>
          <input
            type="text"
            id="cnpj" 
            name="cnpj"
            placeholder="Digite o CNPJ"
            value={cliente.cnpj}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="nomeFantasia" className="block text-gray-700 text-sm font-bold mb-2">Nome Fantasia: </label>
          <input
            type="text"
            id="nomeFantasia"
            name="nomeFantasia"
            placeholder="Digite o nome fantasia"
            value={cliente.nomeFantasia}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="razaoSocial" className="block text-gray-700 text-sm font-bold mb-2">Razão Social: </label>
          <input
            type="text"
            id="razaoSocial"
            name="razaoSocial"
            placeholder="Digite a razão social"
            value={cliente.razaoSocial}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="segmento" className="block text-gray-700 text-sm font-bold mb-2">Segmento: </label>
          <input
            type="seg"
            id="segmento"
            name="segmento"
            placeholder="Digite o segmento da empresa"
            value={cliente.segmento}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="telefone" className="block text-gray-700 text-sm font-bold mb-2">Telefone: </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="Digite o telefone"
            value={cliente.telefone}
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

export default FormularioCadastroCliente;