import instance from "./instance";
export type filters = {
    date: number | null,
    clientCNPJ: string | null,
    sellerCPF: string | null,
    productID: number | null,
    prodClass: number | null,
    clientClass: number | null,
}

export async function getCommissionsWithFilter(filters: filters, compoundData: boolean = false){
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