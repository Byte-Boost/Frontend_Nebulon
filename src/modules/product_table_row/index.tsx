import instance from "@/scripts/requests/instance";
import { Table } from "flowbite-react/components/Table"
import { useEffect, useState } from "react";

type ProductTableRowProps = {
  name: string;
  description: string;
  percentage: number;
  status: number;
};

const ProductTableRow = ({
  name,
  description,
  percentage,
  status,
}: ProductTableRowProps) => {
    return(      
        <Table.Row className="odd:bg-[#f1f1f1] even:bg-[#e4e4e4] font-medium">
        <Table.Cell className="whitespace-nowrap font-medium text-black">
          {name}
        </Table.Cell>
        <Table.Cell>
          {description}
        </Table.Cell>
        <Table.Cell>
          {percentage*100}%
        </Table.Cell>
        <Table.Cell>
          {status === 0 ? "Novo" : "Velho"}
        </Table.Cell>
      </Table.Row>
    )
}
export default ProductTableRow;