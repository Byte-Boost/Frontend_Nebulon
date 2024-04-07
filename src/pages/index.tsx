import '@/app/globals.css'
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
export default function Home() {
  return (
    <main>
        <Navbar/>
          <Sidebar/>
    </main>
  );
}
