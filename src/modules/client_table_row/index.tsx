import { ClientTableRowProps } from "@/models/models";
import { formatPhoneNumber } from "@/scripts/utils/dataFormatter";
import { Table } from "flowbite-react/components/Table"

const ClientTableRow = ({
  companyName,
  segment,
  contact,
  status
}: ClientTableRowProps) => {
  return(
    <Table.Row className="odd:bg-[#f1f1f1] even:bg-[#e4e4e4] font-medium">  
    <Table.Cell className="whitespace-nowrap">
      <div className="flex flex-row flex-1 justify-between">

        <div className="justify-start">
          <span className="ml-2">{companyName}</span>
        </div>

        { status === 0 ? 
          <div className="justify-end">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Novo</span>
          </div>
          : null
        } 

      </div>
    </Table.Cell>
    <Table.Cell>
      {segment}
    </Table.Cell>
    <Table.Cell>
      {formatPhoneNumber(contact)}
    </Table.Cell>
  </Table.Row>
  )
}
export default ClientTableRow;