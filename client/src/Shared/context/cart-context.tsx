import { createContext,useContext } from "react";
import { CartType } from "../Types/CartType";

export type CartContextType = {
    cart:CartType[],
    setCart : Function,
    cartView: boolean,
    setCartView: Function,
}

export const CartContext = createContext<CartContextType>({
    cart:[],
    setCart:() => null,
    cartView:false,
    setCartView:() => null,
})

export const useCartContext = () => useContext(CartContext);