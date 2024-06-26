import '@/app/globals.css'
import { productExcelTableRow, productFilters } from '@/models/models';
import ContentArea from '@/modules/content_area';
import ExportButton from '@/modules/export_button';
import LoaderAnim from '@/modules/loader';
import ProductTableRow from '@/modules/product_table_row';
import Sidebar from '@/modules/sidebar';
import { getProductsWithFilter } from '@/scripts/http-requests/InstanceSamples';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Products() {
  const [isLoading, setIsLoading] = useState(true); 
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<productFilters>({
    class: null,
    startsWith: null, 
    page: 1,
    limit: 20,
  });

  async function getData() {
    setIsLoading(true)    
    let products = await getProductsWithFilter(filters)
    if(products.data.length == 0 && filters.page && filters.page > 1){
      setFilters({...filters, page: filters.page - 1})
    }
    setData(products.data);
    setIsLoading(false)
  }

  function dataToExcel(){
    const excelRows = data.map((row: productExcelTableRow) => {
      return {
        "ID": row.id,
        "Nome": row.name,
        "Descrição": row.description,
        "Status": row.status,
      }
    })
    return excelRows
  }

  useEffect(() => {
    getData()
  }, [filters])

  return (
    <main> 
        <Head>
        <title>Nebulon - Tabela de Produtos</title>
        </Head>
        <Sidebar/>
        <ContentArea>
          <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <div>
                <section id="options" className='w-full text-left flex justify-between pb-6'>
                  <h1 className='text-6xl font-bold text-gray-900 inline'>Produtos</h1>
                  <div className="inline-block m-4">
                    <label htmlFor="prodSelect" className="block mb-2 text-lg font-medium text-gray-900">Produto novo</label>
                    <select className="rounded-lg block w-full p-2.5" name="prodSelect" id="prodSelect" onChange={()=>{
                      setFilters({...filters, class: parseInt((document.getElementById('prodSelect') as HTMLSelectElement).value)})
                    }}>
                      <option value={undefined}>Qualquer</option>
                      <option value={0}>Sim</option>
                      <option value={1}>Não</option>
                    </select>
                  </div>
                </section>

                {isLoading ? <div className='grid place-content-center '> <LoaderAnim /></div>:
                <Table className="w-100 rounded-lg bg-purple-500 text-black">
                  <Table.Head className='text-left text-lg text-[#fbfbfb]'>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'>Nome</Table.HeadCell>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'>Descrição</Table.HeadCell>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'></Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                        {data.map((product: { id: number, name: string , description:string, status:number }, index: number) => {
                      return (
                        <ProductTableRow
                          key={index}
                          id={product.id}
                          name={product.name}
                          description={product.description}
                          status={product.status}
                        />
                      )
                    })}
                  </Table.Body>
                </Table>}
                <div className="flex justify-between mt-4"> 
                <button 
                  className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50" 
                  onClick={()=>{
                    setFilters({...filters, page: (filters.page && filters.page >= 1) ? filters.page - 1 : 1})
                  }}
                  disabled={filters.page === 1}
                >
                  Página Anterior
                </button>
                <button 
                  className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700" 
                  onClick={()=>{
                    setFilters({...filters, page: filters.page ? filters.page+1 : 2})
                  }}
                >
                  Próxima Página
                </button>
              </div>
                </div>
              </div>
            </div>
          <ExportButton jsonData={dataToExcel()} filename="produtos"/>
        </ContentArea>
    </main>
  );
}
