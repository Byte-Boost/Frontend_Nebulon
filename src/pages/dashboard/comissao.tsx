import '@/app/globals.css'
import CommissionTableRow from '@/modules/commission_table_row';
import ContentArea from '@/modules/content_area';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Commissions() {
  const [data, setData] = useState([]);
  const [filterLabel, setFilterLabel] = useState<{
    client: string | null,
    seller: string | null,
    product: string | null,
  }>({
    client: null,
    seller: null,
    product: null,
  });
  const [filters, setFilters] = useState<{
    date: number | null,
    clientCNPJ: string | null,
    sellerCPF: string | null,
    productID: number | null,
    prodClass: number | null,
    clientClass: number | null,
  }>({
    date: null,
    clientCNPJ: null,
    sellerCPF: null,
    productID: null,
    prodClass: null,
    clientClass: null,
  });

  const changeSellerFilter = (cpf: string | null, label: string | null) => {
    console.log("filtering by seller")
    filters.sellerCPF = cpf;
    setFilterLabel({...filterLabel, seller: label})
    getData();
  }
  const changeClientFilter = (cnpj: string | null, label: string | null) => {
    console.log("filtering by client")
    filters.clientCNPJ = cnpj;
    setFilterLabel({...filterLabel, client: label})
    getData();
  }
  const changeProductFilter = (id: number | null, label: string | null) => {
    console.log("filtering by product")
    filters.productID = id;
    setFilterLabel({...filterLabel, product: label})
    getData();
  }
  async function filterAsync(array: Array<any>, filter: any){
    const filterResults = await Promise.all(array.map(filter));
    return array.filter((_, index) => filterResults[index]);
  }
  
  async function getData() {
    let dateRange = [0, 1, 3, 6, 12]
    let prodStatus = filters.prodClass == 0 ? "new" : filters.prodClass == 1 ? "old" : undefined
    let clientStatus = filters.clientClass == 0 ? "new" : filters.clientClass == 1 ? "old" : undefined
    
    const commissions = await instance.get("/commissions", { params: {
      client_cnpj: filters.clientCNPJ,
      seller_cpf: filters.sellerCPF,
      product_id: filters.productID,
      product_status: prodStatus,
      client_status: clientStatus,
    }});

    const filteredCommissions: any = await filterAsync(commissions.data, (async (commission: any) =>{
      // Filter booleans
      let dateFilterBool: boolean = true;
      let dateFilter = filters.date || 0;
      // Filter
      if ([1,2,3,4].includes(dateFilter)){
        const now = new Date(Date.now());
        const start = now.setMonth(now.getMonth() - dateRange[dateFilter]);
        const end = Date.now();
        const d = Date.parse(commission.date);
        dateFilterBool = d.valueOf() >= start.valueOf() && d.valueOf() <= end.valueOf()
      } 

      commission.seller_data = await instance.get(`/sellers/cpf/${commission.sellerCPF}`).then(res=>res.data);
      commission.client_data = await instance.get(`/clients/cnpj/${commission.clientCNPJ}`).then(res=>res.data);
      commission.product_data = await instance.get(`/products/${commission.productId}`).then(res=>res.data);
      return (dateFilterBool);
    }));
    setData(filteredCommissions);
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
        <title>Nebulon - Dashboard - Tabela de Comissões</title>
        </Head>
        <Sidebar/>
        <ContentArea>
        <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <div className=''>
                
                  <div className='w-full text-left flex justify-between'>
                    <h1 className='text-6xl font-bold text-gray-900 inline'>Comissões</h1>
                    <div className="inline-block">
                      { filterLabel.seller ? 
                        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                          Seller: {filterLabel.seller}
                          <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" aria-label="Remove" onClick={(e)=>{changeSellerFilter(null, null)}}>
                            <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Remove badge</span>
                          </button>
                        </span>
                        : null
                      } 
                      { filterLabel.client ? 
                        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        Client: {filterLabel.client}
                        <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" aria-label="Remove" onClick={(e)=>{changeClientFilter(null, null)}}>
                          <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Remove badge</span>
                        </button>
                      </span>
                        : null
                      }
                      { filterLabel.product ? 
                        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-pink-800 bg-pink-100 rounded dark:bg-pink-900 dark:text-pink-300">
                        Product: {filterLabel.product}
                        <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-pink-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300" aria-label="Remove" onClick={(e)=>{changeProductFilter(null, null)}}>
                          <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Remove badge</span>
                        </button>
                      </span>
                        : null
                      }


                      <div className='inline-block m-4'>
                        <label htmlFor="dateSelect" className="block mb-2 text-lg font-medium text-gray-900">Periodo</label>
                        <select className="rounded-lg block w-full p-2.5" name="dateSelect" id="dateSelect" onChange={()=>{
                          filters.date = parseInt((document.getElementById('dateSelect') as HTMLSelectElement).value)
                          getData()
                        }}>
                          <option value={0}>Qualquer</option>
                          <option value={1}>Ultimo mês</option>
                          <option value={2}>Ultimos 3 Meses</option>
                          <option value={3}>Ultimos 6 meses</option>
                          <option value={4}>Ultimo ano</option>
                        </select>
                      </div>

                      <div className="inline-block m-4">
                        <label htmlFor="prodSelect" className="block mb-2 text-lg font-medium text-gray-900">Tipo de produto</label>
                        <select className="rounded-lg block w-full p-2.5" name="prodSelect" id="prodSelect" onChange={()=>{
                          filters.prodClass = parseInt((document.getElementById('prodSelect') as HTMLSelectElement).value)
                          getData()
                        }}>
                          <option value={undefined}>Qualquer</option>
                          <option value={0}>Novo</option>
                          <option value={1}>Velho</option>
                        </select>
                      </div>
                      
                      {/* This might not need to exist // or need to be modified. there are no 'new' clients who have purchased something. */}
                      {/* <div className="inline-block m-4">
                        <label htmlFor="clientSelect" className="block mb-2 text-lg font-medium text-gray-900">Tipo de cliente</label>
                        <select className="rounded-lg block w-full p-2.5" name="clientSelect" id="clientSelect" onChange={()=>{
                          filters.clientClass = parseInt((document.getElementById('clientSelect') as HTMLSelectElement).value)
                          getData()
                        }}>
                          <option value={undefined}>Qualquer</option>
                          <option value={0}>Novo</option>
                          <option value={1}>Velho</option>
                        </select>
                      </div> */}


                    </div>
                  </div>

                <Table className="w-100 rounded-lg bg-purple-500  text-white">
                  <Table.Head className='w-full text-left text-md'>
                    <Table.HeadCell>Data da Venda</Table.HeadCell>
                    <Table.HeadCell>Vendendor</Table.HeadCell>
                    <Table.HeadCell>CPF do Vendendor</Table.HeadCell>
                    <Table.HeadCell>Cliente</Table.HeadCell>
                    <Table.HeadCell>CNPJ/CPF do Cliente</Table.HeadCell>
                    <Table.HeadCell>Produto</Table.HeadCell>
                    <Table.HeadCell>Comissão</Table.HeadCell>
                    <Table.HeadCell>Valor da Venda</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    {data.map((commission: { date: string , value:string, client_data: any, product_data: any, seller_data: any, paymentMethod:string }, index: number) => {
                                           
                      return (
                        <CommissionTableRow
                          key={index}
                          date={commission.date}
                          seller_data={{
                            cpf: commission.seller_data.cpf,
                            name: commission.seller_data.name,
                          }}
                          client_data={{
                            cnpj: commission.client_data.cnpj,
                            name: commission.client_data.tradingName,
                            status: commission.client_data.status,
                          }}
                          product_data={{
                            id: commission.product_data.id,
                            name: commission.product_data.name,
                            percentage: commission.product_data.percentage,
                            status: commission.product_data.status,
                          }}
                          sale_value={parseFloat(commission.value)}
                          handleSellerFilter={changeSellerFilter}
                          handleClientFilter={changeClientFilter}
                          handleProductFilter={changeProductFilter}
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
