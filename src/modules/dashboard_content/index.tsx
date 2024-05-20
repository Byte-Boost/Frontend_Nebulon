import { Card } from "flowbite-react";
import ChartTemplate from "../chart_template";
import NewSidebarItem from "../new_sidebar_item";
import DashboardNumberCard from "../dashboard_number_card";
import PieTemplate from "../pie_template";

const DashboardContent = () => {


  let defaultColor = ['rgba(210,65,108,0.7)']
  let dataX = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  let dataY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
      <div className='grid grid-cols-6 grid-rows-2 h-screen w-[calc(100%-3rem)]'>
        <div className='col-span-3 flex justify-center p-2'>
          <div className='grow flex justify-center border-2 rounded-lg'>
            <ChartTemplate type='bar' id='test1' title='Test 1' dataX={dataX} dataY={dataY} colors={defaultColor}/>
          </div>
        </div>
        <div className='col-span-2 flex justify-center p-2'>
          <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Opção 1</button>
            </div>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Opção 2</button>
            </div>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Voltar</button>
            </div>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Voltar</button>
            </div>

          </div>
        </div>

        <div className='row-span-2 flex justify-center p-2'>
          <Card className='grow flex flex-col p-4'>
            <DashboardNumberCard title="Total de Vendas" number="R$ 40.560" percentage="5,4%"/>
            <DashboardNumberCard title="Comissão Fevereiro" number="R$ 24.560" percentage="5,4%"/>
            <DashboardNumberCard title="Vendas Realizadas" number="541" percentage="5,4%"/>
          </Card>
        </div>

        <div className='col-span-2 flex justify-center p-2'>
          <div className='grow border-2 rounded-lg'>
            <PieTemplate id='test2' dataX={[1,2,3,4]} dataY={[10,20,30,15]} colors={defaultColor}/>
          </div>
        </div>
        <div className='flex justify-center p-2'>
          <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>

              <div className="text-left">
                <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Opção 1</button>
              </div>

              <div className="text-left">
                <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Opção 2</button>
              </div>

              <div className="text-left">
                <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Voltar</button>
              </div>

              <div className="text-left">
                <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Voltar</button>
              </div>

            </div>
        </div>

        <div className='col-span-2 flex justify-center p-2'>
          <Card className='grow'>Table</Card>
        </div>
      </div>
    );
  }
  export default DashboardContent;