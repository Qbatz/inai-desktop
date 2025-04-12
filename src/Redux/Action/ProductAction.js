
import AxiosConfig from "../../WebService/AxiosConfig";

export async function getProduct() {
  return await AxiosConfig.get('/product/product')
}


export async function addProduct(product) {
    console.log("product",product)
    const formData = new FormData();
    formData.append("productCode", product?.productCode);
    formData.append("productName",product.productName);
    formData.append("description", product.description);
    formData.append("unit", product.unit);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("currency", product.currency);
    formData.append("weight", product.weight);
    formData.append("discount", product.discount);
    formData.append("hsnCode", product.hsnCode);
    formData.append("gst", product.gst);
    formData.append("serialNo", product.serialNo);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("make", product.make);
    formData.append("countryOfOrigin", product.countryOfOrigin);
    formData.append("manufaturingYearAndMonth", product.manufaturingYearAndMonth);
    formData.append("State", product.State);
    formData.append("district", product.district);
    formData.append("brand", product.brand);
    
    if (product?.images?.length) {
        product.images.forEach((img) => {
          formData.append("images", img);
        });
      }
      
      product?.technicaldocs?.forEach((doc, index) => {
        formData.append("technicaldocs", doc);
      });
      if(product?.additional_fields.length > 0){
        product?.additional_fields?.forEach((field, index) => {
            const key = Object.keys(field)[0];
            const value = field[key];
            formData.append(`additional_fields[${index}][key]`, key);
            formData.append(`additional_fields[${index}][value]`, value);
          });
      }
      
      
      
    return await AxiosConfig.post('/product/product',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
  }
  


  export async function DeleteProduct(del) {
    return await AxiosConfig.delete(`/product/${del}`);
  }