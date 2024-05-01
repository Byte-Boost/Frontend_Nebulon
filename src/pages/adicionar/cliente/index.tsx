import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import QuickCard from '@/modules/quick_card';
import Sidebar from '@/modules/sidebar';
import Head from 'next/head';
export default function Home() {



  
  return (
    <main>
      <Head>
        <title>Nebulon - Cliente</title>
      </Head>
      <Sidebar/>
      <div>
        <ContentArea>
            <QuickCard link='/adicionar/cliente/formulario'>
              <div className='flex '>
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Utilizando Formulario</h1>
              </div>     
            </QuickCard>
            <QuickCard  link={'/adicionar/cliente/excel'}>
              <div className='flex '> 
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Utilizando Excel</h1> 
              </div> 
            </QuickCard>    
        </ContentArea>
      </div>
    </main>
  );
}

