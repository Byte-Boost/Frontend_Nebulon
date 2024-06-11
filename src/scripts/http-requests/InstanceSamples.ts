import { clientFilters, commissionFilters, createClienteDto, createCommissionDto, createProductDto, createSellerDto, productFilters, sellerFilters } from "@/models/models";
import instance from "./instance";
import { extractFloat } from "../utils/dataFormatter";

// Commissions
export async function getCommissionsWithFilter(filters: commissionFilters, compoundData: boolean = false){
    let after = null;
    if (filters.date != null){
      after = `${filters.date.getUTCFullYear()}-${filters.date.getUTCMonth() + 1}-${filters.date.getUTCDate()}`
    } 
    // translate the filters into the correct format for the API
    let prodStatus = filters.prodClass == 0 ? "new" : filters.prodClass == 1 ? "old" : undefined
    // fetch! Get the data from the API
    const commissions = await instance.get("/commissions", { params: {
      after: after,
      client_cnpj: filters.clientCNPJ,
      seller_cpf: filters.sellerCPF,
      product_id: filters.productID,
      product_status: prodStatus,
      firstPurchase: filters.clientsFirstPurchase,
      page: filters.page,
      limit: filters.limit,
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
export async function getCutAndScoreFromCommission(comissao: any){
    let cli = await instance.get(`/clients/cnpj/${comissao.clientCNPJ}`);
    let prod = await instance.get(`/products/${comissao.productId}`);
    let comm_perc = Number(process.env.NEXT_PUBLIC_BASE_COMMISSION_VALUE) + Number(cli.data.status == 0 ? process.env.NEXT_PUBLIC_NEW_CLIENT_BONUS : 0) + Number(prod.data.status == 0 ? process.env.NEXT_PUBLIC_NEW_PROD_BONUS : 0);
    let score = Number(process.env.NEXT_PUBLIC_BASE_COMMISSION_SCORE) + Number(cli.data.status == 0 ? process.env.NEXT_PUBLIC_NEW_CLIENT_SCORE_BONUS : 0) + Number(prod.data.status == 0 ? process.env.NEXT_PUBLIC_NEW_PROD_SCORE_BONUS : 0);
    return {
      cut: (Number(comissao.value) * comm_perc).toString(),
      score: score
    };
}
export async function postCommission(comissao: createCommissionDto){
  // Formatação dos dados
  comissao.sellerCPF=comissao.sellerCPF.replace(/\D/g, '');
  comissao.clientCNPJ=comissao.clientCNPJ.replace(/\D/g, '');
  let calcValues = await getCutAndScoreFromCommission(comissao);
  comissao.commissionCut = calcValues.cut;
  comissao.scorePoints = calcValues.score;

  // Requisição POST
  console.log(comissao.value)
  let res = await instance.post('/commissions',{
    sellerData: comissao.sellerData,
    clientData: comissao.clientData,
    date: comissao.date ? comissao.date : Date.now(),
    value: comissao.value,
    scorePoints: comissao.scorePoints,
    commissionCut: comissao.commissionCut,
    paymentMethod: comissao.paymentMethod,
    sellerCPF: comissao.sellerCPF,
    clientCNPJ: comissao.clientCNPJ,
    productId: comissao.productId
  }) 

  return res;
}

// Products
export async function getProductsWithFilter(filters: productFilters){
  let status = filters.class == 0 ? "new" : filters.class == 1 ? "old" : undefined
  let products: any = await instance.get("/products", { params: {
    status: status,
    startsWith: filters.startsWith,
    page : filters.page ? filters.page : null,
    limit: filters.limit ? filters.limit : null
  }});
  return products;
}
export async function postProduct(produto: createProductDto){
  let res = await instance.post('/products',{
    name: produto.name,
    description: produto.description,
    status: produto.status || 0
  })
  return res;
}

// Clients
export async function getClientsWithFilter(filters: clientFilters){
  let status = filters.class == 0 ? "new" : filters.class == 1 ? "old" : undefined
  let clients: any = await instance.get("/clients", { params: {
    segment: filters.segment,
    status: status,
    startsWith: filters.startsWith,
    page : filters.page ? filters.page : null,
    limit: filters.limit ? filters.limit : null
  }});
  return clients;
}
export async function postClient(cliente: createClienteDto){
  cliente.cnpj=cliente.cnpj.replace(/\D/g, '');
  cliente.contact=cliente.contact.toString().replace(/\D/g, '');
  
  let res = await instance.post('/clients',{
    tradingName: cliente.tradingName,
    companyName: cliente.companyName,
    cnpj: cliente.cnpj,
    segment: cliente.segment,
    contact: cliente.contact
  })
  return res;
}

// Sellers
export async function getSellersWithFilter(filters: sellerFilters){
  let sellers: any = await instance.get("/sellers", { params: {
    adminOnly: filters.adminOnly,
  }});
  return sellers;
}

export async function getSellersById(id: number){
  let seller: any = await instance.get(`/sellers/${id}`);
  return seller;
}


export async function postSeller(user: createSellerDto){
  user.cpf=user.cpf.replace(/\D/g, '');

  let res = await instance.post('/account/register',{
    name: user.name,
    cpf: user.cpf,
    username: user.username,
    password: user.password,
    admin: user.admin
  })
  return res;
}