import { useEffect, useState } from "react";
import { useCartContext } from "./../../Shared/context/cart-context";
import { ProductsType } from "../../Shared/Types/ProductsType";
import "./Cart.css";
import DisplayItem from "./DisplayItem";
import { Link } from "react-router-dom";
import { useProductsContext } from './../../Shared/context/products-context';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ShoppingCart from "@mui/icons-material/ShoppingCart";

const Cart = () => {
  const {cart} = useCartContext();
  const {products} = useProductsContext();
  let [productsInCart, setProductsInCart] = useState<ProductsType>([]);
  let [totalPrice,setTotalPrice] = useState<Number>(0);
  let [countAmount,setCountAmount] = useState<Number>(0);

  useEffect(() => {
    const filteredProducts = products.filter((allProducts) => 
    cart.some((item) => item.id === allProducts._id));
    setProductsInCart(filteredProducts);
  }, [cart]);

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < cart.length; j++) {
        if(products[i]._id === cart[j].id)
        {
          price += Number(products[i].price) * cart[j].counter;
          setTotalPrice(price);
        }
      }
      
    }

    const numOfProducts = cart.reduce((accumulator, currentValue) => {
      return (accumulator + Number(currentValue.counter))},0)
      setCountAmount(numOfProducts);
  }, [cart])



  if (cart.length > 0) {
    return (
      <div >
        <p className="my-cart-text"> My Cart  </p>
        <div>
          <table>
            <thead>
            <tr>
              <th> </th>
              <th> Product Name </th>
              <th> Amount </th>
              <th> Price </th>
              <th> Total </th>
            </tr>
            </thead>
              {productsInCart.map((product,index) => (
                <DisplayItem key={index} id={product._id} item={product}  setTotalPrice={setTotalPrice}/>
              ))}
          </table>
          <div className="completion-of-purchase-button">
            <Link className="button-purchase" to="/cart/payment">  
            to complete the purchase
            </Link>
         
            <>
            total({countAmount} Products): {totalPrice}$
            </>
       
          </div>
        </div>

      </div>
    );
  } 
  else {
    return (
      <div className="cart-empty">     
        <ShoppingCart className="shopping-cart-style"/>
        <div style={{display:"flex",margin:"auto"}}>
        <h5 className="h5-cart"> The shopping cart is empty..</h5>
        <SentimentVeryDissatisfiedIcon style={{height:"auto"}}/>
        </div>
    
      </div>
    );
  }
};

export default Cart;
