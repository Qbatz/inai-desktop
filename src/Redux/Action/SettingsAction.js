import AxiosConfig from "../../WebService/AxiosConfig"



export async function Master() {
    return await AxiosConfig.get('/common/master',)
  }
  


  
export async function GetCategory() {
  return await AxiosConfig.get('/product/category')
}

export async function GetSubCategory(category) {
  return await AxiosConfig.get(`/product/subCategory`, {
    params: { catId: category.catId }
  });
}


export async function GetBrand() {
  return await AxiosConfig.get('/product/brand')
}

