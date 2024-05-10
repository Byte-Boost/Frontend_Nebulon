import instance from "@/scripts/requests/instance";
import { Table } from "flowbite-react/components/Table"
import { useEffect, useState } from "react";

type CommissionTableRowProps = {
  date: string;
  seller_cpf: number;
  client_cnpj: number;
  product_id: number;
  sale_value: number;
};

const CommissionTableRow = ({
  date,
  seller_cpf,
  client_cnpj,
  product_id,
  sale_value,
}: CommissionTableRowProps) => {

    let [clientName, setClientName] = useState("");	
    let [sellerName, setSellerName] = useState("");
    let [product, setProduct] = useState("");
    let [commission_value, setCommission] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        let clientData = await instance.get("/clients/cnpj/" + client_cnpj);
        let productData = await instance.get("/products/" + product_id);
        let sellerData = await instance.get("/sellers/cpf/" + seller_cpf);
        
        setClientName(clientData.data.tradingName);
        
        setSellerName(sellerData.data.name);
        setProduct(productData.data.name);

        let client_status = clientData.data.status === 0;
        let product_status = productData.data.status === 0;
        let product_percentage = productData.data.percentage;
       
        if (client_status && product_status){
          setCommission(
            ((sale_value * (product_percentage + Number(process.env.NEXT_PUBLIC_PNCN)) )  ).toFixed(2)
          );
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
        <Table.Row className="odd:bg-[#1f1f1f] even:bg-[#2b2b2b]">
        <Table.Cell className="whitespace-nowrap font-medium text-white">
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
      </Table.Row>
    )
}
export default CommissionTableRow;