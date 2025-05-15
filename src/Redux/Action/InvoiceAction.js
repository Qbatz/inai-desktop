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
