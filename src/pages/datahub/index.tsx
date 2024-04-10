import '@/app/globals.css'
import BarChart from '@/modules/barChart/index';
import Card from '@/modules/card/index';
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
export default function Home() {

  // json data for bar chart
  // const data = require('../json/test.json')

  return (
    <main>
        <Navbar/>
        <div className='flex flex-row min-h-full h-full '>
        <Sidebar/>
          <div className='flex grow flex-wrap gap-8 m-8 place-content-center'>

          </div>
        </div>
    </main>
  );
}

