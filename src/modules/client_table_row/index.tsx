import instance from "@/scripts/requests/instance";
import { Table } from "flowbite-react/components/Table"
import { useEffect, useState } from "react";

type ClientTableRowProps = {
  date: string;
  seller_id: string;
  client_id: string;
  product_id: string;
  sale_value: number;
};

const ClientTableRow = ({
  date,
  seller_id,
  client_id,
  product_id,
  sale_value,
}: ClientTableRowProps) => {

    let [clientName, setClientName] = useState("");	
    let [sellerName, setSellerName] = useState("");
    let [product, setProduct] = useState("");
    let [client_cnpj, setClientCnpj] = useState("");
    let [seller_cpf, setSellerCpf] = useState("");
    let [commission_value, setCommission] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        let clientData = await instance.get("http://localhost:3200/clients/" + client_id);
        let sellerData = await instance.get("http://localhost:3200/sellers/" + seller_id);
        let productData = await instance.get("http://localhost:3200/products/" + product_id);

        setClientName(clientData.data.tradingName);
        setClientCnpj(clientData.data.cnpj);
        
        setSellerName(sellerData.data.name);
        setSellerCpf(sellerData.data.cpf);

        setProduct(productData.data.name);

        let client_status = clientData.data.status === "novo";
        let product_status = productData.data.status === "novo";
        let product_percentage = productData.data.percentage;
       
        if (client_status && product_status){
          setCommission(
            ((sale_value * (product_percentage + Number(process.env.NEXT_PUBLIC_PNCN)) )  ).toFixed(2)
          );
          console.log(commission_value)
        }
        else if (client_status && !product_status){
          setCommission(
            ((sale_value * (product_percentage + Number(process.env.NEXT_PUBLIC_PVCN)) )  ).toFixed(2)
          );
        }
        else if (!client_status && product_status){
          setCommission(
            ((sale_value * (product_percentage +  Number(process.env.NEXT_PUBLIC_PNCV)) )  ).toFixed(2)
          );
        }
        else if (!client_status && !product_status){
          setCommission(
            ((sale_value * (product_percentage +  Number(process.env.NEXT_PUBLIC_PVCV)) )  ).toFixed(2)
          );
        }
      };
      fetchData();
    }, []);
    
    var parts = date.split("-");
    if (parts.length != 3) {
        return undefined;
    }
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // months indexes are zero based, e.g. 9 == Octobre
    var day = parseInt(parts[2]);
    let new_date = new Date(year, month, day).toJSON().slice(0,10).split(/-/).reverse().join('/');
    return(
        <Table.Row className="odd:bg-white even:bg-gray-50">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
          {new_date}
        </Table.Cell>
        <Table.Cell>
          {sellerName}
        </Table.Cell>
        <Table.Cell>
          {seller_cpf}
        </Table.Cell>
        <Table.Cell>
          {clientName}
        </Table.Cell>
        <Table.Cell>
          {client_cnpj}
        </Table.Cell>
        <Table.Cell>
          {product}
        </Table.Cell>
        <Table.Cell >
          <div  className="grid grid-flow-col" >
          <div className="justify-start">
            <span className="ml-2">
              {'R$  '}
            </span>
          </div>
          <div className="justify-end">
            <span className="ml-2">
              {sale_value.toFixed(2)}
            </span> 
          </div>
          </div>
        </Table.Cell>
        <Table.Cell >   
        <div className="flex flex-row flex-1">
            <div className="justify-start">
              <span className="ml-2">
                {'R$  '}
              </span>
            </div>
            <div className="justify-end ">
              <span className="ml-2">
              {commission_value}
              </span> 
            </div>
          </div>
        </Table.Cell>
      </Table.Row>
    )
}
export default ClientTableRow;