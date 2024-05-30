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
      {companyName}
    </Table.Cell>
    <Table.Cell>
      {segment}
    </Table.Cell>
    <Table.Cell>
      {formatPhoneNumber(contact)}
    </Table.Cell>
    <Table.Cell>
      {status === 0 ? "Sim" : "Não"}
    </Table.Cell>
  </Table.Row>
  )
}
export default ClientTableRow;