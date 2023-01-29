import React, { useState,useEffect } from "react";
import { ProductType } from "../../Shared/Types/ProductsType";
import CloseIcon from "@mui/icons-material/Close";
import { useCartContext } from "../../Shared/context/cart-context";
import "./DisplayItem.css"

export type DisplayItemProps = {
  item: ProductType,
  setTotalPrice:Function,
  id:string
};
const DisplayItem = ({ item,setTotalPrice,id}: DisplayItemProps) => {
  
  const { cart, setCart} = useCartContext();
  let [amount, setAmount] = useState<Number>();
  const deleteProduct = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    setTotalPrice( Number(item.price.substring(0,item.price.length - 1)) - Number(item.price))
  };


  useEffect(() => {
    cart.map(item => {
      if(item.id === id)
      {
        setAmount(item.counter)
      }
    }
    )  
  }, [])
  
  const onAmountChange = (amount:Number) => {
    setCart(
      [...cart].map((object) => {
        if(object.id === item._id){
        return{
          ...object,
          counter:amount,
        };
      }else return object;
    })
    )
    setAmount(amount)
  }

 
  return (
    <tr>
      <td>
        <button
          style={{ display: "block", margin:"auto",border:"none",background:"bottom",cursor:"pointer"}}
          onClick={() => deleteProduct(item._id)}
        >
          <CloseIcon />
        </button>
      </td>
      <td>
        <div>
          <img className="img-item" src={item.image} alt="img" />
          <p className="description-cart"> {item.description}</p>
        </div>
      </td>
      <td>
        <input className="amount-item"
          type="number"
          min="1"
          value={amount?.toString()}
          placeholder="1"
          onChange={(e) => onAmountChange(Number(e.target.value))}
        />
      </td>

      <td>
        <h4> {item.price}</h4>
      </td>
      <td>
        <h4 style={{ margin: "auto" }}> { 
        Number(item.price) * Number(amount)}$ </h4>
        
      </td>
    </tr>
  );
};

export default DisplayItem;
