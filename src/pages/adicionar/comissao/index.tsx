import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import { formatCNPJ, formatCPF, formatMoney } from '@/scripts/utils/dataFormatter';
import Head from 'next/head';
import React, { useState } from 'react';
import CommissionModal from '@/modules/commissions_modal';
import FormCard from '@/modules/form_card';
import { Label, TextInput } from 'flowbite-react';
import { postCommission } from '@/scripts/http-requests/InstanceSamples';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { Comissao } from '@/models/models';


export default function Home() {
  let emptyComm = {
    value: '',
    paymentMethod: '',
    sellerCPF: '',
    clientCNPJ: '',
    productId: ''
  }
  
  const [comissao, setComissao] = useState<Comissao>(emptyComm);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setComissao({ ...comissao, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    postCommission(comissao)
    .then(function(response){
      successAlert("Comissão cadastrada com sucesso!", "Commission added successfully");
      setComissao(emptyComm);
    })
    .catch(error => {
      failureAlert("Error adding new commission");
    })
  };

  return (
    <main>
      <Head>
        <title>Nebulon - Adicionar Comissão</title>
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

