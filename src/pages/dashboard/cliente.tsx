import '@/app/globals.css'
import ClientTableRow from '@/modules/client_table_row';
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Clients() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    class: -1,
  });

  async function filterAsync(array: Array<any>, filter: any){
    const filterResults = await Promise.all(array.map(filter));
    return array.filter((_, index) => filterResults[index]);
  }
  
  async function getData() {
    let clients: any = await instance.get("/clients");
    if ([0,1].includes(filters.class)){
      let classes = ["new", "old"]
      clients =  await instance.get(`/clients/class/${classes[filters.class]}`);
    }

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
                          <option value={-1}>Qualquer</option>
                          <option value={0}>Novo</option>
                          <option value={1}>Velho</option>
                        </select>
                      </div>

                    </div>
                  </div>

                <Table className="rounded-lg bg-purple-500  text-white">
                  <Table.Head className='w-full text-left text-md'>
                    <Table.HeadCell>Razão Social</Table.HeadCell>
                    <Table.HeadCell>Segmento</Table.HeadCell>
                    <Table.HeadCell>Contato</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
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
