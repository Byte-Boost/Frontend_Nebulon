import '@/app/globals.css'
import { createClienteDto } from '@/models/models';
import FormCard from '@/modules/form_card';
import Sidebar from '@/modules/sidebar';
import UploadModal from '@/modules/upload_modal';
import { postClient } from '@/scripts/http-requests/InstanceSamples';
import { formatCNPJ, formatPhoneNumber } from '@/scripts/utils/dataFormatter';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { Label, TextInput } from 'flowbite-react';
import Head from 'next/head';
import React, { useState } from 'react';

export default function Home() {
  const emptyCli = {
    cnpj: '',
    tradingName: '',
    companyName: '',
    segment: '',
    contact: ''
  }

  const [cliente, setCliente] = useState<createClienteDto>(emptyCli);
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
  const handleUpload = async (jsonRow:any) => {
    let cliente: createClienteDto = {
      tradingName: jsonRow["Nome Fantasia"],
      companyName: jsonRow["Razão Social"],
      cnpj: jsonRow["CNPJ"].replace(/[^\w\s]/gi, ''),
      segment: jsonRow["SEGMENTO"],
      contact: jsonRow["CONTATO"],
      status: jsonRow["STATUS"]
    }
    await postClient(cliente)
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
              <Label htmlFor="tradingName" value="Nome Fantasia:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="tradingName" type="text" name="tradingName" value={cliente.tradingName} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="companyName" value="Razão Social:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="companyName" type="text" name="companyName" value={cliente.companyName} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="segment" value="Área de atuação:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="segment" type="text" name="segment" value={cliente.segment} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="contact" value="Telefone:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="contact" type="text" name="contact" value={formatPhoneNumber(cliente.contact)} maxLength={15} onChange={handleChange} required />
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
        <UploadModal isOpen={modalIsOpen} closeModal={closeModal}  postSequence={async (jsonRow)=>{await handleUpload(jsonRow)}} success={{msg: "Clientes cadastrados com sucesso!", log: "Clients added"}}/>
      </FormCard>
    </main>
  );
}

