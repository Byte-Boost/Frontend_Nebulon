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
            <QuickCard>
              <div></div> 
              <div className='bg-white drop-shadow-2xl z-1'>a</div>     
            </QuickCard>
            <QuickCard children={undefined}/>
            <QuickCard children={undefined}/>
        </ContentArea>
      </div>
    </main>
  );
}

