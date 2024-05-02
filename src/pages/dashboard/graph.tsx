import '@/app/globals.css'
import BarChart from '@/modules/bar_chart/index';
import GraphCard from '@/modules/graph_card';
import ContentArea from '@/modules/content_area';
//import TopBar from '@/modules/topbar';
import Sidebar from '@/modules/sidebar';
import Head from 'next/head';
export default function Home() {

    // json data for testing bar chart 
    const data = require('@/json/test.json')


    let dataX = [1,2,3]
    let dataY = [0,0,0]
    

  return (
    <main>
        <Head>
        <title>Nebulon - Dashboard</title>
        </Head>
        {/* <TopBar/> */}
        <Sidebar/>
        <ContentArea>
          <div className='flex grow flex-wrap gap-8 m-8 place-content-center'>
             <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart type='line' id='VendasEmR$' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX} dataY = {dataY}/>
            </GraphCard> 
            <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart type='bar' id='VendasEmR$2' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX} dataY = {dataY}/>
            </GraphCard> 
            <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart type='bar' id='VendasEmR$3' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX} dataY = {dataY}/>
            </GraphCard> 
            <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart type='bar' id='VendasEmR$4' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX} dataY = {dataY}/>
            </GraphCard> 
          </div>
        </ContentArea>
    </main>
  );
}

