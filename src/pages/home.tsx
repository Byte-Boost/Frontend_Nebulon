import '@/app/globals.css'
import DashboardContent from '@/modules/dashboard_content';
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
    </main>
  );
}

