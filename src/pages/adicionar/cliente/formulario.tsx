import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';

interface Cliente {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  telefone: string;
}

const FormularioCadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    cnpj: '',
    nomeFantasia: '',
    razaoSocial: '',
    telefone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(cliente);
    setCliente({
      cnpj: '',
      nomeFantasia: '',
      razaoSocial: '',
      telefone: ''
    });
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Criar Cliente</title>
    </Head>
    <Sidebar/>
    <div className="flex justify-center items-center h-screen">
    <div>
      <h2 className="text-center mb-4 font-bold">Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit} className="bg-white  border-black border-solid border rounded px-8 pt-6 pb-8 mb-4 min-w-96">
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
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8' onClick={() => Router.back()}>Voltar</button>
              </div>
            <div className="text-right">
            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8' type="submit">Cadastrar</button>
              </div>
          </div>
       
        </form>
    </div>
    </div>
    </main>
  );
};

export default FormularioCadastroCliente;