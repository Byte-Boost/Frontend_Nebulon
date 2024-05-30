import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import Head from 'next/head';
import React, { useState } from 'react';
import FormCard from '@/modules/form_card';
import { Label, TextInput } from 'flowbite-react';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { Produto } from '@/models/models';
import { postProduct } from '@/scripts/http-requests/InstanceSamples';
import UploadModal from '@/modules/upload_modal';
import instance from '@/scripts/http-requests/instance';

export default function Home() {
  const emptyProd = {
    name: '',
    description: '',
  }

  const [produto, setProduct] = useState<Produto>(emptyProd);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProduct({ ...produto, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    postProduct(produto)
    .then(function(response){
      successAlert("Produto cadastrado com sucesso!", "Product added");
      setProduct(emptyProd);
    })
    .catch(error => {
      failureAlert("Error adding new product");
    })
  };
  const handleUpload = async (jsonRow:any) => {
    await instance.post('/products',{
      name: jsonRow.Nome,
      description: jsonRow["Descrição"],
      status: jsonRow.Status,
    })
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
          
          <div className="grid grid-flow-row">
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8 w-full' type="button" onClick={() => setModalIsOpen(true)}>Cadastro por upload</button>
            </div>
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="submit">Cadastrar</button>
            </div>
          </div>
        </form>
      <UploadModal isOpen={modalIsOpen} closeModal={closeModal} postSequence={async (jsonRow)=>{await handleUpload(jsonRow)}} success={{msg: "Produtos cadastrados com sucesso!", log: "Products added"}}/>
    </FormCard>
    </main>
  );
};

