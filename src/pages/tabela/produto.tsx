import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import ExportButton from '@/modules/export_button';
import LoaderAnim from '@/modules/loader';
import ProductTableRow from '@/modules/product_table_row';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Products() {
  const [isLoading, setIsLoading] = useState(true); 
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<{
    class: number | null,
  }>({
    class: null,
  });

  async function getData() {
    setIsLoading(true)
    let status = filters.class == 0 ? "new" : filters.class == 1 ? "old" : undefined
    let products: any = await instance.get("/products", { params: {
      status: status,
    }});

    setData(products.data);
    setIsLoading(false)
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
        <title>Nebulon - Dashboard - Tabela de Produtos</title>
        </Head>
        <Sidebar/>
        <ContentArea>
        <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <div className=''>
                
                  <div className='w-full text-left flex justify-between'>
                    <h1 className='text-6xl font-bold text-gray-900 inline'>Produtos</h1>
                    <div className="inline-block">
                      
                      <div className="inline-block m-4">
                        <label htmlFor="prodSelect" className="block mb-2 text-lg font-medium text-gray-900">Tipo de produto</label>
                        <select className="rounded-lg block w-full p-2.5" name="prodSelect" id="prodSelect" onChange={()=>{
                          filters.class = parseInt((document.getElementById('prodSelect') as HTMLSelectElement).value)
                          getData()
                        }}>
                          <option value={undefined}>Qualquer</option>
                          <option value={0}>Novo</option>
                          <option value={1}>Velho</option>
                        </select>
                      </div>
                      <ExportButton jsonData={data} filename="produtos"/>
                    </div>
                  </div>
                  {isLoading ? <div className='grid place-content-center '> <LoaderAnim /></div>:
                <Table className="w-100 rounded-lg bg-purple-500 text-black">
                  <Table.Head className='text-left text-lg text-[#fbfbfb]'>
                    <Table.HeadCell>Nome</Table.HeadCell>
                    <Table.HeadCell>Descrição</Table.HeadCell>
                    <Table.HeadCell>Porcentagem</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                        {data.map((product: { name: string , description:string, percentage:number, status:number }, index: number) => {
                      return (
                        <ProductTableRow
                          key={index}
                          name={product.name}
                          description={product.description}
                          percentage={product.percentage}
                          status={product.status}
                        />
                      )
                    })}
                  </Table.Body>
                </Table>}
                </div>
              </div>
            </div>
        </ContentArea>
    </main>
  );
}
