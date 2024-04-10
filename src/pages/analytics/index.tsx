import '@/app/globals.css'
import BarChart from '@/modules/barChart/index';
import Card from '@/modules/card/index';
import Navbar from '@/modules/navbar';
import PageContent from '@/modules/page_content';
import Sidebar from '@/modules/sidebar';
export default function Home() {

    // json data for testing bar chart 
    const data = require('@/json/test.json')

  return (
    <main>
        <Navbar/>
        <PageContent>
          <div className='flex grow flex-wrap gap-8 m-8 place-content-center'>
             <Card title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </Card> 
            <Card title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$2' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </Card> 
            <Card title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$3' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </Card> 
            <Card title='Vendas Em R$' width='50rem' height='25rem'>
              <BarChart id='VendasEmR$4' width='100%' height='20rem' title='Vendas Em R$' data = {data}/>
            </Card> 
          </div>
        </PageContent>
    </main>
  );
}

