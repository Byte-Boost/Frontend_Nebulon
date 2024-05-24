import { Card } from "flowbite-react";
import ChartTemplate from "../chart_template";
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
  const [totalSellsPerMonth, setTotalSellsPerMonth] = useState({});

  const [filterLabel, setFilterLabel] = useState<{
    client: string | null,
    seller: string | null,
    product: string | null,
  }>({
    client: null,
    seller: null,
    product: null,
  });

  async function getDataForGraph() {
    let now = new Date(Date.now());
    let promises = [];
  
    for(let i = 0; i < 11; i++){
      let newDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      let month_start = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${1}`
      let month_end = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${31}` ;
  
      promises.push(
        instance.get("/commissions/stats", {params :{
          sale_value_after: month_start,
          sale_value_before: month_end,
        }})
      );
    }
  
    const results = await Promise.all(promises);
    let newTotalSellsPerMonth : {[key: string]: number} = {...totalSellsPerMonth};
  
    results.reverse().forEach((commissions_12m, i) => {
      let newDate = new Date(now.getFullYear(), now.getMonth() - (results.length - 1 - i), 1);
      newTotalSellsPerMonth[MonthName(newDate)+'/'+newDate.getFullYear()] = commissions_12m.data.saleValue;
    });
  
    setTotalSellsPerMonth(newTotalSellsPerMonth);
  }
  
  async function getOverallData(){
    let now = new Date(Date.now());
    let start = new Date(now.setMonth(now.getMonth()));

    let current_year_start = `${start.getFullYear()}-${0+ 1}-${1}`;
    let current_year_end = `${start.getFullYear()}-${11+ 1}-${31}`;

    let current_month_start = `${start.getFullYear()}-${start.getMonth() + 1}-${1}`
    let current_month_end = `${start.getFullYear()}-${start.getMonth() + 1}-${31}` ;

    const commissions_stats = await instance.get("/commissions/stats" ,{params :{
      comm_value_after: current_month_start,
      comm_value_before: current_month_end,

      sale_value_after: current_year_start,
      sale_value_before: current_year_end,
      
      sale_qty_after: current_month_start,
      sale_qty_before: current_month_end
    }});

    
    setTotalSellsValue(commissions_stats.data.saleValue);
    setQuantitySellsCurrentMonth(commissions_stats.data.saleQty);
    setTotalComissionValueCurrentMonth(commissions_stats.data.commValue);
  }
  
  async function getData() {
    getDataForGraph();
    getOverallData();
  }
  useEffect(() => {
    const newKeys = Object.keys(totalSellsPerMonth);
    const newValues = Object.values(totalSellsPerMonth);
  
    const filteredKeys = newKeys.filter((key) => !dataX.includes(key));
    const filteredValues = newValues.slice(0, filteredKeys.length);

    setDataX([...filteredKeys,...dataX]);
    setDataY([...filteredValues,...dataY] as never[]);
  }, [totalSellsPerMonth]);

  /*
    TODO.  
      - Get Info for the piechart
      - Filters for Linechart
      - Filters for Piechart
      - Scoreboard table
      - add button to change month in the values on the right
  */

  useEffect(() => {getData()}, []);

  return (
    <div className='grid grid-cols-6 grid-rows-2 h-screen w-[calc(100%-3rem)]'>
      <div id="lineGraph" className='col-span-3 flex justify-center p-2'>
        <Card className='grow flex justify-center'>
          <ChartTemplate type='line' id='last12m' title='last12m' dataX={dataX} dataY={dataY} colors={['rgb(147 ,51 ,234)']} />
        </Card>
      </div>

      <div id="scoreBoard" className='col-span-2 flex justify-center p-2'>
        <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>
          <Card className='grow flex justify-center'>
          </Card>
        </div>
      </div>

      <div id="infoBar" className='row-span-2 flex justify-center p-2'>
        <Card className='grow flex flex-col p-4'>
          <DashboardNumberCard title={`Total de Vendas (${(new Date()).getFullYear()})`}number={`${formatMoney(totalSellsValue.toString() + "00")}`} percentage="5,4%"/>
          <DashboardNumberCard title={`Comissão ${MonthName(new Date())}`} number={`${formatMoney(totalComissionValueCurrentMonth.toString() + "00")}`} percentage="5,4%"/>
          <DashboardNumberCard title={`Vendas Realizadas | ${(currentMonthIndex+1) + '/' + (new Date()).getFullYear()}`} number={`${quantitySellsCurrentMonth}`} percentage="5,4%"/>
        </Card>
      </div>

      <div id="pieChart" className='col-span-2 flex justify-center p-2'>
        <div className='grow border-2 rounded-lg'>
          <PieTemplate id='test2' dataX={[1,2,3,4]} dataY={[10,20,30,15]} colors={['#41D2A7','#2f2f2f', '#805C90', 'red']}/>
        </div>
      </div>
      
      <div id="pieChartOpt" className='flex justify-center p-2'>
        <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Vendedores</button>
            </div>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Produtos</button>
            </div>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Clientes</button>
            </div>

            <div className="text-left">
              <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Comissões</button>
            </div>

          </div>
      </div>

      <div id="timeOpt" className='col-span-2 flex justify-center p-2'>
        <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>
          <div className="text-left">
            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Ultimo mês</button>
          </div>

          <div className="text-left">
            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Ultimos 3 meses</button>
          </div>

          <div className="text-left">
            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Ultimos 6 meses</button>
          </div>

          <div className="text-left">
            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>Ultimos 12 meses</button>
          </div>
        </div>
      </div>
    </div>
  );

}
  export default DashboardContent;