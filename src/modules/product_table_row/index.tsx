import { ProductTableRowProps } from "@/models/models";
import cookie from "@boiseitguru/cookie-cutter";
import { Table } from "flowbite-react/components/Table"
import { jwtDecode, JwtPayload } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}

const ProductTableRow = ({
  id,
  name,
  description,
  status,
}: ProductTableRowProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  const token = cookie.get('token');
  if (token) {
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      setIsAdmin(decoded.admin);
    } catch (error) {
      console.log("Error decoding token:", error);
    }
  }
  }, []);

  return(      
      <Table.Row className="odd:bg-[#f1f1f1] even:bg-[#e4e4e4] font-medium">
      <Table.Cell className="whitespace-nowrap font-medium">
        <div className="flex flex-row flex-1 justify-between">

          <div className="justify-start">
            <span className="ml-2">{name}</span>
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
        {description}
      </Table.Cell>
      {
        isAdmin?
      <Table.Cell>
        <Link href={{
          pathname: '/adm/editar_produto/[id]',
          query: { id }
        }}>
        <button 
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Editar
        </button>
        </Link>
      </Table.Cell>
           :
           <Table.Cell>
     
           </Table.Cell>          
      }
    </Table.Row>
  )
}
export default ProductTableRow;