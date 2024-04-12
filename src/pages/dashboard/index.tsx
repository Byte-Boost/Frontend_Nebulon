import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import QuickCard from '@/modules/quick_card';
import GraphIcon from '@/modules/quick_card_icons/graphs_icon';
import TableIcon from '@/modules/quick_card_icons/tables_icon';
import Sidebar from '@/modules/sidebar';
import TopBar from '@/modules/topbar';
import Head from 'next/head';
export default function Home() {

  return (
    <main>
        <Head>
        <title>Nebulon - Dashboard</title>
        </Head>
        <TopBar/>
        <Sidebar/>
        <ContentArea>
        <QuickCard link='/dashboard/client'>
              <div className='flex justify-center items-center'> 
              <TableIcon/>
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Tables</h1>
              </div>     
            </QuickCard>
            <QuickCard  link={'/dashboard/graph'}>
              <div className='flex justify-center items-center'> 
              <GraphIcon/>
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Graphs</h1> 
              </div> 
            </QuickCard>    
        </ContentArea>
    </main>
  );
}

