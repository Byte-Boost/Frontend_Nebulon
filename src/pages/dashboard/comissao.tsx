import '@/app/globals.css'
import ClientTableRow from '@/modules/client_table_row';
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Commissions() {
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const commissions = await instance.get("/commissions");
      setData(commissions.data);
    }
    getData()
    setInterval(() =>{
    getData()
    },60000)
  }, [])


  return (
    <main> 
        <Head>
        <title>Nebulon - Dashboard - Tabela de Comissões</title>
        </Head>
        <Sidebar/>
        <ContentArea>
        <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <div className=''>
                <Table className=" rounded-lg bg-purple-500  text-white">
                  <Table.Head className='w-full text-left text-md'>
                    <Table.HeadCell>Data da Venda</Table.HeadCell>
                    <Table.HeadCell>Vendendor</Table.HeadCell>
                    <Table.HeadCell>CPF do Vendendor</Table.HeadCell>
                    <Table.HeadCell>Cliente</Table.HeadCell>
                    <Table.HeadCell>CNPJ/CPF do Cliente</Table.HeadCell>
                    <Table.HeadCell>Produto</Table.HeadCell>
                    <Table.HeadCell>Valor da Venda</Table.HeadCell>
                    <Table.HeadCell>Comissão</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    {data.map((commission: { date: string , value:string,clientId:string, productId:string, sellerId:string, paymentMethod:string }, index: number) => {
                      return (
                        <ClientTableRow
                          key={index}
                          date={commission.date}
                          seller_id={commission.sellerId}
                          client_id={commission.clientId}
                          product_id={commission.productId}
                          sale_value={parseFloat(commission.value)}
                        />
                      )
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>            
        </ContentArea>
    </main>
  );
}
