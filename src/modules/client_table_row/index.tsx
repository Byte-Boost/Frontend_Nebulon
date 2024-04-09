import { Table } from "flowbite-react/components/Table"

const ClientTableRow = ({nomefantasia,razaosocial,cnpj,contato}:{nomefantasia:string,razaosocial:string,cnpj:string,contato:string}) => {

    return(
        <Table.Row className="odd:bg-white even:bg-gray-50">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
          {nomefantasia}
        </Table.Cell>
        <Table.Cell>{razaosocial}</Table.Cell>
        <Table.Cell>{cnpj}</Table.Cell>
        <Table.Cell>{contato}</Table.Cell>
      </Table.Row>
    )
}
export default ClientTableRow;