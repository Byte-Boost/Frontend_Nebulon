// Commissions
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
    client: string | null,
    seller: string | null,
    product: string | null,
}
export type commissionFilters = {
    date: number | null,
    clientCNPJ: string | null,
    sellerCPF: string | null,
    productID: number | null,
    prodClass: number | null,
    clientClass: number | null,
}

// Products
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