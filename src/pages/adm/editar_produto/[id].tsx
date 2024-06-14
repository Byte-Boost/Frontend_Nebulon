import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import FormCard from '@/modules/form_card';
import { Label, TextInput } from 'flowbite-react';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { useRouter } from 'next/router';
import instance from '@/scripts/http-requests/instance';
import Swal from 'sweetalert2';
import { deleteProduct, getProductById, updateProduct } from '@/scripts/http-requests/InstanceSamples';
import { createProductDto } from '@/models/models';

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;

    const emptyProd = {
    name: '',
    description: ''
  }

  const [produto, setProduct] = useState<createProductDto>(emptyProd);

  let getData = async () => {
    let prodInfo = await getProductById(Number(id));
    setProduct(prodInfo.data)
  }

  useEffect(() => {
    if(id) {
        getData();
    }
  }, [id]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProduct({ ...produto, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateProduct(Number(id), produto).then(()=>{
        Swal.fire({
          title: "Atualizado!",
          text: "Usuário atualizado com sucesso!",
          icon: "success"
        });
        router.push('/tabela/produto')
      }).catch(error => {
        failureAlert("Algo deu errado!")
      });
  
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
                                    deleteProduct(Number(id))
                                    Swal.fire({
                                      title: "Deletado!",
                                      text: "Usuário deletado com sucesso!",
                                      icon: "success"
                                    });
                                    router.push('/tabela/produto')

                                  }
                                });
                
                }}>Deletar Produto</button>
            </div>
            <div className="text-right">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="button" onClick={() => router.push('/tabela/produto')}>Voltar</button>
            </div>
          </div>
        </form>
    </FormCard>
    </main>
  );
};

export default EditProduct;