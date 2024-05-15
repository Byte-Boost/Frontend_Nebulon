import { Card } from "flowbite-react";

const DashboardContent = () => {
    return (
      <div className='grid grid-cols-6 grid-rows-2 h-screen'>
        <div className='bg-black col-span-3 flex justify-center p-2'>
          <Card className='grow'>Graph</Card>
        </div>
        <div className='bg-orange-900 col-span-2 flex justify-center p-2'>
          <Card className='grow'>Graph Options</Card>
        </div>

        <div className='bg-lime-700 row-span-2 flex justify-center p-2'>
          <Card className='grow'>Numbers</Card>
        </div>

        <div className='bg-gray-400 col-span-2 flex justify-center p-2'>
          <Card className='grow'>Pie Graph</Card>
        </div>
        <div className='bg-red-500 flex justify-center p-2'>
          <Card className='grow'>Pie Options</Card>
        </div>

        <div className='bg-orange-400 col-span-2 flex justify-center p-2'>
          <Card className='grow'>Table</Card>
        </div>
      </div>
    );
  }
  export default DashboardContent;