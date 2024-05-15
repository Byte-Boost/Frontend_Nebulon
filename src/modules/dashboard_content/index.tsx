import { Card } from "flowbite-react";
import ChartTemplate from "../chart_template";
import NewSidebarItem from "../new_sidebar_item";
import DashboardNumberCard from "../dashboard_number_card";

const DashboardContent = () => {


  let defaultColor = ['rgba(210,65,108,0.7)']
  let dataX = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  let dataY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
      <div className='grid grid-cols-6 grid-rows-2 h-screen w-screen'>
        <div className='col-span-3 flex justify-center p-2'>
          <Card className='grow flex justify-center'>
            {/*<ChartTemplate type='bar' id='test1' title='Test 1' dataX={dataX} dataY={dataY} colors={defaultColor}/>*/}
          </Card>
        </div>
        <div className='col-span-2 flex justify-center p-2'>
          <Card className='grow flex flex-col p-4'>
            <NewSidebarItem height="h-14" iconDimensions="30" text="Option 1"/>
            <NewSidebarItem height="h-14" iconDimensions="30" text="Option 2"/>
            <NewSidebarItem height="h-14" iconDimensions="30" text="Option 3"/>
            <NewSidebarItem height="h-14" iconDimensions="30" text="Option 4"/>
          </Card>
        </div>

        <div className='row-span-2 flex justify-center p-2'>
          <Card className='grow flex flex-col p-4'>
            <DashboardNumberCard title="Total de Vendas" number="R$ 40.560" percentage="5,4%"/>
            <DashboardNumberCard title="Comissão Fevereiro" number="R$ 24.560" percentage="5,4%"/>
            <DashboardNumberCard title="Vendas Realizadas" number="541" percentage="5,4%"/>
          </Card>
        </div>

        <div className='col-span-2 flex justify-center p-2'>
          <Card className='grow'>
            {/*<ChartTemplate type='pie' id='test2' title='Test 2' dataX={[1,2,3,4]} dataY={[10,20,30,15]} colors={defaultColor}/>*/}
          </Card>
        </div>
        <div className='flex justify-center p-2'>
            <Card className='grow flex flex-col p-4'>
              <NewSidebarItem height="h-14" iconDimensions="30" text="Option 1"/>
              <NewSidebarItem height="h-14" iconDimensions="30" text="Option 2"/>
              <NewSidebarItem height="h-14" iconDimensions="30" text="Option 3"/>
              <NewSidebarItem height="h-14" iconDimensions="30" text="Option 4"/>
            </Card>
        </div>

        <div className='col-span-2 flex justify-center p-2'>
          <Card className='grow'>Table</Card>
        </div>
      </div>
    );
  }
  export default DashboardContent;