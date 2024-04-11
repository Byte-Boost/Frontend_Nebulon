import '@/app/globals.css'
import BarChart from '@/modules/bar_chart/index';
import GraphCard from '@/modules/graph_card';
import ContentArea from '@/modules/content_area';
import TopBar from '@/modules/topbar';
import Sidebar from '@/modules/sidebar';
export default function Home() {

    // json data for testing bar chart 
    const data = require('@/json/test.json')

  return (
    <main>
        <TopBar/>
        <Sidebar/>
        <ContentArea>
          <div className='flex grow flex-wrap gap-8 m-8 place-content-center'>
             <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </GraphCard> 
            <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$2' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </GraphCard> 
            <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$3' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </GraphCard> 
            <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$4' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </GraphCard> 
          </div>
        </ContentArea>
    </main>
  );
}

