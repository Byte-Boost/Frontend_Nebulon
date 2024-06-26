import '@/app/globals.css'
import { commissionFilters } from '@/models/models';
import DashboardNumberCard from '@/modules/dashboard_number_card';
import LoaderAnim from '@/modules/loader';
import Scoreboard from '@/modules/scoreboard';
import Sidebar from '@/modules/sidebar';
import { getCommissionsWithFilter } from '@/scripts/http-requests/InstanceSamples';
import cookie from '@boiseitguru/cookie-cutter';
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
    const [timeFilteredTotalSales, setTimeFilteredTotalSales] = useState([]);
    const [filteredTotalSales, setFilteredTotalSales] = useState([]);

    const [sidebarQuantitySold, setSidebarQuantitySold] = useState<number>(0);
    const [sidebarTotalSellsValue, setSidebarTotalSellsValue] = useState<number>(0);
    const [sidebarTotalCommValue, setSidebarTotalCommValue] = useState<number>(0);
    
    const [totalSellsPerMonth, setTotalSellsPerMonth] = useState({});

    const [pieFilter, setPieFilter] = useState('category')
    const [timeFilter, setTimeFilter] = useState<Date | null>(null)
    const [timeFilterLabel, setTimeFilterLabel] = useState('Sempre')
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
    async function getDateFilteredData(){
      if (timeFilter != null){
        let filtered = unfilteredTotalSales.filter((commission: any) => {
          let after  =  new Date(commission.date) >= timeFilter
          return after;
        })
        setTimeFilteredTotalSales(filtered);
      } else {
        setTimeFilteredTotalSales(unfilteredTotalSales);
      }
    }
    async function getDataForPie(){
      let filter = pieFilter
      if (filter == 'product'){
      const totalSalesPerProduct = timeFilteredTotalSales.reduce((acc : any, curr :any) => {
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
      const totalSalesPerSeller = timeFilteredTotalSales.reduce((acc:any, curr:any) =>{
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
      const totalSalesPerClient = timeFilteredTotalSales.reduce((acc:any, curr:any) =>{
        if (acc[curr.client_data.tradingName]) {
          acc[curr.client_data.tradingName] += curr.value;
        } else {
          acc[curr.client_data.tradingName] = curr.value;
        }
        return acc;
      },{});
      setFilteredTotalSales(totalSalesPerClient)
      return
     }
      else if (filter=='category'){
        let totalSalesPerCategory 
        let filter = {
          date: filters.date,
          clientCNPJ: filters.clientCNPJ,
          sellerCPF: filters.sellerCPF,
          productID: filters.productID,
          prodClass: filters.prodClass,
          clientsFirstPurchase: true,
          page: filters.page,
          limit: filters.limit,
        }
        let firstPro = (await getCommissionsWithFilter(filter, true)).data;
        if (timeFilter != null){
        totalSalesPerCategory = timeFilteredTotalSales.reduce((acc:any, curr:any) =>{
          if (curr.product_data.status == 0 && curr.client_data.status == 1){
            acc['Prod. Novo p/ Cli. Velho'] = (acc['Prod. Novo p/ Cli. Velho'] || 0) + curr.commissionCut;
          }
          else if (curr.product_data.status == 1 && curr.client_data.status == 1){
            acc['Prod. Velho p/ Cli.Velho'] = (acc['Prod. Velho p/ Cli.Velho'] || 0) + curr.commissionCut;
          }
          return acc;
        }, {});
          let firstProFiltered = firstPro
          let filtered = firstProFiltered.filter((commission: any) => {
            let after  =  new Date(commission.date) >= timeFilter
            return after;
          })
          totalSalesPerCategory = filtered.reduce((acc:any, curr:any) =>{
            if (curr.product_data.status == 0 && curr.client_data.status == 0){
              acc['Prod. Novo p/ Cli. Novo'] = (acc['Prod. Novo p/ Cli. Novo'] || 0) + curr.commissionCut;
            }
            else if (curr.product_data.status == 1 && curr.client_data.status == 0){
              acc['Prod. Velho p/ Cli. Novo'] = (acc['Prod. Velho p/ Cli. Novo'] || 0) + curr.commissionCut;
            }
            return acc
          }, totalSalesPerCategory)
          // console.log(totalSalesPerCategory)
          setFilteredTotalSales(totalSalesPerCategory);
          return 
        } 
        else 
        {
          // console.log(unfilteredTotalSales)
          // console.log(filteredTotalSales)
          let totalSalesPerCategoryTemp  = unfilteredTotalSales.reduce((acc:any, curr:any) =>{
            if (curr.product_data.status == 0 && curr.clientsFirstPurchase == false){
              acc['Prod. Novo p/ Cli. Velho'] = (acc['Prod. Novo p/ Cli. Velho'] || 0) + curr.commissionCut;
              console.log(curr)
            }
            else if (curr.product_data.status == 1 && curr.clientsFirstPurchase == false){
              acc['Prod. Velho p/ Cli.Velho'] = (acc['Prod. Velho p/ Cli.Velho'] || 0) + curr.commissionCut;
            }
            return acc;
          }, {});
          // console.log(totalSalesPerCategoryTemp)
          // console.log(firstPro)
          totalSalesPerCategoryTemp = firstPro.reduce((acc:any, curr:any) =>{
            if (curr.product_data.status == 0 && curr.clientsFirstPurchase == true){
              acc['Prod. Novo p/ Cli. Novo'] = (acc['Prod. Novo p/ Cli. Novo'] || 0) + curr.commissionCut;
            }
            else if (curr.product_data.status == 1 && curr.clientsFirstPurchase == true){
              acc['Prod. Velho p/ Cli. Novo'] = (acc['Prod. Velho p/ Cli. Novo'] || 0) + curr.commissionCut;
            }
            return acc
          }, totalSalesPerCategoryTemp)
          // console.log(totalSalesPerCategoryTemp)
          // let sum = Object.values(totalSalesPerCategoryTemp).reduce((accumulator : any, currentValue :any)  => accumulator + currentValue, 0)
          // console.log(sum);
          setFilteredTotalSales(totalSalesPerCategoryTemp);
          return 
        }
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
    async function getSidebarData(){
      // Turning it into data
      let saleValue = timeFilteredTotalSales.reduce((acc, commission: any) => acc + commission.value, 0);
      let commValue = Number(timeFilteredTotalSales.reduce((acc, commission: any) => acc + commission.commissionCut, 0).toFixed(2));
      console.log(saleValue, commValue)
      
      // Sets the data to the states
      setSidebarTotalSellsValue(saleValue);
      setSidebarQuantitySold(timeFilteredTotalSales.length);
      setSidebarTotalCommValue(commValue);
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
        getDateFilteredData();
        getDataForGraph();
        setIsLoading(false)
      }
    }, [unfilteredTotalSales]);
    useEffect(()=>{
      getSidebarData();
      getDataForPie();
    }, [timeFilteredTotalSales])
    useEffect(() => {
      getDateFilteredData()
    }, [timeFilter]);
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
                              let now = new Date(Date.now());
                              let current_month_start = new Date(now.getFullYear(), now.getMonth(), 1);
                              setTimeFilter(current_month_start);
                              setTimeFilterLabel("Este mês")
                            }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                            Este mês
                            </button>
                        </div>

                        <div className="text-left">
                            <button onClick={()=>{
                              let now = new Date(Date.now());
                              let semester = now.getMonth() < 5 ? 0 : 5;
                              let current_semester_start = new Date(now.getFullYear(), semester, 1);
                              setTimeFilter(current_semester_start);
                              setTimeFilterLabel("Este semestre")
                            }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                              Este semestre
                            </button>
                        </div>

                        <div className="text-left">
                            <button onClick={()=>{
                              let now = new Date(Date.now());
                              let current_year_start = new Date(now.getFullYear(), 0, 1);
                              setTimeFilter(current_year_start);
                              setTimeFilterLabel("Este ano")
                            }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                              Este ano
                            </button>
                        </div>
                        

                        <div className="text-left">
                            <button onClick={()=>{
                              setTimeFilter(null);
                              setTimeFilterLabel("Sempre")
                            }} className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto w-full'>
                              Sempre
                            </button>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
        {/*far-left*/}
        <div className=' flex flex-col md:w-1/4  w-full row-span-2  justify-center p-2 md:gap-0 gap-10 '>
              <DashboardNumberCard 
              title={`Total de Vendas (${timeFilterLabel})`}
              number={`${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sidebarTotalSellsValue)}`} 
              percentage="" 
              isLoading={isLoading}
              />
              <DashboardNumberCard 
              title={`Total em Comissões (${timeFilterLabel})`} 
              number={`${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sidebarTotalCommValue)}`} 
              percentage=""
              isLoading={isLoading}
              />
              <DashboardNumberCard 
              title={`Número de Vendas (${timeFilterLabel})`} 
              number={`${sidebarQuantitySold}`} 
              percentage=""
              isLoading={isLoading}
              />
        </div>
      </div>
    </main>
  );
}