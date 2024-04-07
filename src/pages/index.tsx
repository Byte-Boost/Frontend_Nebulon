import '@/app/globals.css'
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
import Content from '@/modules/content';
export default function Home() {
  return (
    <main>
        <Navbar/>
        <section className='grid grid-flow-col-dense'> {/* Fix later now i am tired */}
          <Sidebar/>
          <Content header='/Home'>
            <p>a</p>
          </Content>
        </section>
    </main>
  );
}
