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
        <Table.Row className="odd:bg-[#1f1f1f] even:bg-[#2b2b2b]">
        <Table.Cell className="whitespace-nowrap font-medium text-white">
          {name}
        </Table.Cell>
        <Table.Cell>
          {description}
        </Table.Cell>
        <Table.Cell>
          {percentage}
        </Table.Cell>
        <Table.Cell>
          {status === 0 ? "Novo" : "Velho"}
        </Table.Cell>
      </Table.Row>
    )
}
export default ProductTableRow;