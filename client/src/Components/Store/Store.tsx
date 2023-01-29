import Item from "../Item/Item";
import { ProductsType } from "../../Shared/Types/ProductsType";

export type StoreProps = {
  addItemToCart: (id:string)=> void,
  productsItems:ProductsType
}

const Store = ({addItemToCart,productsItems} : StoreProps) => {

if(productsItems.length > 0)
{
  return(
    <div className="products-container">
      {productsItems.map((item,index)=>{
        return(
          <Item key={index} addItemToCart={(id: string) => {
          addItemToCart(id);
        }} item={item}/>
        )
      })}
    
    </div>
      )
}
    
  return(
    <div style={{textAlign:"center",fontSize:"45px",marginTop:"300px",fontWeight:"600"}}> No results</div>
  )
};

export default Store;
