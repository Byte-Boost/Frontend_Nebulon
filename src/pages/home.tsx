import '@/app/globals.css'
import { commissionFilters } from '@/models/models';
import DashboardNumberCard from '@/modules/dashboard_number_card';
import LoaderAnim from '@/modules/loader';
import Scoreboard from '@/modules/scoreboard';
import Sidebar from '@/modules/sidebar';
import { getCommissionsWithFilter, getProductById, getProductsWithFilter } from '@/scripts/http-requests/InstanceSamples';
import { formatMoney } from '@/scripts/utils/dataFormatter';
import cookie from '@boiseitguru/cookie-cutter';
import { Card } from 'flowbite-react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Graph = dynamic(() => import('@/modules/graph'), { ssr: false });
interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}

export default function Test() {

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      const token = cookie.get('token');
      if (token) {
        const decoded = jwtDecode<MyJwtPayload>(token);
        setIsAdmin(decoded.admin);
      }
    },[]);

    let currentMonthIndex= Number(new Date().getMonth());
    let MonthName = (date: Date)=>{
      let str = date.toLocaleString('pt-BR', { month: 'long' })
      return str.charAt(0).toUpperCase() + str.slice(1)
    };
    const [isLoading, setIsLoading] = useState(true);
    const [fetchDataFromLastMonths, setFetchDataFromLastMonths] = useState<number>(13); 
    
    // Line Chart data
    const [dataLineY, setDataLineY] = useState([])
    const [dataLineX, setDataLineX] = useState<string[]>([]);

    // Pie Chart data
    const [dataPie, setDataPie] = useState([]);
    const [pieLabel,setPieLabel] = useState(['Prod. Novo p/ Cli. Novo', 'Prod. Velho p/ Cli. Novo', 'Prod. Novo p/ Cli. Velho', 'Prod. Velho p/ Cli.Velho']);
    
    // Current Month Stats

    const [unfilteredTotalSales, setUnfilteredTotalSales] = useState([]);
    const [filteredTotalSales, setFilteredTotalSales] = useState([]);

    const [quantitySellsCurrentMonth, setQuantitySellsCurrentMonth] = useState<number>(0);

    const [totalSellsValue, setTotalSellsValue] = useState<number>(0);
    const [totalCommissionValueCurrentMonth, setTotalCommissionValueCurrentMonth] = useState<number>(0);
    const [totalSellsPerMonth, setTotalSellsPerMonth] = useState({});

    const [pieFilter, setPieFilter] = useState('category')
    const [filters, setFilters] = useState<commissionFilters>({
      date: null,
      clientCNPJ: null,
      sellerCPF: null,
      productID: null,
      prodClass: null,
      clientsFirstPurchase: null,
      page: 1,
      limit: null,
    });
    

    async function refreshUTSale(){
      setUnfilteredTotalSales((await getCommissionsWithFilter(filters, true)).data);
    }
    async function getDataForPie(){
      let filter = pieFilter
      if (filter == 'product'){
      const totalSalesPerProduct = unfilteredTotalSales.reduce((acc : any, curr :any) => {
        console.log(acc,curr,curr.product_data)
        if (acc[curr.product_data.name]) {
          acc[curr.product_data.name] += curr.value;
        } else {
          acc[curr.product_data.name] = curr.value;
        }
        return acc;
      },{});
      setFilteredTotalSales(totalSalesPerProduct)
      return 
      }
      else if (filter == 'seller'){
      const totalSalesPerSeller = unfilteredTotalSales.reduce((acc:any, curr:any) =>{
        if (acc[curr.seller_data.name]) {
          acc[curr.seller_data.name] += curr.value;
        } else {
          acc[curr.seller_data.name] = curr.value;
        }
        return acc;
      },{});
      setFilteredTotalSales(totalSalesPerSeller)
      return  
      } 
      else if (filter == 'client'){
      const totalSalesPerClient = unfilteredTotalSales.reduce((acc:any, curr:any) =>{
        if (acc[curr.client_data.tradingName]) {
          acc[curr.client_data.tradingName] += curr.value;
        } else {
          acc[curr.client_data.tradingName] = curr.value;
        }
        return acc;
      },{});
      setFilteredTotalSales(totalSalesPerClient)
      console.log(totalSalesPerClient)
      return
     }
      else if (filter=='category'){
        let totalSalesPerCategory = unfilteredTotalSales.reduce((acc:any, curr:any) =>{
          if (curr.product_data.status == 0 ){
            acc['Prod. Novo p/ Cli. Velho'] = (acc['Prod. Novo p/ Cli. Velho'] || 0) + curr.value;
          }
          else if (curr.product_data.status == 1 ){
            acc['Prod. Velho p/ Cli.Velho'] = (acc['Prod. Velho p/ Cli.Velho'] || 0) + curr.value;
          }
          return acc;
        }, {});
        let filter = {
          date: null,
          clientCNPJ: null,
          sellerCPF: null,
          productID: null,
          prodClass: null,
          clientsFirstPurchase: true,
          page: 1,
          limit: null,
        }
        let firstPro = (await getCommissionsWithFilter(filter, true)).data;
        totalSalesPerCategory = firstPro.reduce((acc:any, curr:any) =>{
          if (curr.product_data.status == 0){
            acc['Prod. Novo p/ Cli. Novo'] = (acc['Prod. Novo p/ Cli. Novo'] || 0) + curr.value;
          }
          else if (curr.product_data.status == 1){
            acc['Prod. Velho p/ Cli. Novo'] = (acc['Prod. Velho p/ Cli. Novo'] || 0) + curr.value;
          }
          return acc
        }, totalSalesPerCategory)
        setFilteredTotalSales(totalSalesPerCategory);
        return 
    }
  }
    async function getDataForGraph() {
      let now = new Date(Date.now());
      const results = [];
    
      for(let i = 0; i < fetchDataFromLastMonths; i++){
        // the first of each month, starting from the current, and ending in (FetchDataFromLastMonths - 1) months ago.
        // and the last of each month, by getting day "0" of the next month, through each iteration.
        let firstDayOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
        let lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth()+1, 0);
        lastDayOfMonth.setUTCHours(23,59,59,999)

        // get ONLY the commissions that are between the first and last day of the month
        let filtered = unfilteredTotalSales.filter((commission: any) => {
          let after  =  new Date(commission.date) >= firstDayOfMonth
          let before =  new Date(commission.date) <= lastDayOfMonth
          return after && before
        });

        // Sum all the values of the filtered commissions
        let monthSaleValue = filtered.reduce((acc, commission: any) => acc + commission.value, 0);
        results.push(monthSaleValue);
      }

      // Create a new object with the total sells per month
      let newTotalSellsPerMonth : {[key: string]: number} = {...totalSellsPerMonth};
      // Reverse the array to get the months in ascending order
      results.reverse().forEach((commissions_12m, i) => {
        let newDate = new Date(now.getFullYear(), now.getMonth() - (results.length - 1 - i), 1);
        newTotalSellsPerMonth[MonthName(newDate)+'/'+newDate.getFullYear()] = commissions_12m;
      });
      setTotalSellsPerMonth(newTotalSellsPerMonth);
    }
    async function getOverallData(){

      let now = new Date(Date.now());
      // Gets the first and last day of the current year
      let current_year_start = new Date(now.getFullYear(), 0, 1);
      let current_year_end = new Date(now.getFullYear(), 12, 0);
      current_year_end.setUTCHours(23,59,59,999);
  
      // Gets the first and last day of the current month
      let current_month_start = new Date(now.getFullYear(), now.getMonth(), 1);
      let current_month_end =new Date(now.getFullYear(), now.getMonth()+1, 0);
      current_month_end.setUTCHours(23,59,59,999);
      
      // Filtering the commissions that are between the first and last day of the current month and year
      let salesThisMonth = unfilteredTotalSales.filter((commission: any) => {
        let after  =  new Date(commission.date) >= current_month_start
        let before =  new Date(commission.date) <= current_month_end
        return after && before
      });
      let salesThisYear = unfilteredTotalSales.filter((commission: any) => {
        let after  =  new Date(commission.date) >= current_year_start
        let before =  new Date(commission.date) <= current_year_end
        return after && before
      });
      // Turning it into data
      let saleValueYear = salesThisYear.reduce((acc, commission: any) => acc + commission.value, 0);
      let commValueMonth = Number(salesThisMonth.reduce((acc, commission: any) => acc + commission.commissionCut, 0).toFixed(2));
      console.log(saleValueYear, commValueMonth)
      
      // Sets the data to the states
      setTotalSellsValue(saleValueYear);
      setQuantitySellsCurrentMonth(salesThisMonth.length);
      setTotalCommissionValueCurrentMonth(commValueMonth);
    }

    useEffect(() => {
      // Get the keys and values from totalSellsPerMonth
      const newKeys = Object.keys(totalSellsPerMonth);
      const newValues = Object.values(totalSellsPerMonth);
  
      // Filter out the keys that are already included in dataX
      const filteredKeys = newKeys.filter((key) => !dataLineX.includes(key));
  
      // Get the corresponding values for the filtered keys
      const filteredValues = newValues.slice(0, filteredKeys.length);
  
      // Update dataX and dataLineY with the new keys and values
      setDataLineX([...filteredKeys,...dataLineX]);
      setDataLineY([...filteredValues,...dataLineY] as never[]);
    }, [totalSellsPerMonth]);
    // On mount, fetch the overall data
    useEffect(()=>{refreshUTSale()}, []);
    // When overall data changes, as long as it's not zero, fetch the data for the graph
    useEffect(()=>{
      // So it doesn't try to build graph from empty data (before the first fetch)
      if (unfilteredTotalSales.length > 0){
        setIsLoading(true)
        getDataForGraph();
        getOverallData();
        getDataForPie();
        setIsLoading(false)
      }
    }, [unfilteredTotalSales]);
    useEffect(() =>{
      getDataForPie()
    },[pieFilter])
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
                <div id="lineChart" className='  md:w-2/3 md:h-full h-72 col-span-2 flex justify-center p-2'>
                    <div className='  grow border-2  rounded-lg '>
                    {isLoading ? <div className=' w-full h-full grid place-content-center '><LoaderAnim className='scale-50' /></div>  :
                    <Graph 
                        key={'lineChart'}
                        height={'100%'}
                        type="line" 
                        series={[{name:"", data: dataLineY}]} 
                        options={{ 
                            chart: { id: 'vendas' }, 
                            xaxis: { 
                                categories: dataLineX,
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
                    />}
                    </div>
                </div>
                <div id="scoreBoard" className='col-span-2 flex justify-center p-2 md:w-1/3 md:h-full h-1/3'>
                    <div className='grow flex flex-col p-4 border-2 rounded-lg justify-around'>
                        <Scoreboard/>
                    </div>
                </div>
            </div>
            {/*bottom*/}
            <div className='flex md:flex-row  w-full h-1/2 flex-col'>
                <div id="pieChart" className=' md:w-1/2 md:h-full h-72 col-span-2 flex justify-center p-2'>
                    <div className='grow border-2 rounded-lg md:pt-0 pt-14'>
                    {isLoading ? <div className=' w-full h-full grid place-content-center '><LoaderAnim className='scale-50' /></div>  :
                      <Graph
                          key={'pieChart'}
                          height={'100%'}
                          width={'100%'}
                          type="pie" 
                          series={Object.values(filteredTotalSales) } 
                          options={{
                            labels: Object.keys(filteredTotalSales),
                            tooltip: {
                              y: {
                                formatter: (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                              }
                            } 
                          }} 
                      />
                    }
                    </div>
                </div>
                <div id="pieChartOpt" className='flex justify-center p-2 md:w-1/6'>
                    <div className=' grow flex flex-col p-4 border-2 rounded-lg justify-around gap-2'>  
                      {isAdmin && 
                        <div className="text-left"> 
                          <button onClick={()=>{
                            setPieFilter('seller')
                          }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                              Vendedores
                          </button>
                        </div>
                      }
                        <div className="text-left">
                          <button onClick={()=>{
                            setPieFilter('product')
                          }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                              Produtos
                          </button>
                        </div>
                        <div className="text-left">
                          <button onClick={()=>{
                            setPieFilter('client')
                          }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                              Clientes
                          </button>
                        </div>
                        <div className="text-left">
                          <button onClick={()=>{
                            setPieFilter('category')
                          }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                              Categoria
                          </button>
                        </div>
                    </div>
                </div>
                <div id="timeOpt" className='col-span-2 flex justify-center p-2 md:w-1/3'>
                    <div className='  grow flex flex-col p-4 border-2 rounded-lg justify-around gap-2'>
                        <div className="text-left">
                            <button onClick={() => {
                             
                            }} className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Este mes
                            </button>
                        </div>

                        <div className="text-left">
                            <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Este trimestre
                            </button>
                        </div>

                        <div className="text-left">
                            <button className='bg-gray-500 cursor-default text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Este semestre
                            </button>
                        </div>

                        <div className="text-left">
                            <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Este ano
                            </button>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
        {/*far-left*/}
        <div className=' flex flex-col md:w-1/4  w-full row-span-2  justify-center p-2 md:gap-0 gap-10 '>
              <DashboardNumberCard 
              title={`Total de Vendas (${(new Date()).getFullYear()})`}
              number={`${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSellsValue)}`} 
              percentage="" 
              isLoading={isLoading}
              />
              <DashboardNumberCard 
              title={`Total em Comissões (${MonthName(new Date())})`} 
              number={`${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCommissionValueCurrentMonth)}`} 
              percentage=""
              isLoading={isLoading}
              />
              <DashboardNumberCard 
              title={`Número de Vendas: ${MonthName(new Date())}`} 
              number={`${quantitySellsCurrentMonth}`} 
              percentage=""
              isLoading={isLoading}
              />
        </div>
      </div>
    </main>
  );
}