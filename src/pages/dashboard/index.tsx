import '@/app/globals.css'
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
    </main>
  );
}

