import { Card } from "flowbite-react";
import ChartTemplate from "../chart_template";
import DashboardNumberCard from "../dashboard_number_card";
import { useEffect, useState } from "react";
import instance from "@/scripts/http-requests/instance";
import { formatMoney } from "@/scripts/utils/dataFormatter";

const DashboardContent = () => {
  let currentMonthIndex= Number(new Date().getMonth());
  let MonthName = (date: Date)=>{
    let str = date.toLocaleString('pt-BR', { month: 'long' })
    return str.charAt(0).toUpperCase() + str.slice(1)
  };


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
    let current_month_end = `${start.getFullYear()}-${start.getMonth() + 1}-${lastDayOfMonth}`;
    
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
    <div className='grid grid-cols-6 grid-rows-2 h-screen w-[calc(100%-3rem)] '>
      <div id="lineGraph" className='col-span-3 flex justify-center p-2'>
        <Card className='grow border-2 rounded-lg flex justify-center'>
          <ChartTemplate 
          type='line' 
          id='lineGraph' 
          title='Total de Vendas' 
          dataX={dataX} 
          dataY={dataY} 
          colors={['rgb(147 ,51 ,234)']} 
          borderColors={['rgb(147,51,234']} 
          legendOptions={
            {
              hasLegend:true,
              position:'top',
              labelColor:'black',
              size:14
            }}
          scalesOptions={
            {
              xScales:true,
              xScalesTitle:'',
            }} 
          itemsLabel="Valor em R$"
          interactionOptions={
            {
              mode:'nearest',
              intersect:false,
              axis:'x'
            }
          }
          />
        </Card>
      </div>

      <div id="scoreBoard" className='col-span-2 flex justify-center p-2'>
        <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>
          <Card className='grow flex justify-center'>
          </Card>
        </div>
      </div>

      <div id="infoBar" className='row-span-2 flex  flex-col justify-center p-2'>
          <DashboardNumberCard title={`Total de Vendas (${(new Date()).getFullYear()})`}number={`${formatMoney(totalSellsValue.toString() + "00")}`} percentage=""/>
          <DashboardNumberCard title={`Total de Vendas: ${MonthName(new Date())}`} number={`${formatMoney(totalComissionValueCurrentMonth.toString() + "00")}`} percentage=""/>
          <DashboardNumberCard title={`Número de Vendas: ${MonthName(new Date())}`} number={`${quantitySellsCurrentMonth}`} percentage=""/>
      </div>

      <div id="pieChart" className='col-span-2 flex justify-center p-2'>
        <div className='grow border-2 rounded-lg '>
          <ChartTemplate  
          title="Vendas por categoria" 
          type="pie" 
          id='pieChart' 
          dataX={['1ª compra, produto novo.','1ª compra, produto na base.', 'Cliente, produto novo', 'Cliente, produto na base']} 
          dataY={[...dataY].reverse().slice(0,4)} 
          colors={[    // Colors for each month (if theres is twelve months)
            '#1f77b4', // January - Blue
            '#ff7f0e', // February - Orange
            '#2ca02c', // March - Green
            '#d62728', // April - Red
            '#9467bd', // May - Purple
            '#8c564b', // June - Brown
            '#e377c2', // July - Pink
            '#7f7f7f', // August - Gray
            '#bcbd22', // September - Olive
            '#17becf', // October - Cyan
            '#9edae5', // November - Light Blue
            '#98df8a'  // December - Light Green
          ]}
          borderColors={['white']}
          legendOptions={
            {
              hasLegend:true,
              position:'right',
              labelColor:'black',
              size:13
            }}
          itemsLabel="Valor em R$"
          />
        </div>
      </div>
      
      <div id="pieChartOpt" className='flex justify-center p-2'>
        <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>

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

      <div id="timeOpt" className='col-span-2 flex justify-center p-2'>
        <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>
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
  );

}
  export default DashboardContent;