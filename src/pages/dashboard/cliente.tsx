import '@/app/globals.css'
import ClientTableRow from '@/modules/client_table_row';
import ContentArea from '@/modules/content_area';
import ExportButton from '@/modules/export_button';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Clients() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<{
    class: number | null,
    segment: string | null,
  }>({
    class: null,
    segment: null,
  });
  
  async function getData() {
    let status = filters.class == 0 ? "new" : filters.class == 1 ? "old" : undefined
    let clients: any = await instance.get("/clients", { params: {
      segment: filters.segment,
      status: status,
    }});

    setData(clients.data);
  }
  useEffect(() => {
    getData()
    setInterval(() =>{
    getData()
    },60000)
  }, [])

  return (
    <main> 
        <Head>
        <title>Nebulon - Dashboard - Tabela de Clientes</title>
        </Head>
        <Sidebar/>
        <ContentArea>
        <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <div className=''>
                
                  <div className='w-full text-left flex justify-between'>
                    <h1 className='text-6xl font-bold text-gray-900 inline'>clientes</h1>
                    <div className="inline-block">
                      
                      <div className="inline-block m-4">
                        <label htmlFor="prodSelect" className="block mb-2 text-lg font-medium text-gray-900">Tipo de cliente</label>
                        <select className="rounded-lg block w-full p-2.5" name="prodSelect" id="prodSelect" onChange={()=>{
                          filters.class = parseInt((document.getElementById('prodSelect') as HTMLSelectElement).value)
                          getData()
                        }}>
                          <option value={undefined}>Qualquer</option>
                          <option value={0}>Novo</option>
                          <option value={1}>Velho</option>
                        </select>
                        <ExportButton jsonData={data} filename="clientes"/>
                      </div>

                    </div>
                  </div>

                <Table className="w-100 rounded-lg bg-purple-500">
                  <Table.Head className='w-full text-left text-md'>
                    <Table.HeadCell>Razão Social</Table.HeadCell>
                    <Table.HeadCell>Segmento</Table.HeadCell>
                    <Table.HeadCell>Contato</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                  <ClientTableRow
                          key={1}
                          companyName={'Thiago3907'}
                          segment={'Gaming'}
                          contact={'gamer'}
                          status={0}
                        />
                        <ClientTableRow
                          key={2}
                          companyName={'Thiago3907'}
                          segment={'Gaming'}
                          contact={'gamer'}
                          status={0}
                        />
                    {data.map((product: { companyName: string, segment:string, contact:string, status:number }, index: number) => {
                      return (
                        <ClientTableRow
                          key={index}
                          companyName={product.companyName}
                          segment={product.segment}
                          contact={product.contact}
                          status={product.status}
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
