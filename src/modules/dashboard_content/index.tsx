import { Card } from "flowbite-react";
import ChartTemplate from "../chart_template";
import NewSidebarItem from "../new_sidebar_item";
import DashboardNumberCard from "../dashboard_number_card";
import PieTemplate from "../pie_template";
import { useEffect, useState } from "react";
import instance from "@/scripts/requests/instance";
import { formatMoney } from "@/scripts/validation/dataFormatter";

const DashboardContent = () => {
  let months = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  }
  let currentMonth = new Date().getMonth() + 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  // Overall Stats
  const [data, setData] = useState([])
  const [dataY, setDataY] = useState([])
  const [dataX, setDataX] = useState<string[]>([]);
 
  // Current Month Stats
  const [quantitySellsCurrentMonth, setQuantitySellsCurrentMonth] = useState<number>(0);
  const [totalSellsValue, setTotalSellsValue] = useState<number>(0);
  const [totalComissionValueCurrentMonth, setTotalComissionValueCurrentMonth] = useState<number>(0);

  const [filterLabel, setFilterLabel] = useState<{
    client: string | null,
    seller: string | null,
    product: string | null,
  }>({
    client: null,
    seller: null,
    product: null,
  });
  async function getCurrentMonthInfo(){
    let now = new Date(Date.now());
    let start = new Date(now.setMonth(now.getMonth()));
    console.log(start)
    
    let start_month = `${start.getFullYear()}-${start.getMonth() + 1}-${1}` 
    let end_month = `${start.getFullYear()}-${start.getMonth() + 1}-${31}` ;
    
    console.log(start_month)
    console.log(end_month)
    
    const commissions = await instance.get("/commissions" ,{params :{
     after: start_month,
     before: end_month
    }});

    console.log(commissions.data)
     
    setQuantitySellsCurrentMonth(commissions.data.length);
    setTotalComissionValueCurrentMonth(commissions.data.reduce((acc: number, item: any) => acc + item.value, 0))
    console.log(totalComissionValueCurrentMonth)
  }

  async function getData() {
    getCurrentMonthInfo();

    let now = new Date(Date.now());
    let start = new Date(now.setMonth(now.getMonth()));
    
    let start_month = `${start.getFullYear()}-${0+ 1}-${1}` 
    let end_month = `${start.getFullYear()}-${11+ 1}-${31}` ;

    const commissions = await instance.get("/commissions" ,{params :{
      after: start_month,
      before: end_month
    }});
    
    console.log(commissions.data)

    setDataX(commissions.data.map((item: any) => item.id));
    setDataY(commissions.data.map((item: any) => item.value));
    
    setTotalSellsValue(commissions.data.reduce((acc: number, item: any) => acc + item.value, 0));
    console.log(totalSellsValue)
  }


  /*
    TODO 
      - Implement the logic to filter the data 
      - Filter by date
      - Admin sees different data
      - holy moly this is gonna be a massive request.  
  */

  // console.log(data)
  // console.log(dataX)
  // console.log(dataY)
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
            <DashboardNumberCard title={`Total de Vendas (${(new Date()).getFullYear()})`}number={`${formatMoney(totalSellsValue.toString() + "00")}`} percentage="5,4%"/>
            <DashboardNumberCard title={`Comissão ${months[currentMonth]}`} number={`${formatMoney(totalComissionValueCurrentMonth.toString() + "00")}`} percentage="5,4%"/>
            <DashboardNumberCard title={`Vendas Realizadas | ${currentMonth + '/' + (new Date()).getFullYear()}`} number={`${quantitySellsCurrentMonth}`} percentage="5,4%"/>
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