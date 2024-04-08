import '@/app/globals.css'
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
export default function Home() {
  return (
    <main>
        <Navbar/>
        <div className='flex flex-row'>
        <Sidebar/>
          <div className='grid grid-flow-row-dense grid-cols-3 m-5 grow place-content-stretch'>
          </div>
        </div>
    </main>
  );
}

