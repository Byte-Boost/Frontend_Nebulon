import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { extractFloat, formatCNPJ, formatCPF, formatMoney } from '@/scripts/validation/dataFormatter';
import Head from 'next/head';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CommissionModal from '@/modules/commissions_modal';
import FormCard from '@/modules/form_card';
import { Label, TextInput } from 'flowbite-react';

interface Comissao {
  sellerData: string;
  clientData: string;
  value: string;
  paymentMethod: string;
  sellerCPF: string;
  clientCNPJ: string;
  productId: string;
}

export default function Home() {
  const [comissao, setComissao] = useState<Comissao>({
    sellerData: '',
    clientData: '',
    value: '',
    paymentMethod: '',
    sellerCPF: '',
    clientCNPJ: '',
    productId: ''
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<string>('md');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setComissao({ ...comissao, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Formatação dos dados
    comissao.sellerCPF=comissao.sellerCPF.replace(/\D/g, '');
    comissao.clientCNPJ=comissao.clientCNPJ.replace(/\D/g, '');
    comissao.value=extractFloat(comissao.value).toString();

    // Requisição POST
    instance.post('/commissions',{
      sellerData: comissao.sellerData,
      clientData: comissao.clientData,
      date: Date.now(),
      value: comissao.value,
      paymentMethod: comissao.paymentMethod,
      sellerCPF: comissao.sellerCPF,
      clientCNPJ: comissao.clientCNPJ,
      productId: comissao.productId
    }) 
    .then(function(response){
      Swal.fire({
        title: 'Sucesso',
        text: "Commissão cadastrada com sucesso!",
        icon: 'success',
        showConfirmButton: false,
        timer: 1750,
        timerProgressBar: true,
      })
      console.log("Commission added." )
      setComissao({
        sellerData: '',
        clientData: '',
        value: '',
        paymentMethod: '',
        sellerCPF: '',
        clientCNPJ: '',
        productId: ''
      });
    })
    .catch(error => {
      Swal.fire({
        title: 'Oops!',
        text: `Algo de errado aconteceu :(`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1750,
      });
      console.log("Error adding new commission.")
    })
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Adicionar - Formulário</title>
      </Head>
      <Sidebar/>
      <FormCard>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Comissões</h2>
          <div className="mb-4">
            <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
          </div>

          <div>
              <Label htmlFor="namevalueProduct" value="Valor de Venda:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="value" type="text" name="value" value={formatMoney(comissao.value)} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="paymentMethod" value="Método do pagamento:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="paymentMethod" type="text" name="paymentMethod" value={comissao.paymentMethod} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="productId" value="ID do produto:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="productId" type="text" name="productId" value={comissao.productId} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="sellerCPF" value="CPF do Vendedor:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="sellerCPF" type="text" name="sellerCPF" value={formatCPF(comissao.sellerCPF)} maxLength={14} onChange={handleChange} required />
              </div>
          </div>

          <div>
              <Label htmlFor="clientCNPJ" value="CNPJ do Cliente:" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="clientCNPJ" type="text" name="clientCNPJ" value={formatCNPJ(comissao.clientCNPJ)} maxLength={18} onChange={handleChange} required />
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
        <CommissionModal isOpen={modalIsOpen} closeModal={closeModal} />
      </FormCard>
    </main>
  );
}

