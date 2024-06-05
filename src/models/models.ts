// Commissions
export type CommissionTableRowProps = {
    date: string;
    seller_data: {name: string, cpf: string},
    client_data: {name: string, status: number, cnpj: string},
    product_data: {name: string, status: number, percentage: number, id: number},
    sale_value: number,
    comm_value: number,
    clientsFirstPurchase: Boolean,
    handleFilters: Function,
    handleDateSorting : Function,
    handleValueSorting : Function,
};
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
    date: Date | null,
    clientCNPJ: string | null,
    sellerCPF: string | null,
    productID: number | null,
    prodClass: number | null,
    clientsFirstPurchase: boolean | null,
    page: number | null,
    limit: number | null,
    [key: string]: null | string | number | boolean | Date;
}
export type SortLabelType = {
    sharedSort: string | null;
};
export type createCommissionDto = {
    sellerData?: any,
    clientData?: any,
    commissionCut?: string,
    date?: Date | string,
    value: string,
    scorePoints?: number,
    paymentMethod: string,
    sellerCPF: string,
    clientCNPJ: string,
    productId: number | string
}

// Products
export type ProductTableRowProps = {
    name: string;
    description: string;
    status: number;
};
export type productExcelTableRow = {
    id: number,
    name: string,
    description: string,
    status: number,
}
export type productFilters = {
    class: number | null,
    startsWith: string | null,
}
export type createProductDto = {
    name: string,
    description: string
    status?: number
}

// Clients
export type ClientTableRowProps = {
    companyName: string;
    segment: string;
    contact: string;
    status: number;
};
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
export type createClienteDto = {
    tradingName: string,
    companyName: string,
    cnpj: string,
    segment: string,
    contact: string,
    status?: number
}

// Sellers
export type SellerTableRowProps = {
    id: number
    name: string;
    cpf: string;
    score: number;
    admin: boolean,
    username?: string,
    password?: string,
}
export type sellerFilters = {
    adminOnly: boolean | null,
}
export type createSellerDto = {
    name: string,
    cpf: string,
    username: string,
    password: string
}

// Modals
export type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    postSequence: (excelRow: any) => void;
    success: {msg: string, log: string};
}