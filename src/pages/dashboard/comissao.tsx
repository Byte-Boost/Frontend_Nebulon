import '@/app/globals.css'
import ClientTableRow from '@/modules/client_table_row';
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
                <div>
                  <select name="dateSelect" id="dateSelect" onChange={()=>{
                    filters.date = parseInt((document.getElementById('dateSelect') as HTMLSelectElement).value)
                    getData()
                  }}>
                    <option value={0}>All</option>
                    <option value={1}>Last month</option>
                    <option value={2}>Last 3 months</option>
                    <option value={3}>Last 6 months</option>
                    <option value={4}>Last year</option>
                  </select>
                  <select name="prodSelect" id="prodSelect" onChange={()=>{
                    filters.prodClass = parseInt((document.getElementById('prodSelect') as HTMLSelectElement).value)
                    getData()
                  }}>
                    <option value={-1}>Any</option>
                    <option value={0}>New</option>
                    <option value={1}>Old</option>
                  </select>
                  <select name="clientSelect" id="clientSelect" onChange={()=>{
                    filters.clientClass = parseInt((document.getElementById('clientSelect') as HTMLSelectElement).value)
                    getData()
                  }}>
                    <option value={-1}>Any</option>
                    <option value={0}>New</option>
                    <option value={1}>Old</option>
                  </select>
                </div>
                <Table className=" rounded-lg bg-purple-500  text-white">
                  <Table.Head className='w-full text-left text-md'>
                    <Table.HeadCell>Data da Venda</Table.HeadCell>
                    <Table.HeadCell>Vendendor</Table.HeadCell>
                    <Table.HeadCell>CPF do Vendendor</Table.HeadCell>
                    <Table.HeadCell>Cliente</Table.HeadCell>
                    <Table.HeadCell>CNPJ/CPF do Cliente</Table.HeadCell>
                    <Table.HeadCell>Produto</Table.HeadCell>
                    <Table.HeadCell>Valor da Venda</Table.HeadCell>
                    <Table.HeadCell>Comissão</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    {data.map((commission: { date: string , value:string, clientId:number, productId:number, sellerId:number, paymentMethod:string }, index: number) => {
                      return (
                        <ClientTableRow
                          key={index}
                          date={commission.date}
                          seller_id={commission.sellerId}
                          client_id={commission.clientId}
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
