import { formatCNPJ, formatCPF, formatMoney } from "@/scripts/validation/dataFormatter";
import { Table } from "flowbite-react/components/Table"

type CommissionTableRowProps = {
  date: string;
  seller_data: {name: string, cpf: string},
  client_data: {name: string, status: number, cnpj: string},
  product_data: {name: string, status: number, percentage: number, id: number},
  sale_value: number,
  comm_value: number,
  handleSellerFilter: Function,
  handleClientFilter: Function,
  handleProductFilter: Function,
  handleDateSorting : Function,
  handleValueSorting : Function,
  
};

const CommissionTableRow = ({
  date,
  seller_data,
  client_data,
  product_data,
  sale_value,
  comm_value,
  handleSellerFilter,
  handleClientFilter,
  handleProductFilter,
  handleDateSorting,
  handleValueSorting,
}: CommissionTableRowProps) => {    
    var parts = date.split("-");
    if (parts.length != 3) {
        return undefined;
    }
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // months indexes are zero based, e.g. 9 == Octobre
    var day = parseInt(parts[2]);
    let new_date = new Date(year, month, day).toJSON().slice(0,10).split(/-/).reverse().join('/');
    return(
        <Table.Row className="odd:bg-[#f1f1f1] even:bg-[#e4e4e4] font-medium">
         <Table.Cell className="whitespace-nowrap font-medium cursor-pointer" onClick={(e:any)=>handleDateSorting()}>
          {new_date}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleSellerFilter(seller_data.cpf, e.target.innerText)} className="cursor-pointer">
          {seller_data.name}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleSellerFilter(seller_data.cpf, e.target.innerText)} className="cursor-pointer">
          {formatCPF(seller_data.cpf)}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleClientFilter(client_data.cnpj, e.target.innerText)} className="cursor-pointer">
          {client_data.name}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleClientFilter(client_data.cnpj, e.target.innerText)} className="cursor-pointer">
          {formatCNPJ(client_data.cnpj)}
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleProductFilter(product_data.id, e.target.innerText)} className="cursor-pointer">
          {product_data.name}
        </Table.Cell>
        <Table.Cell >   
          <div className="flex flex-row flex-1 justify-between">
            <div className="justify-start">
              <span className="ml-2">{'R$  '}</span>
            </div>
            <div className="justify-end">
              <span className="ml-2">{formatMoney(comm_value.toFixed(2), false)}</span> 
            </div>
          </div>
        </Table.Cell>
        <Table.Cell onClick={(e:any)=>handleValueSorting()} className="cursor-pointer">
          <div  className="flex flex-row flex-1 justify-between" >
            <div className="justify-start">
              <span className="ml-2">{'R$  '}</span>
            </div>
            <div className="justify-end">
              <span className="ml-2">{formatMoney(sale_value.toFixed(2), false)}</span> 
            </div>
          </div>
        </Table.Cell>
      </Table.Row>
    )
}
export default CommissionTableRow;