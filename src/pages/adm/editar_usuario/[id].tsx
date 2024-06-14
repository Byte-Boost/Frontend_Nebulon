import '@/app/globals.css';
import Head from 'next/head';
import Sidebar from '@/modules/sidebar';
import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import instance from '@/scripts/http-requests/instance';
import { formatCPF } from "@/scripts/utils/dataFormatter";
import FormCard from '@/modules/form_card';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { createSellerDto } from '@/models/models';
import { deleteSellers, getSellersById, putSellers } from '@/scripts/http-requests/InstanceSamples';
import Swal from 'sweetalert2';

const EditSeller = () => {
  const router = useRouter();
  const { id } = router.query;

  const emptyUser = {
    name: '',
    cpf: ''
  }

  const [user, setUser] = useState<any>(emptyUser);

  let getData = async () => {
    let userInfo = await getSellersById(Number(id))
    console.log(userInfo.data[0]);
    setUser(userInfo.data[0]);
  }
  
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    putSellers(Number(id), user).then(()=>{
      Swal.fire({
        title: "Atualizado!",
        text: "Usuário atualizado com sucesso!",
        icon: "success"
      });
      router.push('/tabela/vendedor')
    }).catch(error => {
      failureAlert("Algo deu errado!")
    });
  };


  return (
    <main>
      <Head>
        <title>Nebulon - Editar Vendedor</title>
      </Head>
      <Sidebar />
      <FormCard>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 font-bold text-3xl">Editar Usuário</h2>
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
              <TextInput id="cpf" type="text" name="cpf" value={formatCPF(user.cpf)} maxLength={14} onChange={handleChange} disabled />
            </div>
          </div>


          <div className="grid grid-flow-row">
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="submit">Atualizar</button>
            </div>
            <div className="text-right">
              <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="button" onClick={() => {
                                Swal.fire({
                                  title: "Tem certeza?",
                                  text: "Não será possível reverter o processo!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Sim, delete!"
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    deleteSellers(user.id)
                                    Swal.fire({
                                      title: "Deletado!",
                                      text: "Usuário deletado com sucesso!",
                                      icon: "success"
                                    });
                                    router.push('/tabela/vendedor')

                                  }
                                });
                
                }}>Deletar Usuário</button>
            </div>

            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8 w-full' type="button" onClick={() => router.push('/tabela/vendedor')}>Voltar</button>
            </div>
          </div>
        </form>
      </FormCard>
    </main>
  );
};

export default EditSeller;
