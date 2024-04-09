import '@/app/globals.css'
import BarChart from '@/modules/barChart/index';
import Card from '@/modules/card/index';
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
export default function Home() {
  return (
    <main>
        <Navbar/>
        <div className='flex flex-row'>
        <Sidebar/>
          <div className='flex grow flex-wrap gap-8 m-8 place-content-center'>

            {/* Test Cards, if you want a '''''working''''' preview

            <Card title='Titulo test' width='100rem' height="50rem">
              <BarChart id='test1' width='100%' height="45rem"/>
            </Card>
            <Card title='Anotacoes' width='20rem' height="10rem">
              Anotacoes loucas eeeeeaaaaaaofjoiefhwuiehfweikfjoi
            </Card>
            <Card title='Titulo test' width='50rem' height="25rem">
              <BarChart id='test2' width='100%' height="20rem"/>
            </Card>
            <Card title='Anotacoes' width='20rem' height="10rem">
              Anotacoes loucas eeeeeaaaaaaofjoiefhwuiehfweikfjoi
            </Card>
            <Card title='Anotacoes' width='20rem' height="10rem">
              Anotacoes loucas eeeeeaaaaaaofjoiefhwuiehfweikfjoi
            </Card>
            <Card title='Anotacoes' width='20rem' height="10rem">
              Anotacoes loucas eeeeeaaaaaaofjoiefhwuiehfweikfjoi
            </Card>
            <Card title='Anotacoes' width='20rem' height="10rem">
              Anotacoes loucas eeeeeaaaaaaofjoiefhwuiehfweikfjoi
            </Card> */}

          </div>
        </div>
    </main>
  );
}

