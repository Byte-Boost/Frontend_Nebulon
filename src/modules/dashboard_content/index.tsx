import { Card } from "flowbite-react";
import ChartTemplate from "../chart_template";
import NewSidebarItem from "../new_sidebar_item";
import DashboardNumberCard from "../dashboard_number_card";
import PieTemplate from "../pie_template";
import { useEffect, useState } from "react";
import instance from "@/scripts/requests/instance";
import { formatMoney } from "@/scripts/validation/dataFormatter";

const DashboardContent = () => {
  let currentMonthIndex= Number(new Date().getMonth());
  let MonthName = (date: Date)=>{
    let str = date.toLocaleString('pt-BR', { month: 'long' })
    return str.charAt(0).toUpperCase() + str.slice(1)
  };

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

  async function getDataForGraph(){
    
  }
  async function getOverallData(){
    let now = new Date(Date.now());
    let start = new Date(now.setMonth(now.getMonth()));
    
    let current_year_start = `${start.getFullYear()}-${0+ 1}-${1}`;
    let current_year_end = `${start.getFullYear()}-${11+ 1}-${31}`;

    let current_month_start = `${start.getFullYear()}-${start.getMonth() + 1}-${1}`
    let current_month_end = `${start.getFullYear()}-${start.getMonth() + 1}-${31}` ;
    
    const commissions = await instance.get("/commissions/stats" ,{params :{
      comm_value_after: current_month_start,
      comm_value_before: current_month_end,

      sale_value_after: current_year_start,
      sale_value_before: current_year_end,
      
      sale_qty_after: current_month_start,
      sale_qty_before: current_month_end
    }});
    console.log(commissions.data)

    // setDataX(commissions.data.map((item: any) => item.id));
    // setDataY(commissions.data.map((item: any) => item.value));
    
    setTotalSellsValue(commissions.data.saleValue);
    setQuantitySellsCurrentMonth(commissions.data.saleQty);
    setTotalComissionValueCurrentMonth(commissions.data.commValue);
    console.log(totalComissionValueCurrentMonth)
  }
  
  async function getData() {
    getDataForGraph();
    getOverallData();
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
            <DashboardNumberCard title={`Comissão ${MonthName(new Date())}`} number={`${formatMoney(totalComissionValueCurrentMonth.toString() + "00")}`} percentage="5,4%"/>
            <DashboardNumberCard title={`Vendas Realizadas | ${(currentMonthIndex+1) + '/' + (new Date()).getFullYear()}`} number={`${quantitySellsCurrentMonth}`} percentage="5,4%"/>
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