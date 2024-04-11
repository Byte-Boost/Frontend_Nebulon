import '@/app/globals.css'
import ClientTableRow from '@/modules/client_table_row';
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import TopBar from '@/modules/topbar';
import axios from 'axios';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Clients() {
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function getData(){
      const clients = await axios.get("http://127.0.0.1:3200/clients");
      setData(clients.data);
    }
    getData();
  }, []); 
  
  return (
    <main>
        <Head>
        <title>Nebulon - Login</title>
        </Head>
        <TopBar/>
        <Sidebar/>
        <ContentArea>
        <div className='w-full p-14'>
            <div className='container-c'>
              <div className='container-table'>
                <Table className=" rounded-lg bg-violet-300">
                  <Table.Head className='w-full text-left text-lg'>
                    <Table.HeadCell>Nome Fantasia</Table.HeadCell>
                    <Table.HeadCell>Razão Social</Table.HeadCell>
                    <Table.HeadCell>CNPJ</Table.HeadCell>
                    <Table.HeadCell>Contato</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    {data.map((client: { name: string, cpf: string }, index: number) => {
                      return (
                        <ClientTableRow nomefantasia={client.name} cnpj={client.cpf} razaosocial={client.name} contato='-' key={index} />
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
