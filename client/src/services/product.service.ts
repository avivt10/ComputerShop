import axios from "axios";
import { ProductsType } from "../Shared/Types/ProductsType";
import config from "../config.json"

export const getProducts = () : Promise<ProductsType> => {
    return axios.get(`${config.apiUrl}/api/products/getProducts`).then((res) => {
        return res.data})
}

export const addProduct = (data:any) : Promise<ProductsType> => {
    return axios.post(`${config.apiUrl}/api/products/addProduct`,data).then((res) => {
        return res.data.message})
}

export const editProduct = (data : any) :  Promise<ProductsType> => {
    return axios.put(`${config.apiUrl}/api/products/editProduct`,data).then((res) => {
        return res.data.message})
}
export const deleteProduct = (id:string) : Promise<ProductsType> => {
    return axios.delete(`${config.apiUrl}/api/products/deleteProduct`,{ data: { id: id } }).then(response => {
        return response.data.message}).catch((e)=>{
            console.log(e);
        }) 
}