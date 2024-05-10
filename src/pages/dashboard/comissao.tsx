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
  const [filters, setFilters] = useState({
    date: 0,
    prodClass: -1,
    clientClass: -1,
  });

  async function filterAsync(array: Array<any>, filter: any){
    const filterResults = await Promise.all(array.map(filter));
    return array.filter((_, index) => filterResults[index]);
  }
  
  async function getData() {
    let dateRange = [0, 1, 3, 6, 12]
    const commissions = await instance.get("/commissions");
    const filteredCommissions: any = await filterAsync(commissions.data, (async (commission: any) =>{
      // Filter booleans
      let dateFilterBool: boolean = true;
      let prodClassFilterBool: boolean = true;
      let clientClassFilterBool: boolean = true;

      // First filter (DATE)
      if ([1,2,3,4].includes(filters.date)){
        const now = new Date(Date.now());
        const start = now.setMonth(now.getMonth() - dateRange[filters.date]);
        const end = Date.now();
        const d = Date.parse(commission.date);
        dateFilterBool = d.valueOf() >= start.valueOf() && d.valueOf() <= end.valueOf()
      } 
      // Second filter (PRODUCT CLASS)
      if ([0,1].includes(filters.prodClass)){
        let productData = await instance.get(`/products/` + commission.productId);
        prodClassFilterBool = productData.data.status == filters.prodClass;
      } 
      // Third filter (CLIENT CLASS)
      if ([0,1].includes(filters.clientClass)){
        let clientData = await instance.get(`/clients/` + commission.clientId);
        clientClassFilterBool = clientData.data.status == filters.clientClass;
      } 

      return (dateFilterBool && prodClassFilterBool && clientClassFilterBool);
      
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
                      
                      
{/*                       <div className="inline-block m-4">
                        <label htmlFor="prodSelect" className="block mb-2 text-lg font-medium text-gray-900">Tipo de produto</label>
                        <select className="rounded-lg block w-full p-2.5" name="prodSelect" id="prodSelect" onChange={()=>{
                          filters.prodClass = parseInt((document.getElementById('prodSelect') as HTMLSelectElement).value)
                          getData()
                        }}>
                          <option value={-1}>Qualquer</option>
                          <option value={0}>Novo</option>
                          <option value={1}>Velho</option>
                        </select>
                      </div>
                      

                      <div className="inline-block m-4">
                        <label htmlFor="clientSelect" className="block mb-2 text-lg font-medium text-gray-900">Tipo de cliente</label>
                        <select className="rounded-lg block w-full p-2.5" name="clientSelect" id="clientSelect" onChange={()=>{
                          filters.clientClass = parseInt((document.getElementById('clientSelect') as HTMLSelectElement).value)
                          getData()
                        }}>
                          <option value={-1}>Qualquer</option>
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
                    {data.map((commission: { date: string , value:string, clientCNPJ:number, productId:number, sellerCPF:number, paymentMethod:string }, index: number) => {
                      return (
                        <CommissionTableRow
                          key={index}
                          date={commission.date}
                          seller_cpf={commission.sellerCPF}
                          client_cnpj={commission.clientCNPJ}
                          product_id={commission.productId}
                          sale_value={parseFloat(commission.value)}
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
