import '@/app/globals.css'
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
export default function Home() {
  return (
    <main>
        <Navbar/>
        <div className='flex flex-row'>
        <Sidebar/>
          {/* Page Content */}
          <p>Hello</p>
        </div>
    </main>
  );
}
