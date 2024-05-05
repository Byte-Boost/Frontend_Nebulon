import '@/app/globals.css'
import UserFormCard from '@/modules/register';
import Head from 'next/head';
import Sidebar from '@/modules/sidebar';
export default function registerUser() {
  return (
    <main>
        <Head>
        <title>Nebulon - Register seller</title>
        </Head>
        <Sidebar/>
        <UserFormCard/>
    </main>
  );
}

