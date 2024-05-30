import { ProductTableRowProps } from "@/models/models";
import { Table } from "flowbite-react/components/Table"

const ProductTableRow = ({
  name,
  description,
  status,
}: ProductTableRowProps) => {
  return(      
      <Table.Row className="odd:bg-[#f1f1f1] even:bg-[#e4e4e4] font-medium">
      <Table.Cell className="whitespace-nowrap font-medium">
        {name}
      </Table.Cell>
      <Table.Cell>
        {description}
      </Table.Cell>
      <Table.Cell>
        {status === 0 ? "Sim" : "Não"}
      </Table.Cell>
    </Table.Row>
  )
}
export default ProductTableRow;