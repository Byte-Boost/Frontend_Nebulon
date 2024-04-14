import '@/app/globals.css'
import ContentArea from '@/modules/content_area';
import QuickCard from '@/modules/quick_card';
import Sidebar from '@/modules/sidebar';
import TopBar from '@/modules/topbar';
import Head from 'next/head';
export default function Home() {



  
  return (
    <main>
      <Head>
        <title>Nebulon - Home</title>
      </Head>
      <TopBar/>
      <Sidebar/>
      <div>
        <ContentArea>
            <QuickCard link='/adicionar/comissao'>
              <div className='flex '>
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Adicionar nova Venda</h1>
              </div>     
            </QuickCard>
            <QuickCard  link={'/adicionar/cliente'}>
              <div className='flex '> 
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Adicionar Novo Cliente</h1> 
              </div> 
            </QuickCard>    
            <QuickCard  link={'/adicionar/vendedor'}>
              <div className='flex '>
              
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Adicionar Novo Vendedor</h1>  
              </div>     
            </QuickCard>
            <QuickCard  link={'/adicionar/produto'}>
              <div className='flex '>

              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Adicionar Novo Produto</h1>  
              </div>     
            </QuickCard>
        </ContentArea>
      </div>
    </main>
  );
}

