import '@/app/globals.css'
import Sidebar from '@/modules/sidebar';
import { extractFloat, formatCNPJ, formatCPF, formatMoney } from '@/scripts/utils/dataFormatter';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import FormCard from '@/modules/form_card';
import { Label, TextInput } from 'flowbite-react';
import { getCutAndScoreFromCommission, getProductsWithFilter, postCommission } from '@/scripts/http-requests/InstanceSamples';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { createCommissionDto } from '@/models/models';
import UploadModal from '@/modules/upload_modal';
import { Autocomplete, TextField } from '@mui/material';

export default function Home() {
  const emptyComm = {
    value: '',
    paymentMethod: '',
    sellerCPF: '',
    clientCNPJ: '',
    productId: ''
  }
  
  // Product autocomplete
  const [value, setValue] = React.useState<any>(null);
  const [inputValue, setInputValue] = React.useState('');
  let [products, setProducts] = useState<Array<any>>([]);

  // Commission form
  const [comissao, setComissao] = useState<createCommissionDto>(emptyComm);
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
    comissao.value=extractFloat(comissao.value).toString();
    postCommission(comissao)
    .then(function(response){
      successAlert("Comissão cadastrada com sucesso!", "Commission added successfully");
      setComissao(emptyComm);
    })
    .catch(error => {
      failureAlert("Error adding new commission");
    })
  };
  const handleUpload = async (jsonRow:any) => {
    let date = new Date(jsonRow["Data da venda"]);
    let value = jsonRow["Valor de Venda"];
    let paymentMethod = jsonRow["Forma de Pagamento"];
    let sellerCPF = jsonRow["CPF Vendedor"].replace(/[^\w\s]/gi, '');
    let clienteCNPJ = jsonRow["CNPJ/CPF Cliente"].replace(/[^\w\s]/gi, '');
    let productId = jsonRow["ID Produto"];
    let calcValues = await getCutAndScoreFromCommission({clienteCNPJ, productId, value});

    let venda: createCommissionDto = {
      date: date,
      value: value,
      commissionCut: calcValues.cut,
      scorePoints: calcValues.score,
      paymentMethod: paymentMethod,
      sellerCPF: sellerCPF,
      clientCNPJ: clienteCNPJ,
      productId: productId,

    }

    await postCommission(venda);
  };

  // Product autocomplete
  useEffect(() => {
    getProductsWithFilter({class: null, startsWith: inputValue, limit: 6})
    .then(function(response){
      setProducts(response.data);
      console.log(products)
    })
    .catch(error => {
      failureAlert("Error fetching products");
    })
  }, [inputValue, products, value]);

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

          <div>
              <Label htmlFor="productId" value="ID do produto:" className="font-bold" />
                <Autocomplete
                  id="selectProduct"
                  filterOptions={(x) => x}
                  options={products}
                  getOptionLabel={(option) => option.name}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={value}
                  noOptionsText="Nenhum produto encontrado"
                  onInputChange={(e, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Produto:" />}
                />
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
        <UploadModal isOpen={modalIsOpen} closeModal={closeModal}  postSequence={async (jsonRow)=>{await handleUpload(jsonRow)}} success={{msg: "Vendas cadastradas com sucesso!", log: "Sales added"}}/>
      </FormCard>
    </main>
  );
}

