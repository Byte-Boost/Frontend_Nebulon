import '@/app/globals.css'
import LoginFormCard from '@/modules/login_card';
import Head from 'next/head';
export default function Login() {
  return (
    <main>
        <Head>
        <title>Nebulon - Login</title>
        </Head>
        <LoginFormCard/>
    </main>
  );
}

