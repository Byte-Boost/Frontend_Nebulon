import '@/app/globals.css'
import DashboardNumberCard from '@/modules/dashboard_number_card';
import Sidebar from '@/modules/sidebar';
import instance from '@/scripts/http-requests/instance';
import { formatMoney } from '@/scripts/utils/dataFormatter';
import { Card } from 'flowbite-react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Graph = dynamic(() => import('@/modules/graph'), { ssr: false });

export default function Test() {
    let currentMonthIndex= Number(new Date().getMonth());
    let MonthName = (date: Date)=>{
      let str = date.toLocaleString('pt-BR', { month: 'long' })
      return str.charAt(0).toUpperCase() + str.slice(1)
    };
    // const ChartTemplate = dynamic(() => import('@/modules/chart_template'), { ssr: false });
  
    const [fetchDataFromLastMonths, setFetchDataFromLastMonths] = useState<number>(13); 
    // Overall Stats
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
    
      for(let i = 0; i < fetchDataFromLastMonths; i++){
  
        let newDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        let month_start = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${1}`;
        
        // Get the last day of the current month
        let lastDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
        let month_end = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${lastDayOfMonth}`;
  
        promises.push(
          instance.get("/commissions/stats", {params :{
            sale_value_after: month_start,
            sale_value_before: month_end,
          }})
        );
      }
      // Fetch all the data from the API
      const results = await Promise.all(promises);
      // Create a new object with the total sells per month
      let newTotalSellsPerMonth : {[key: string]: number} = {...totalSellsPerMonth};
      // Reverse the array to get the months in ascending order
      results.reverse().forEach((commissions_12m, i) => {
        let newDate = new Date(now.getFullYear(), now.getMonth() - (results.length - 1 - i), 1);
        newTotalSellsPerMonth[MonthName(newDate)+'/'+newDate.getFullYear()] = commissions_12m.data.saleValue;
      });
      setTotalSellsPerMonth(newTotalSellsPerMonth);
    }
    async function getOverallData(){

      let now = new Date(Date.now());
      let start = new Date(now.setMonth(now.getMonth()));
  
      // Gets the first and last day of the current year
      let current_year_start = `${start.getFullYear()}-${1}-${1}`;
      let current_year_end = `${start.getFullYear()}-${12}-${31}`;
  
      // Gets the first and last day of the current month
      let current_month_start = `${start.getFullYear()}-${start.getMonth() + 1}-${1}`;
  
      // Get the last day of the current month
      let lastDayOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
      let current_month_end =new Date(`${start.getFullYear()}-${'0'+ (start.getMonth() + 1)}-${lastDayOfMonth}`);
      
      // Fetches the data from the API
      const commissions_stats = await instance.get("/commissions/stats" ,{params :{
        comm_value_after: current_month_start,
        comm_value_before: current_month_end,
  
        sale_value_after: current_year_start,
        sale_value_before: current_year_end,
        
        sale_qty_after: current_month_start,
        sale_qty_before: current_month_end
      }});
  
      
      // Sets the data to the states
      setTotalSellsValue(commissions_stats.data.saleValue);
      setQuantitySellsCurrentMonth(commissions_stats.data.saleQty);
      setTotalComissionValueCurrentMonth(commissions_stats.data.commValue);
    }
    useEffect(() => {
      console.log(totalSellsPerMonth);
    }, [totalComissionValueCurrentMonth]);
    async function getData() {
      getDataForGraph();
      getOverallData();
    }
    useEffect(() => {
      // Get the keys and values from totalSellsPerMonth
      const newKeys = Object.keys(totalSellsPerMonth);
      const newValues = Object.values(totalSellsPerMonth);
  
      // Filter out the keys that are already included in dataX
      const filteredKeys = newKeys.filter((key) => !dataX.includes(key));
  
      // Get the corresponding values for the filtered keys
      const filteredValues = newValues.slice(0, filteredKeys.length);
  
      // Update dataX and dataY with the new keys and values
      setDataX([...filteredKeys,...dataX]);
      setDataY([...filteredValues,...dataY] as never[]);
    }, [totalSellsPerMonth]);
  
  
    useEffect(() => {getData()}, []);
    useEffect(() => {console.log(dataX)}, [dataX]);
  return (
    <main className='h-screen w-screen'>
      <Head>
        <title>Nebulon - Home</title>
      </Head>
      <Sidebar/>
      <div className=' ml-[3.4rem] flex flex-row w-[calc(100%-3.4rem)] md:h-screen h-fit md:flex-nowrap flex-wrap'>
        <div className='flex flex-col w-full md:h-full h-fit '>
            {/*top*/}
            <div className='flex md:flex-row w-full h-1/2 flex-col'>
                <div id="lineChart" className=' md:w-2/3 md:h-full h-72 col-span-2 flex justify-center p-2'>
                    <div className='grow border-2 rounded-lg '>
                    <Graph 
                        height={'100%'}
                        type="line" 
                        series={[{name:"", data: dataY}]} 
                        options={{ 
                            chart: { id: 'vendas' }, 
                            xaxis: { 
                                categories: dataX,
                                labels: {
                                    style: {
                                      
                                    }
                                }
                            },
                            yaxis: {
                                labels: {
                                    formatter: (value) => {
                                        return new Intl.NumberFormat('pt-BR', ).format(value);
                                    }
                                }
                            },
                            tooltip: {
                                y: {
                                    formatter: (value) => {
                                        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
                                    }
                                }
                            },

                            colors: ['rgb(147,51,234)'],
                            stroke: {
                                width: 2, // specify the width of the line
                                curve: 'smooth' // specify the type of the line (smooth, straight, etc.)
                            }
                        }} 
                    />
                    </div>
                </div>
                <div id="scoreBoard" className='col-span-2 flex justify-center p-2 md:w-1/3 md:h-full h-1/3'>
                    <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>
                        <Card className='grow flex justify-center'>
                        </Card>
                    </div>
                </div>
            </div>
            {/*bottom*/}
            <div className='flex md:flex-row  w-full h-1/2 flex-col'>
                <div id="pieChart" className=' md:w-1/2 md:h-full h-72 col-span-2 flex justify-center p-2'>
                    <div className='grow border-2 rounded-lg '>
                    <Graph
                        height={'100%'}
                        width={'100%'}
                        type="pie" 
                        series={[...dataY].reverse().slice(0,4)} 
                        options={{ labels: ['Prod. Novo p/ Cli. Novo', 'Prod. Velho p/ Cli. Novo', 'Prod. Novo p/ Cli. Velho', 'Prod. Velho p/ Cli.Velho'] }} 
                    />
                    </div>
                </div>
                <div id="pieChartOpt" className='flex justify-center p-2 md:w-1/6'>
                    <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around gap-2'>
                        <div className="text-left">
                        <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Vendedores</button>
                        </div>
                        <div className="text-left">
                        <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Produtos
                            </button>
                        </div>
                        <div className="text-left">
                        <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Clientes
                            </button>
                        </div>
                        <div className="text-left">
                        <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Categoria
                        </button>
                        </div>
                    </div>
                </div>
                <div id="timeOpt" className='col-span-2 flex justify-center p-2 md:w-1/3'>
                    <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around gap-2'>
                        <div className="text-left">
                            <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Ultimo mês
                            </button>
                        </div>

                        <div className="text-left">
                            <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Ultimos 3 meses
                            </button>
                        </div>

                        <div className="text-left">
                            <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Ultimos 6 meses
                            </button>
                        </div>

                        <div className="text-left">
                            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Ultimos 12 meses
                            </button>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
        {/*far-left*/}
        <div className='flex flex-col md:w-1/4  w-full row-span-2  justify-center p-2 md:gap-0 gap-10 '>
              <DashboardNumberCard title={`Total de Vendas (${(new Date()).getFullYear()})`}number={`${formatMoney(totalSellsValue.toString() + "00")}`} percentage="" />
              <DashboardNumberCard title={`Total de Vendas: ${MonthName(new Date())}`} number={`${formatMoney(totalComissionValueCurrentMonth.toString() + "00")}`} percentage=""/>
              <DashboardNumberCard title={`Número de Vendas: ${MonthName(new Date())}`} number={`${quantitySellsCurrentMonth}`} percentage=""/>
        </div>
        <div id="infoBar" className=''>
          
          </div>   
      </div>
    </main>
  );
}