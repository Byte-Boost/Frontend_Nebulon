import { Card } from "flowbite-react";
import ChartTemplate from "../chart_template";
import NewSidebarItem from "../new_sidebar_item";
import DashboardNumberCard from "../dashboard_number_card";
import PieTemplate from "../pie_template";
import { useEffect, useState } from "react";
import instance from "@/scripts/requests/instance";

const DashboardContent = () => {

  const [data, setData] = useState([])
  const [dataY, setDataY] = useState([])
  const [dataX, setDataX] = useState<string[]>([]);

  const [filterLabel, setFilterLabel] = useState<{
    client: string | null,
    seller: string | null,
    product: string | null,
  }>({
    client: null,
    seller: null,
    product: null,
  });

  async function getData() {
    const commissions = await instance.get("/commissions");
    console.log(commissions.data)
    setData(commissions.data);
    setDataX(commissions.data.map((item: any) => item.id));
    setDataY(commissions.data.map((item: any) => item.value));
  }


  /*TODO - Implement the logic to filter the data 
      - Filter by date
      - Admin sees different data
  */

  console.log(data)
  console.log(dataX)
  console.log(dataY)
  useEffect(() => {
    getData();
    setInterval(() => {
      getData();
    }, 60000);
  }, []);

    return (
      <div className='grid grid-cols-6 grid-rows-2 h-screen w-[calc(100%-3rem)]'>
        <div className='col-span-3 flex justify-center p-2'>

          <Card className='grow flex justify-center'>
            <ChartTemplate type='bar' id='test1' title='Test 1' dataX={dataX} dataY={dataY} />
          </Card>
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
            <PieTemplate id='test2' dataX={[1,2,3,4]} dataY={[10,20,30,15]} colors={['#41D2A7','#2f2f2f', '#805C90', 'red']}/>
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