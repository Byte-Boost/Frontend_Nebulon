import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import DashboardContent from '@/modules/dashboard_content';
import QuickCard from '@/modules/quick_card';
import Sidebar from '@/modules/sidebar';
import Head from 'next/head';
export default function Home() {

  return (
    <main>
      <Head>
        <title>Nebulon - Home</title>
      </Head>
      <Sidebar/>
      <div className='flex flex-row-reverse w-[calc(100%-2rem)]'>
        <DashboardContent/>
      </div>

      {/*
      <ContentArea>
            <QuickCard link='/adicionar/comissao'>
              <div className='flex justify-center items-center'> 
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Adicionar Nova Comissão</h1>    
              </div>     
            </QuickCard>
            <QuickCard  link={'/dashboard/comissao'}>
              <div className='flex justify-center items-center'> 
               
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Olhar Tabela de Vendas</h1>   
              </div> 
            </QuickCard>    
        </ContentArea>
      */}

    </main>
  );
}

