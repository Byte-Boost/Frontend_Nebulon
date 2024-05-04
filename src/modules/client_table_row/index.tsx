import { Table } from "flowbite-react/components/Table"

type ClientTableRowProps = {
  companyName: string;
  segment: string;
  contact: string;
  status: number;
};

const ClientTableRow = ({
  companyName,
  segment,
  contact,
  status
}: ClientTableRowProps) => {
    return(      
        <Table.Row className="odd:bg-[#1f1f1f] even:bg-[#2b2b2b]">
        <Table.Cell className="whitespace-nowrap font-medium text-white">
          {companyName}
        </Table.Cell>
        <Table.Cell>
          {segment}
        </Table.Cell>
        <Table.Cell>
          {contact}
        </Table.Cell>
        <Table.Cell>
          {status === 0 ? "Novo" : "Velho"}
        </Table.Cell>
      </Table.Row>
    )
}
export default ClientTableRow;