import '@/app/globals.css'
import Head from 'next/head';
import Sidebar from '@/modules/sidebar';
import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import Swal from 'sweetalert2';
import instance from '@/scripts/requests/instance';
import { formatCPF } from "@/scripts/validation/dataFormatter";
import SellerModal from '@/modules/seller_modal';
import FormCard from '@/modules/form_card';
import { failureAlert, successAlert } from '@/scripts/utils/shared';

interface Seller {
  name: string;
  cpf: string;
  username: string;
  password: string;
}

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState<Seller>({
    name: '',
    cpf: '',
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    user.cpf=user.cpf.replace(/\D/g, '');
    
    instance.post('/account/register',{
      name: user.name,
      cpf: user.cpf,
      username: user.username,
      password: user.password
    })
    .then(function(response){
      successAlert("Vendedor cadastrado com sucesso!", "Seller/user registered successfully");
      setUser({
        name: '',
        cpf: '',
        username: '',
        password: ''
      })
    })
    .catch(error => {
      failureAlert("Error registering Seller/user");
    })
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
 
            <div className="grid grid-flow-row">
              <div className="text-right">
                <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8 w-full' type="button" onClick={() => setModalIsOpen(true)}>Cadastro por upload</button>
              </div>
              <div className="text-right">
                <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="submit">Cadastrar</button>
              </div>
            </div>
          </form>
          <SellerModal isOpen={modalIsOpen} closeModal={closeModal} />
        </FormCard>
    </main>
  );
}

