import { Card } from "flowbite-react";
import '@/app/globals.css'


const FormCard = ({children}: any) => {
  return (
    <div className="flex justify-center items-center h-screen md:w-screen  pl-10">
      <div className="grid w-full max-w-lg h-full  justify-center items-center">
        <Card className=" flex justify-center items-center border-2 border-gray-300 rounded-lg bg-white shadow-lg p-8">
            {children}
        </Card>
      </div>
    </div>
  );
}

export default FormCard;
