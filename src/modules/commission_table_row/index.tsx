import { CommissionTableRowProps } from "@/models/models";
import { deleteCommission } from "@/scripts/http-requests/InstanceSamples";
import { formatCNPJ, formatCPF, formatDateToSlash, formatMoney } from "@/scripts/utils/dataFormatter";
import cookie, { set } from "@boiseitguru/cookie-cutter";
import { Table } from "flowbite-react/components/Table"
import { jwtDecode, JwtPayload } from "jwt-decode";
import router from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}

const CommissionTableRow = ({
  id,
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
        <div className="flex flex-row flex-1 justify-between">

          <div className="justify-start">
            <span className="ml-2">{client_data.name}</span>
          </div>

          { clientsFirstPurchase ? 
            <div className="justify-end">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Novo</span>
            </div>
            : null
          } 
          
        </div>
      </Table.Cell>
      <Table.Cell onClick={(e:any)=>handleFilters("clientCNPJ", client_data.name, client_data.cnpj)} className="cursor-pointer">
        {formatCNPJ(client_data.cnpj)}
      </Table.Cell>
      <Table.Cell onClick={(e:any)=>handleFilters("productID", product_data.name, product_data.id)} className="cursor-pointer">
        {product_data.name}
      </Table.Cell>
      <Table.Cell>
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
      {
      isAdmin?
      <Table.Cell>
      <div className="text-right">
              <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="button" onClick={() => {
                                Swal.fire({
                                  title: "Tem certeza?",
                                  text: "Não será possível reverter o processo!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Sim, delete!"
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    console.log(id)
                                    deleteCommission(Number(id))
                                    Swal.fire({
                                      title: "Deletado!",
                                      text: "Cliente deletado com sucesso!",
                                      icon: "success"
                                    });
                                    router.reload();

                                  }
                                });
                
                }}>Deletar</button>
            </div>
      </Table.Cell>
      :
      <Table.Cell>

      </Table.Cell>
      }
    </Table.Row>
  );
};
export default CommissionTableRow;