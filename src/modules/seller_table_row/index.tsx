import { SellerTableRowProps } from "@/models/models";
import { formatCPF } from "@/scripts/utils/dataFormatter";
import { Table } from "flowbite-react/components/Table"
import Link from "next/link";
import { useRouter } from "next/router";


const SellerTableRow = ({
  id,
  name,
  cpf,
  score,
  admin
}: SellerTableRowProps) => {


  return(
    <Table.Row className="odd:bg-[#f1f1f1] even:bg-[#e4e4e4] font-medium">  
      <Table.Cell className="whitespace-nowrap">
        {id}
      </Table.Cell>
      <Table.Cell>
        {admin 
          ? <span className="bg-red-100 text-red-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Admin</span>
          : <span className="bg-indigo-100 text-indigo-800  text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Vendedor</span> 
        } 
        {name}
      </Table.Cell>
      <Table.Cell>
        {formatCPF(cpf)}
      </Table.Cell>
      <Table.Cell>
        {score}
      </Table.Cell>
      <Table.Cell>
        <Link href={{
          pathname: '/adm/editar_usuario/[id]',
          query: { id }
        }}>
        <button 
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Editar
        </button>
        </Link>
      </Table.Cell>
    </Table.Row>
  )
}
export default SellerTableRow;