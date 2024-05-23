import '@/app/globals.css'
import CommissionTableRow from '@/modules/commission_table_row';
import ContentArea from '@/modules/content_area';
import ExportButton from '@/modules/export_button';
import LoaderAnim from '@/modules/loader';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/requests/instance';
import { formatCNPJ, formatCPF, formatMoney } from '@/scripts/validation/dataFormatter';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Commissions() {
  const [isLoading, setIsLoading] = useState(true);
  const RateMatrix = [[
    process.env.NEXT_PUBLIC_PNCN,
    process.env.NEXT_PUBLIC_PNCV
  ], [
    process.env.NEXT_PUBLIC_PVCN,
    process.env.NEXT_PUBLIC_PVCV
  ]];
  // Table data
  const [data, setData] = useState([]);
  // Filter labels - used to display the current filters
  const [filterLabel, setFilterLabel] = useState<{
    client: string | null,
    seller: string | null,
    product: string | null,
  }>({
    client: null,
    seller: null,
    product: null,
  });
  // Filters data - what is selected to filter the data
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
  // Functions to change the filters on click
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
  
  // Function to get the data from the API
  async function getData() {
    setIsLoading(true)
    // Essentially makes "after" equal to "null" or the date of the last month, 3 months, 6 months, or year
    let dateRange = [0, 1, 3, 6, 12]
    let now = new Date(Date.now());
    let after = null;
    if (filters.date != null && filters.date != 0){
      let start = new Date(now.setMonth(now.getMonth() - dateRange[filters.date]));
      after = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`
    } 
    // translate the filters into the correct format for the API
    let prodStatus = filters.prodClass == 0 ? "new" : filters.prodClass == 1 ? "old" : undefined
    let clientStatus = filters.clientClass == 0 ? "new" : filters.clientClass == 1 ? "old" : undefined
    // fetch! Get the data from the API
    const commissions = await instance.get("/commissions", { params: {
      after: after,
      client_cnpj: filters.clientCNPJ,
      seller_cpf: filters.sellerCPF,
      product_id: filters.productID,
      product_status: prodStatus,
      client_status: clientStatus,
    }});
    // inserts seller_data, client_data, and product_data into the commission object
    for (const commission of commissions.data){
      commission.seller_data = await instance.get(`/sellers/cpf/${commission.sellerCPF}`).then(res=>res.data);
      commission.client_data = await instance.get(`/clients/cnpj/${commission.clientCNPJ}`).then(res=>res.data);
      commission.product_data = await instance.get(`/products/${commission.productId}`).then(res=>res.data);
      commission.comm_value = (commission.value * (commission.product_data.percentage + Number(RateMatrix[commission.product_data.status][commission.client_data.status])))
    }
    // set the data to the fetched data
    setData(commissions.data);
    setIsLoading(false)
  }
  function getExcelData(){
    const newArray = data.map((row: {
      date: Date,
      seller_data: { id: number, name: string },
      sellerCPF: string,
      productId: number,
      product_data: { name: string },
      client_data: { id: number, tradingName: string, segment: string },
      clientCNPJ: string,
      value: string,
      paymentMethod: string
    }) => {
      return {
        "Data da venda": new Date(row.date),
        "ID Vendedor": row.seller_data.id,
        "Vendedor": row.seller_data.name,
        "CPF Vendedor": formatCPF(row.sellerCPF),
        "ID Produto": row.productId,
        "Produto": row.product_data.name,
        "ID Cliente": row.client_data.id,
        "Cliente": row.client_data.tradingName,
        "CNPJ/CPF Cliente": formatCNPJ(row.clientCNPJ),
        "Segmento do Cliente": row.client_data.segment,
        "Valor de Venda": row.value,
        "Forma de Pagamento": row.paymentMethod,
      }
    })
    return newArray
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
              <div>
                <section id="Options" className='w-full text-left flex justify-between pb-6'>
                  <div className="text-center">
                    <h1 className='text-6xl font-bold text-gray-900 '>Comissões</h1>
                  </div>
                  
                  <div className="inline-flex justify-end gap-2 items-end grow">
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
                  </div>

                  <div className="inline-block">
                    <div className='inline-block m-4'>
                      <label htmlFor="dateSelect" className="block mb-2 text-lg font-medium text-gray-900">Periodo</label>
                      <select className="rounded-lg block w-full p-2.5" name="dateSelect" id="dateSelect" onChange={()=>{
                        filters.date = parseInt((document.getElementById('dateSelect') as HTMLSelectElement).value)
                        getData()
                      }}>
                        <option value={0}>Qualquer</option>
                        <option value={1}>Ultimos 30 dias</option>
                        <option value={2}>Ultimos 3 Meses</option>
                        <option value={3}>Ultimos 6 meses</option>
                        <option value={4}>Ultimo ano</option>
                      </select>
                    </div>

                    <div className="inline-block m-4">
                      <label htmlFor="prodSelect" className="block mb-2 text-lg font-medium text-gray-900">Produto novo</label>
                      <select className="rounded-lg block w-full p-2.5" name="prodSelect" id="prodSelect" onChange={()=>{
                        filters.prodClass = parseInt((document.getElementById('prodSelect') as HTMLSelectElement).value)
                        getData()
                      }}>
                        <option value={undefined}>Qualquer</option>
                        <option value={0}>Sim</option>
                        <option value={1}>Não</option>
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
                </section>

                {isLoading ? <div className='grid place-content-center '><LoaderAnim /></div>  :
                <Table className="w-100 rounded-lg bg-purple-500">
                  <Table.Head className='w-full text-left text-lg text-[#fbfbfb]'>
                    <Table.HeadCell>Data da Venda</Table.HeadCell>
                    <Table.HeadCell>Vendendor</Table.HeadCell>
                    <Table.HeadCell>CPF do Vendendor</Table.HeadCell>
                    <Table.HeadCell>Cliente</Table.HeadCell>
                    <Table.HeadCell>CNPJ/CPF do Cliente</Table.HeadCell>
                    <Table.HeadCell>Produto</Table.HeadCell>
                    <Table.HeadCell>Comissão</Table.HeadCell>
                    <Table.HeadCell>Valor da Venda</Table.HeadCell>
                  </Table.Head>
                  
                  <Table.Body className="text-black px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    {data.map((commission: { date: string , value:string, comm_value: any, client_data: any, product_data: any, seller_data: any, paymentMethod:string }, index: number) => {
                                            
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
                          comm_value={parseFloat(commission.comm_value)}
                          handleSellerFilter={changeSellerFilter}
                          handleClientFilter={changeClientFilter}
                          handleProductFilter={changeProductFilter}
                        />
                      )
                    })}
                    
                  </Table.Body>
                  <tfoot className="text-[#fbfbfb]">
                      <tr className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg font-bold">
                        <td scope="row" colSpan={6} className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg text-lg">Total:</td>
                        <td className='px-6 py-4 '>
                          <div className="flex flex-row flex-1 justify-between">
                            <div className="justify-start">
                              <span className="ml-2">{'R$  '}</span>
                            </div>
                            <div className="justify-end">
                              <span className="ml-2">{formatMoney(data.reduce((acc, curr: any) => acc + parseFloat(curr.comm_value), 0).toFixed(2), false)}</span> 
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className="flex flex-row flex-1 justify-between">
                            <div className="justify-start">
                              <span className="ml-2">{'R$  '}</span>
                            </div>
                            <div className="justify-end">
                              <span className="ml-2">{formatMoney(data.reduce((acc, curr: any) => acc + parseFloat(curr.value), 0).toFixed(2), false)}</span> 
                            </div>
                          </div>
                        </td>
                      </tr>
                  </tfoot>
                </Table>}
              </div>
            </div>
          </div>            
          <ExportButton jsonData={getExcelData()} filename="comissoes"/>
        </ContentArea>
    </main>
  );
}
