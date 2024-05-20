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
      <div>
        <DashboardContent/> 
      </div>
    </main>
  );
}

