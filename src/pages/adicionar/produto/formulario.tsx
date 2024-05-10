import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';

interface Produto {
  name: string;
  description: string;
  percentage: string;
}

const FormularioCadastroProduto: React.FC = () => {
  const [produto, setProduct] = useState<Produto>({
    name: '',
    description: '',
    percentage: '',    
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProduct({ ...produto, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  
    instance.post('/products',{
      name: produto.name,
      description: produto.description,
      percentage: produto.percentage,      
    })
    .then(function(response){
      setSuccessMessage("Produto cadastrado com sucesso!");
      setErrorMessage(null);
      console.log("Product added")
    })
    .catch(error => {
      setErrorMessage("Erro ao cadastrar produto. Tente novamente.");
      setSuccessMessage(null);
      console.log("Error adding new product")
    })

    console.log(produto);
    setProduct({
      name: '',
      description: '',
      percentage: '',
    });
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Criar Produto</title>
    </Head>
    <Sidebar/>
    <div className="flex justify-center">
    <div className="mt-4">
      {/* Mensagem de sucesso */}
      {successMessage && <div className="bg-green-500 text-white px-4 py-2 rounded mb-4"> {successMessage}</div>}
      {/* Mensagem de erro */}
      {errorMessage && <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">{errorMessage}</div>}
      <div className='container mx-auto max-w-xl'>

      <form onSubmit={handleSubmit} className="bg-white  border-black border-solid border rounded px-8 pt-6 pb-8 mb-4 min-w-96">
      <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Produto</h2>

      <div className="mb-4">
        <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
      </div>  

        <div className="mb-4">
          <label htmlFor="nameProduct" className="block text-gray-700 text-sm font-bold mb-2">Nome do Produto: </label>
          <input
            type="text"
            id="nameProduct" 
            name="name"
            placeholder="Digite o nome do Produto"
            value={produto.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="nameDescription" className="block text-gray-700 text-sm font-bold mb-2">Descrição do Produto: </label>
          <input
            type="text"
            id="nameDescription"
            name="description"
            placeholder="Descrição do Produto"
            value={produto.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="valuePercentage" className="block text-gray-700 text-sm font-bold mb-2">Porcentagem: </label>
          <input
            type="text"
            id="valuePercentage"
            name="percentage"
            placeholder="Insira a porcentagem"
            value={produto.percentage}
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
    </div>
    </main>
  );
};

export default FormularioCadastroProduto;