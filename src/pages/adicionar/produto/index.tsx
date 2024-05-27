
import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import Head from 'next/head';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ProductModal from '@/modules/product_modal';
import FormCard from '@/modules/form_card';
import { Label, TextInput } from 'flowbite-react';
import { failureAlert, successAlert } from '@/scripts/utils/shared';

interface Produto {
  name: string;
  description: string;
  percentage: string;
}

export default function Home() {
  const [produto, setProduct] = useState<Produto>({
    name: '',
    description: '',
    percentage: '',    
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<string>('md');

  let jsonData: Array<any> = [];
  const [file, setFile] = useState()

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProduct({ ...produto, [name]: value });
  };
  const postProduct = () => {
      
    instance.post('/products',{
      name: produto.name,
      description: produto.description,
      percentage: produto.percentage,      
    })
    .then(function(response){
      successAlert("Produto cadastrado com sucesso!", "Product added");
      setProduct({
        name: '',
        description: '',
        percentage: '',
      });
    })
    .catch(error => {
      failureAlert("Error adding new product");
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    postProduct();
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Adicionar Produto</title>
    </Head>
    <Sidebar/>
    <FormCard>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Produtos</h2>
          <div className="mb-4">
            <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
          </div>

          <div>
              <Label htmlFor="name" value="Nome do Produto:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="name" type="text" name="name" value={produto.name} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="description" value="Descrição do Produto:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="description" type="text" name="description" value={produto.description} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="valuePercentage" value="Porcentagem:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="valuePercentage" type="text" name="percentage" value={produto.percentage} onChange={handleChange} required />
              </div>
          </div>
          
          <div className="grid grid-flow-row">
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8 w-full' type="button" onClick={() => setModalIsOpen(true)}>Cadastro por upload</button>
            </div>
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="submit">Cadastrar</button>
            </div>
          </div>
        </form>
      <ProductModal isOpen={modalIsOpen} closeModal={closeModal} />
    </FormCard>
    </main>
  );
};

