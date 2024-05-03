import '@/app/globals.css'
import UserFormCard from '@/modules/register';
import Head from 'next/head';
export default function Login() {
  return (
    <main>
        <Head>
        <title>Nebulon - Sign up</title>
        </Head>
        <UserFormCard/>
    </main>
  );
}

