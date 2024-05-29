import { clientFilters, commissionFilters, productFilters } from "@/models/models";
import instance from "./instance";
import { extractFloat } from "../utils/dataFormatter";


export async function getCommissionsWithFilter(filters: commissionFilters, compoundData: boolean = false){
    // Essentially makes "after" equal to "null" or the date of the last month, 3 months, 6 months, or year
    let dateRange = [0, 1, 3, 6, 12]
    let now = new Date(Date.now());
    let after = null;
    if (filters.date != null && filters.date != 0){
      let start = new Date(now.setMonth(now.getMonth() - dateRange[filters.date]));
      after = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`
    } 
    // translate the filters into the correct format for the API
    let prodStatus = filters.prodClass == 0 ? "new" : filters.prodClass == 1 ? "old" : undefined
    let clientStatus = filters.clientClass == 0 ? "new" : filters.clientClass == 1 ? "old" : undefined
    // fetch! Get the data from the API
    const commissions = await instance.get("/commissions", { params: {
      after: after,
      client_cnpj: filters.clientCNPJ,
      seller_cpf: filters.sellerCPF,
      product_id: filters.productID,
      product_status: prodStatus,
      client_status: clientStatus,
    }});

    // inserts seller_data, client_data, and product_data into the commission object
    if (compoundData){
        for (const commission of commissions.data){
          commission.seller_data = await instance.get(`/sellers/cpf/${commission.sellerCPF}`).then(res=>res.data);
          commission.client_data = await instance.get(`/clients/cnpj/${commission.clientCNPJ}`).then(res=>res.data);
          commission.product_data = await instance.get(`/products/${commission.productId}`).then(res=>res.data);
        }
    }

    return commissions
}
export async function getCutFromCommission(comissao: any){
    let cli = await instance.get(`/clients/cnpj/${comissao.clientCNPJ}`);
    let prod = await instance.get(`/products/${comissao.productId}`);
    let comm_perc = Number(process.env.NEXT_PUBLIC_BASE_COMMISSION_VALUE) + Number(cli.data.status == 0 ? process.env.NEXT_PUBLIC_NEW_CLIENT_BONUS : 0) + Number(prod.data.status == 0 ? process.env.NEXT_PUBLIC_NEW_PROD_BONUS : 0);
    return (Number(comissao.value) * comm_perc).toString();
}
export async function postCommission(comissao: any){
  // Formatação dos dados
  comissao.sellerCPF=comissao.sellerCPF.replace(/\D/g, '');
  comissao.clientCNPJ=comissao.clientCNPJ.replace(/\D/g, '');
  comissao.value=extractFloat(comissao.value).toString();
  comissao.commissionCut= await getCutFromCommission(comissao);

  // Requisição POST
  let res = await instance.post('/commissions',{
    sellerData: comissao.sellerData,
    clientData: comissao.clientData,
    date: Date.now(),
    value: comissao.value,
    commissionCut: comissao.commissionCut,
    paymentMethod: comissao.paymentMethod,
    sellerCPF: comissao.sellerCPF,
    clientCNPJ: comissao.clientCNPJ,
    productId: comissao.productId
  }) 

  return res;
}

export async function getProductsWithFilter(filters: productFilters){
  let status = filters.class == 0 ? "new" : filters.class == 1 ? "old" : undefined
  let products: any = await instance.get("/products", { params: {
    status: status,
  }});
  return products;
}
export async function postProduct(produto: any){
  let res = await instance.post('/products',{
    name: produto.name,
    description: produto.description,
  })
  return res;
}

export async function getClientsWithFilter(filters: clientFilters){
  let status = filters.class == 0 ? "new" : filters.class == 1 ? "old" : undefined
  let clients: any = await instance.get("/clients", { params: {
    segment: filters.segment,
    status: status,
  }});
  return clients;
}
export async function postClient(cliente: any){
  cliente.cnpj=cliente.cnpj.replace(/\D/g, '');
  cliente.telefone=cliente.telefone.replace(/\D/g, '');
  let res = await instance.post('/clients',{
    tradingName: cliente.nomeFantasia,
    companyName: cliente.razaoSocial,
    cnpj: cliente.cnpj,
    segment: cliente.segmento,
    contact: cliente.telefone
  })
  return res;
}