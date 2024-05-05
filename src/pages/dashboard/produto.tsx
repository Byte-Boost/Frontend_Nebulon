import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import ProductTableRow from '@/modules/product_table_row';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Products() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    class: -1,
  });

  async function filterAsync(array: Array<any>, filter: any){
    const filterResults = await Promise.all(array.map(filter));
    return array.filter((_, index) => filterResults[index]);
  }
  
  async function getData() {
    let products: any = await instance.get("/products");
    if ([0,1].includes(filters.class)){
      let classes = ["new", "old"]
      products =  await instance.get(`/products/class/${classes[filters.class]}`);
    }  
    // else {
    //   products = await instance.get("/products");
    // }

    setData(products.data);
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
                          <option value={-1}>Qualquer</option>
                          <option value={0}>Novo</option>
                          <option value={1}>Velho</option>
                        </select>
                      </div>

                    </div>
                  </div>

                <Table className="rounded-lg bg-purple-500  text-white">
                  <Table.Head className='w-full text-left text-md'>
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
                </Table>
              </div>
            </div>
          </div>            
        </ContentArea>
    </main>
  );
}
