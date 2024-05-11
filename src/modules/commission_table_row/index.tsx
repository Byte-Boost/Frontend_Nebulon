import instance from "@/scripts/requests/instance";
import { Table } from "flowbite-react/components/Table"
import { useEffect, useState } from "react";

type CommissionTableRowProps = {
  date: string;
  seller_data: {name: string, cpf: string},
  client_data: {name: string, status: number, cnpj: string},
  product_data: {name: string, status: number, percentage: number, id: number},
  sale_value: number,
  handleSellerFilter: Function,
  handleClientFilter: Function,
  handleProductFilter: Function,
  
};

const CommissionTableRow = ({
  date,
  seller_data,
  client_data,
  product_data,
  sale_value,
  handleSellerFilter,
  handleClientFilter,
  handleProductFilter
}: CommissionTableRowProps) => {

    const RateMatrix = [[
        process.env.NEXT_PUBLIC_PNCN,
        process.env.NEXT_PUBLIC_PNCV
      ], [
        process.env.NEXT_PUBLIC_PVCN,
        process.env.NEXT_PUBLIC_PVCV
    ]];
    
    let commission_value = (sale_value * (product_data.percentage + Number(RateMatrix[product_data.status][client_data.status])))
      
    
    var parts = date.split("-");
    if (parts.length != 3) {
        return undefined;
    }
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // months indexes are zero based, e.g. 9 == Octobre
    var day = parseInt(parts[2]);
    let new_date = new Date(year, month, day).toJSON().slice(0,10).split(/-/).reverse().join('/');
    return(
        <Table.Row className="odd:bg-[#1f1f1f] even:bg-[#2b2b2b]">
        <Table.Cell className="whitespace-nowrap font-medium text-white">
          {new_date}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleSellerFilter(seller_data.cpf, e.target.innerText)} className="cursor-pointer">
          {seller_data.name}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleSellerFilter(seller_data.cpf, e.target.innerText)} className="cursor-pointer">
          {seller_data.cpf}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleClientFilter(client_data.cnpj, e.target.innerText)} className="cursor-pointer">
          {client_data.name}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleClientFilter(client_data.cnpj, e.target.innerText)} className="cursor-pointer">
          {client_data.cnpj}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleProductFilter(product_data.id, e.target.innerText)} className="cursor-pointer">
          {product_data.name}
        </Table.Cell>
        <Table.Cell >   
        <div className="flex flex-row flex-1">
            <div className="justify-start">
              <span className="ml-2">
                {'R$  '}
              </span>
            </div>
            <div className="justify-end ">
              <span className="ml-2">
              {commission_value.toFixed(2)}
              </span> 
            </div>
          </div>
        </Table.Cell>
        <Table.Cell >
          <div  className="grid grid-flow-col" >
          <div className="justify-start">
            <span className="ml-2">
              {'R$  '}
            </span>
          </div>
          <div className="justify-end">
            <span className="ml-2">
              {sale_value.toFixed(2)}
            </span> 
          </div>
          </div>
        </Table.Cell>
      </Table.Row>
    )
}
export default CommissionTableRow;