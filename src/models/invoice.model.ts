export interface InvoiceModel {
    indeks: string
    token: string
    customer: string
    address: string
    taxId: string | null
    items: {
        name: string
        amount: number,
        price: number
    }[]
}