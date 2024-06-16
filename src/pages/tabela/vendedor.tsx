import '@/app/globals.css'
import { SellerTableRowProps, sellerFilters } from '@/models/models';
import ContentArea from '@/modules/content_area';
import ExportButton from '@/modules/export_button';
import LoaderAnim from '@/modules/loader';
import SellerTableRow from '@/modules/seller_table_row';
import Sidebar from '@/modules/sidebar';
import { getSellersWithFilter } from '@/scripts/http-requests/InstanceSamples';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Sellers() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<sellerFilters>({
    adminOnly: false,
    page: 1,
    limit: 20,
  });
  
  async function getData() {
    setIsLoading(true)
    let sellers = await getSellersWithFilter(filters)
    if(sellers.data.length == 0 && filters.page && filters.page > 1){
      setFilters({...filters, page: filters.page - 1})
    }
    setData(sellers.data);
    setIsLoading(false)
  }
  function getExcelData(){
    const excelRows = data.map((row: SellerTableRowProps) => {
      return {
        "ID": row.id,
        "Nome": row.name,
        "CPF": row.cpf,
        "Pontuação": row.score,
        "Cargo": row.admin,
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
        <title>Nebulon - Tabela de Usuários</title>
        </Head>
        <Sidebar/>
        <ContentArea>
          <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <div>

                <section className='w-full text-left flex justify-between pb-6'>
                  <h1 className='text-6xl font-bold text-gray-900 inline'>Usuários</h1>
                  <div className="inline-block m-4">
                    <div className="inline-block m-4">
                      <label htmlFor="adminOnly" className="inline mb-2 text-lg font-medium text-gray-900"> Admin</label>
                      <input title="adminOnly" type="checkbox" name="adminOnly" onChange={()=>{
                        setFilters({...filters, adminOnly: !filters.adminOnly})
                        }}/>
                    </div>
                  </div>
                </section>

                {isLoading ?<div  className='grid place-content-center '> <LoaderAnim />   </div>:
                <Table className="w-100 rounded-lg bg-purple-500 text-black">
                  <Table.Head className='w-full text-lg w-full text-lg text-[#fbfbfb]'>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'>ID</Table.HeadCell>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'>Nome</Table.HeadCell>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'>CPF</Table.HeadCell>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'>Pontuação</Table.HeadCell>
                    <Table.HeadCell className='bg-purple-500 rounded-lg text-[#fbfbfb]'></Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    
                    {data.map((seller: SellerTableRowProps, index: number) => {
                      return (
                        <SellerTableRow
                          key={index}
                          id={seller.id}
                          name={seller.name}
                          cpf={seller.cpf}
                          score={seller.score}
                          admin={seller.admin}
                        />
                      )
                    })}

                  </Table.Body> 
                </Table>   
                  }
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
          <ExportButton jsonData={getExcelData()} filename="vendedores"/>
        </ContentArea>
    </main>
  );
}
