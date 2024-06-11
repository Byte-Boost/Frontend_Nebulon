import '@/app/globals.css'
import Head from 'next/head';
import Sidebar from '@/modules/sidebar';
import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import instance from '@/scripts/http-requests/instance';
import { formatCPF } from "@/scripts/utils/dataFormatter";
import FormCard from '@/modules/form_card';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { createSellerDto } from '@/models/models';
import UploadModal from '@/modules/upload_modal';
import { postSeller } from '@/scripts/http-requests/InstanceSamples';

export default function Home() {
  const emptyUser = {
    name: '',
    cpf: '',
    username: '',
    password: '',
    isAmin: false,
  }

  const [user, setUser] = useState<createSellerDto>(emptyUser);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    switch (type) {
      case 'checkbox':
        setUser({ ...user, [name]: checked });
        break;
      default:
        setUser({ ...user, [name]: value });
        break;
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    postSeller(user)
    .then(function(response){
      successAlert("Vendedor cadastrado com sucesso!", "Seller/user registered successfully");
      setUser(emptyUser)
    })
    .catch(error => {
      failureAlert("Error registering Seller/user");
    })
  };
  const handleUpload = async (jsonRow: any) => {
    let vendedor: createSellerDto = {
      name: jsonRow.Nome,
      username: jsonRow.Nome.replace(/\s/g, '').toLowerCase(),
      cpf: jsonRow["CPF"].replace(/[^[^\w\s]/gi, ''),
      password: '12345678',
    }
    await postSeller(vendedor)
  };

  return (
    <main>
        <Head>
        <title>Nebulon - Adicionar Vendendor</title>
        </Head>
        <Sidebar/>
        <FormCard>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Vendedores</h2>
            <div className="mb-4">
              <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
            </div>

            <div>
                <Label htmlFor="name" value="Nome" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="name" type="text" name="name" value={user.name} onChange={handleChange} required />
                </div>
            </div>

            <div>
                <Label htmlFor="cpf" value="CPF" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="cpf" type="text" name="cpf"value={formatCPF(user.cpf)} maxLength={14} onChange={handleChange} required />
                </div>
            </div>

            <div>
                <Label htmlFor="username" value="Usuário" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="username" type="text" name="username" value={user.username} onChange={handleChange} required />
                </div>
            </div>

            <div>
                <Label htmlFor="password" value="Senha" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner mb-6">
                  <TextInput id="password" type="password" name="password" value={user.password} onChange={handleChange} required />
                </div>
            </div>

            <div>
              <Label htmlFor="admin" value="Administrador" className="font-bold" />
              <div className="flex items-center">
                <input id="admin" type="checkbox" name="isAdmin" onChange={handleChange} />
                <span className="ml-2">Habilitar privilégios de administrador</span>
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
          <UploadModal isOpen={modalIsOpen} closeModal={closeModal}  postSequence={async (jsonRow)=>{await handleUpload(jsonRow)}} success={{msg: "Vendedores cadastrados com sucesso!", log: "Sellers added"}}/>
        </FormCard>
    </main>
  );
}

