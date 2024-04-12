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
            <QuickCard link='/add/commission'>
              <div className='flex '>
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Add New Commission</h1>
              </div>     
            </QuickCard>
            <QuickCard  link={'/add/client'}>
              <div className='flex '> 
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Add New Client</h1> 
              </div> 
            </QuickCard>    
            <QuickCard  link={'/add/seller'}>
              <div className='flex '>
              
              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Add New Seller</h1>  
              </div>     
            </QuickCard>
            <QuickCard  link={'/add/product'}>
              <div className='flex '>

              </div> 
              <div className='bg-[#E6E6E6]'>
              <h1 className='inline-block  self-end'>Add New Product</h1>  
              </div>     
            </QuickCard>
        </ContentArea>
      </div>
    </main>
  );
}

