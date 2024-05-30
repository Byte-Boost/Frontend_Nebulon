// Commissions
export type  Comissao = {
    value: string;
    paymentMethod: string;
    sellerCPF: string;
    clientCNPJ: string;
    productId: string;
}
export type commissionExcelTableRow = {
    date: Date,
    seller_data: { id: number, name: string },
    sellerCPF: string,
    productId: number,
    product_data: { name: string },
    client_data: { id: number, tradingName: string, segment: string },
    clientCNPJ: string,
    value: string,
    paymentMethod: string
}
export type commissionFilterLabels = {
    clientCNPJ: string | null,
    sellerCPF: string | null,
    productID: string | null,
    [key: string]: null | string;
}
export type commissionFilters = {
    date: number | null,
    clientCNPJ: string | null,
    sellerCPF: string | null,
    productID: number | null,
    prodClass: number | null,
    clientsFirstPurchase: boolean | null,
    page: number | null,
    limit: number | null,
    [key: string]: null | string | number | boolean;
}
export type SortLabelType = {
    sharedSort: string | null;
};
// Products
export type Produto = {
    name: string;
    description: string;
}
export type productExcelTableRow = {
    id: number,
    name: string,
    description: string,
    status: number,
}
export type productFilters = {
    class: number | null,
}

// Clients
export type clientExcelTableRow = {
    id: number,
    tradingName: string,
    companyName: string,
    cnpj: string,
    segment: string,
    contact: string,
    status: number,
}
export type clientFilters = {
    class: number | null,
    segment: string | null,
}

// Sellers
export type Seller = {
    name: string;
    cpf: string;
    username: string;
    password: string;
}