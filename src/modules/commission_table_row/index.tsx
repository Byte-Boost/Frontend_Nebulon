import { CommissionTableRowProps } from "@/models/models";
import { formatCNPJ, formatCPF, formatDateToSlash, formatMoney } from "@/scripts/utils/dataFormatter";
import { Table } from "flowbite-react/components/Table"

const CommissionTableRow = ({
  date,
  seller_data,
  client_data,
  product_data,
  sale_value,
  comm_value,
  clientsFirstPurchase,
  handleFilters,
  handleDateSorting,
  handleValueSorting,
}: CommissionTableRowProps) => {
  
  let new_date= formatDateToSlash(date) 
  return(
    <Table.Row className="odd:bg-[#f1f1f1] even:bg-[#e4e4e4] font-medium">
      <Table.Cell className="whitespace-nowrap font-medium cursor-pointer" onClick={(e:any)=>handleDateSorting()}>
        {new_date}
      </Table.Cell>
      <Table.Cell onClick={(e:any)=>handleFilters("sellerCPF", seller_data.name, seller_data.cpf)} className="cursor-pointer">
        {seller_data.name}
      </Table.Cell>
      <Table.Cell onClick={(e:any)=>handleFilters("sellerCPF", seller_data.name, seller_data.cpf)} className="cursor-pointer">
        {formatCPF(seller_data.cpf)}
      </Table.Cell>
      <Table.Cell onClick={(e:any)=>handleFilters("clientCNPJ", client_data.name, client_data.cnpj)} className="cursor-pointer">
        {client_data.name}
        {clientsFirstPurchase ? 
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">1ª Compra</span>
          : null
        } 
      </Table.Cell>
      <Table.Cell onClick={(e:any)=>handleFilters("clientCNPJ", client_data.name, client_data.cnpj)} className="cursor-pointer">
        {formatCNPJ(client_data.cnpj)}
      </Table.Cell>
      <Table.Cell onClick={(e:any)=>handleFilters("productID", product_data.name, product_data.id)} className="cursor-pointer">
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