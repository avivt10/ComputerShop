import { createContext,useContext } from "react";
import { ProductsType } from "../Types/ProductsType";
export type ProductsContextType = {
    products : ProductsType,
    setProducts : Function,
    
}

export const ProductsContext = createContext<ProductsContextType>({
    products:[],
    setProducts:() => null,
})

export const useProductsContext = () => useContext(ProductsContext);