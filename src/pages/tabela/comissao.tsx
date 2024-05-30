import '@/app/globals.css'
import { SortLabelType, commissionExcelTableRow, commissionFilterLabels, commissionFilters } from '@/models/models';
import CommissionTableRow from '@/modules/commission_table_row';
import ContentArea from '@/modules/content_area';
import ExportButton from '@/modules/export_button';
import LoaderAnim from '@/modules/loader';
import Sidebar from '@/modules/sidebar';
import { getCommissionsWithFilter } from '@/scripts/http-requests/InstanceSamples';
import { formatCNPJ, formatCPF, formatMoney } from '@/scripts/utils/dataFormatter';
import { Table } from 'flowbite-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Commissions() {
  const [isLoading, setIsLoading] = useState(true);
  // Table data
  const [data, setData] = useState([]);

  // Filters data - what is selected to filter the data
  const [filterLabel, setFilterLabel] = useState<commissionFilterLabels>({
    clientCNPJ: null,
    sellerCPF: null,
    productID: null,
  });
  const [filters, setFilters] = useState<commissionFilters>({
    date: null,
    clientCNPJ: null,
    sellerCPF: null,
    productID: null,
    prodClass: null,
    clientsFirstPurchase: null,
    page: 1,
    limit: 30,
  });
  const handleColumnFilter = (filter: string, label: string | null, value: string | null) =>{
    filters[filter] = value;
    filterLabel[filter] = label
    getData();
  }
  
  // Sort labels
  const [sortLabel, setSortLabel] = useState<SortLabelType>({
    sharedSort: null,
  })
  const [sortTarget, setSortTarget] = useState<string | null>(null)

  // Functions to change the sorting on click
  // *TODO This function works and gives you an arrow but i am too lazy to implement it right now, will stick with the big ternary for now
  const setSortArrowDirection = (sort : keyof SortLabelType, target : any, equal : any) =>{
    if (sort == null){
      return null
    }
    else if (sort != null){
      if(sortLabel[sort] && sortTarget === target){
      if(equal){
        return '↑'
      }
      else{
        return '↓'
      }
    }
    }
   return null
 }

  const changeDateSorting = (killSwitch? : boolean) => {
    if (killSwitch) {
      setSortLabel({ ...sortLabel, sharedSort: null });
      return;
    }
    const sortedData = [...data].sort((a : {date : string}, b: {date : string}) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      // If dateSort label is 'asc', sort in ascending order, otherwise sort in descending order
      return sortLabel.sharedSort === 'Mais Recente' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  
    setData(sortedData);
    setSortLabel({ ...sortLabel, sharedSort: sortLabel.sharedSort === 'Mais Recente' ? 'Mais Velha' : 'Mais Recente' });
    setSortTarget('date')
  }
  const changeValueSorting = (killSwitch? : boolean) => {
    // This killswitch is not necessary because it's using the sharedSort but i will keep it here for consistency and..uh lazy reasons
    if (killSwitch) {
      setSortLabel({...sortLabel, sharedSort: null});
      return;
    }
    const sortedData = [...data].sort((a : {value : any}, b: {value : any}) => {
      // If sharedSort label is 'Maior Valor', sort in ascending order, otherwise sort in descending order
      return sortLabel.sharedSort === 'Maior Valor' ? a.value - b.value : b.value - a.value;
    });
    setData(sortedData);
    setSortTarget('value')
    setSortLabel({ ...sortLabel, sharedSort: sortLabel.sharedSort === 'Maior Valor' ? 'Menor Valor' : 'Maior Valor' });
  }
  const changeAlphabeticalSorting = (killSwitch? : boolean, target? : string[] ) => {
    // This killswitch is not necessary because it's using the sharedSort but i will keep it here for consistency and..uh lazy reasons
    if (killSwitch) {
      setSortLabel({...sortLabel, sharedSort: null});
      return;
    }
    if(target != null ){
    const sortedData = [...data].sort((a : any , b : any) => {

      // If sharedSort label is 'Menor Valor', sort in ascending order, otherwise sort in descending order
      return sortLabel.sharedSort === 'Alfabética Inversa' ? a[target[0]][target[1]].localeCompare(b[target[0]][target[1]]) : b[target[0]][target[1]].localeCompare(a[target[0]][target[1]]);
    });
    setData(sortedData);
    setSortTarget(target[0])
    setSortLabel({ ...sortLabel, sharedSort: sortLabel.sharedSort === 'Alfabética Inversa' ? 'Alfabética' : 'Alfabética Inversa' });
    }
    else{
      throw new Error("Target is null")
    }
  }

  // Function to get the data from the API
  async function getData() {
    setSortLabel({sharedSort: null})
    setIsLoading(true)
    let commissions = await getCommissionsWithFilter(filters, true)
    // set the data to the fetched data
    setData(commissions.data);
    setIsLoading(false)
  }
  function getExcelData(){
    const excelRows = data.map((row: commissionExcelTableRow) => {
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
    return excelRows
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <main> 
        <Head>
        <title>Nebulon - Tabela de Comissões</title>
        </Head>
        <Sidebar/>
        <ContentArea>
          <div className='w-full p-14'>
            <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
              <div>
                <section id="Options" className='w-full text-left flex justify-between pb-6'>
                  {/* Title */}
                  <div className="text-center">
                    <h1 className='text-6xl font-bold text-gray-900 '>Comissões</h1>
                  </div>
                  {/* Labels */}
                  <div className="inline-flex justify-end gap-2 items-end grow">
                      { filterLabel.sellerCPF ? 
                        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                          Seller: {filterLabel.sellerCPF}
                          <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" aria-label="Remove" onClick={()=>{handleColumnFilter("sellerCPF", null, null)}}>
                            <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Remove badge</span>
                          </button>
                        </span>
                        : null
                      } 
                      { filterLabel.clientCNPJ ? 
                        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        Client: {filterLabel.clientCNPJ}
                        <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" aria-label="Remove" onClick={()=>{handleColumnFilter("clientCNPJ", null, null)}}>
                          <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Remove badge</span>
                        </button>
                      </span>
                        : null
                      }
                      { filterLabel.productID ? 
                        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-pink-800 bg-pink-100 rounded dark:bg-pink-900 dark:text-pink-300">
                        Product: {filterLabel.productID}
                        <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-pink-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300" aria-label="Remove" onClick={()=>{handleColumnFilter("productID", null, null)}}>
                          <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Remove badge</span>
                        </button>
                      </span>
                        : null
                      }
                      {/* Labels for sort */}
                      { sortLabel.sharedSort ? 
                        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-900 bg-purple-200 dark:text-purple-200 dark:bg-purple-900 rounded">
                        Ordem: {sortLabel.sharedSort}
                        <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-purple-950 dark:hover:bg-purple-800 dark:hover:text-pink-300" aria-label="Remove" onClick={(e)=>{changeDateSorting(true)}}>
                          <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Remove badge</span>
                        </button>
                      </span>
                        : null
                      }
                  </div>
                  {/* Filters */}
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

                    <div className="inline-block m-4">
                      <input type="checkbox" name="firstPurchase" onChange={()=>{
                        filters.clientsFirstPurchase = !filters.clientsFirstPurchase
                        getData()
                        }}/>
                      <label htmlFor="firstPurchase" className="inline mb-2 text-lg font-medium text-gray-900"> 1ª compra</label>
                    </div>

                  </div>
                </section>

                {isLoading ? <div className='grid place-content-center '><LoaderAnim /></div>  :
                <Table className="w-100 rounded-lg bg-purple-500">
                  <Table.Head className='w-full text-left text-md text-[#fbfbfb]'>
                    <Table.HeadCell onClick={(e:any) => changeDateSorting()} className='cursor-pointer hover:text-gray-200 hover:scale-90 transition-all'>Data da Venda {sortLabel.sharedSort && sortTarget==='date'? sortLabel.sharedSort =='Mais Velha'? '\u2193': '\u2191' : null }</Table.HeadCell>
                    <Table.HeadCell onClick={(e:any) => changeAlphabeticalSorting(false,['seller_data','name'])} className='cursor-pointer hover:text-gray-200 hover:scale-90 transition-all'>Vendendor {sortLabel.sharedSort && sortTarget === 'seller_data' ? sortLabel.sharedSort =='Alfabética Inversa'? '\u2193': '\u2191' : null }</Table.HeadCell>
                    <Table.HeadCell>CPF do Vendendor</Table.HeadCell>
                    <Table.HeadCell onClick={(e:any) => changeAlphabeticalSorting(false,['client_data','tradingName'])} className='cursor-pointer hover:text-gray-200 hover:scale-90 transition-all'>Cliente {sortLabel.sharedSort && sortTarget === 'client_data'? sortLabel.sharedSort =='Alfabética Inversa' ? '\u2193': '\u2191' : null }</Table.HeadCell>
                    <Table.HeadCell>CNPJ/CPF do Cliente</Table.HeadCell>
                    <Table.HeadCell onClick={(e:any) => changeAlphabeticalSorting(false,['product_data','name'])} className='cursor-pointer hover:text-gray-200 hover:scale-90 transition-all'>Produto {sortLabel.sharedSort && sortTarget === 'product_data'? sortLabel.sharedSort =='Alfabética Inversa'? '\u2193': '\u2191' : null }</Table.HeadCell>
                    <Table.HeadCell>Comissão</Table.HeadCell> 
                    <Table.HeadCell onClick={(e:any) => changeValueSorting()} className='cursor-pointer hover:text-gray-200 hover:scale-90 transition-all'>Valor da Venda {sortLabel.sharedSort && sortTarget === 'value'? sortLabel.sharedSort =='Menor Valor'? '\u2193': '\u2191' : null }</Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="text-black px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    {data.map((commission: { date: string , value:string, commissionCut: any, clientsFirstPurchase: any, client_data: any, product_data: any, seller_data: any, paymentMethod:string }, index: number) => {                      
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
                          comm_value={commission.commissionCut}
                          clientsFirstPurchase={commission.clientsFirstPurchase}
                          handleFilters={handleColumnFilter}
                          handleDateSorting={changeDateSorting}
                          handleValueSorting={changeValueSorting}
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
                              <span className="ml-2">{formatMoney(data.reduce((acc, curr: any) => acc + parseFloat(curr.commissionCut), 0).toFixed(2), false)}</span> 
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
