import '@/app/globals.css'
import { createClienteDto } from '@/models/models';
import FormCard from '@/modules/form_card';
import Sidebar from '@/modules/sidebar';
import { deleteClient, getClientsById, updateClient } from '@/scripts/http-requests/InstanceSamples';
import { formatCNPJ, formatPhoneNumber } from '@/scripts/utils/dataFormatter';
import { failureAlert } from '@/scripts/utils/shared';
import { Label, TextInput } from 'flowbite-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const EditClient = () =>{
    const router = useRouter();
    const { id } = router.query;

    const emptyClient = {
    cnpj: '',
    tradingName: '',
    companyName: '',
    segment: '',
    contact: ''
  }

  const [cliente, setClient] = useState<createClienteDto>(emptyClient);

  let getData = async () => {
    let clientInfo = await getClientsById(Number(id));
    console.log(clientInfo.data)
    setClient(clientInfo.data[0])
  }
  
  useEffect(() => {
    if(id) {
        getData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setClient({ ...cliente, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateClient(Number(id), cliente).then(()=>{
        Swal.fire({
          title: "Atualizado!",
          text: "Cliente atualizado com sucesso!",
          icon: "success"
        });
        router.push('/tabela/cliente')
      }).catch(error => {
        failureAlert("Algo deu errado!")
        });
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
                <TextInput id="cnpj" type="text" name="cnpj" value={formatCNPJ(cliente.cnpj)} maxLength={18} onChange={handleChange} disabled />
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
          
          <div className="grid grid-flow-row">
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-8 w-full' type="submit" >Atualizar</button>
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
                                    deleteClient(Number(id))
                                    Swal.fire({
                                      title: "Deletado!",
                                      text: "Cliente deletado com sucesso!",
                                      icon: "success"
                                    });
                                    router.push('/tabela/cliente')

                                  }
                                });
                
                }}>Deletar Cliente</button>
            </div>
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="button" onClick={() => router.push('/tabela/cliente')}>Voltar</button>
            </div>
          </div>
        </form>
      </FormCard>
    </main>
  );
}
export default EditClient;
