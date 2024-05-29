import '@/app/globals.css'
import ClientModal from '@/modules/client_modal';
import FormCard from '@/modules/form_card';
import Sidebar from '@/modules/sidebar';
import { postClient } from '@/scripts/http-requests/InstanceSamples';
import { formatCNPJ, formatPhoneNumber } from '@/scripts/utils/dataFormatter';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { Label, TextInput } from 'flowbite-react';
import Head from 'next/head';
import React, { useState } from 'react';

interface Cliente {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  segmento: string;
  telefone: string;
}
export default function Home() {
  let emptyCli = {
    cnpj: '',
    nomeFantasia: '',
    razaoSocial: '',
    segmento: '',
    telefone: ''
  }
  const [cliente, setCliente] = useState<Cliente>(emptyCli);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    postClient(cliente)
    .then(function(response){
      successAlert("Cliente cadastrado com sucesso!", "Client added successfully");
      setCliente(emptyCli);
    })
    .catch(error => {
      failureAlert("Error adding new client")
    })
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Adicionar Cliente</title>
      </Head>
      <Sidebar/>
      <FormCard>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Clientes</h2>
          <div className="mb-4">
            <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
          </div>

          <div>
              <Label htmlFor="cnpj" value="CNPJ:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="cnpj" type="text" name="cnpj" value={formatCNPJ(cliente.cnpj)} maxLength={18} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="nomeFantasia" value="Nome Fantasia:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="nomeFantasia" type="text" name="nomeFantasia" value={cliente.nomeFantasia} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="razaoSocial" value="Razão Social:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="razaoSocial" type="text" name="razaoSocial" value={cliente.razaoSocial} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="segmento" value="Segmento:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="segmento" type="text" name="segmento" value={cliente.segmento} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="telefone" value="Telefone:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="telefone" type="text" name="telefone" value={formatPhoneNumber(cliente.telefone)} maxLength={15} onChange={handleChange} required />
              </div>
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
        <ClientModal isOpen={modalIsOpen} closeModal={closeModal} />
      </FormCard>
    </main>
  );
}

