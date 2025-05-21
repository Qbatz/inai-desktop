import AxiosConfig from "../../WebService/AxiosConfig"



export async function GetPort() {
    return await AxiosConfig.get('/ports')
}


export async function GetPaymentTerm() {
    return await AxiosConfig.get('/payments/payment-terms')
}

export async function GetDeliveryTerm() {
    return await AxiosConfig.get('/payments/delivery-terms')
}

export async function GetInvoiceType() {
    return await AxiosConfig.get('/invoice/invoice-type')
}

export async function GetAllInvoiceList(invoice) {

    let queryParams = '';

    if (invoice.startDate && invoice.endDate) {
        queryParams = new URLSearchParams({
            startDate: invoice.startDate || '',
            endDate: invoice.endDate || ''
        }).toString();
    } else if (invoice.keyword) {
        queryParams = new URLSearchParams({
            keyword: invoice.keyword || ''
        }).toString();
    }

    if (!invoice.startDate && !invoice.endDate && !invoice.keyword) {
        return await AxiosConfig.get('/invoices');
    }


    return await AxiosConfig.get(`/invoices?${queryParams}`);
}


export async function AddInvoice(invoice) {
  return await AxiosConfig.post('/invoices', invoice, {
    data: invoice
  });
}

