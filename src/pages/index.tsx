import '@/app/globals.css'
import Card from '@/modules/card/index';
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
export default function Home() {
  return (
    <main>
        <Navbar/>
        <div className='flex flex-row'>
        <Sidebar/>
          {/* Page Content */}
          {/* <p>Hello</p> */}
          <div className='grid grid-flow-row-dense grid-cols-3 m-5 grow place-content-stretch'>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
    </main>
  );
}

