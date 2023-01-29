import { ProductType } from "../../Shared/Types/ProductsType";
import "./Item.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export type ItemProps = {
  item: ProductType;
  addItemToCart: (id: string) => void;
};

const Item = ({ item, addItemToCart}: ItemProps) => {
  const handleClickButton = (id: string) => {
    addItemToCart(id);
  };

  return (
    <div className="product" key={item._id}>
      <h1 className="h1-products"> {item.title}</h1>
      <img className="img-products" src={item.image} alt="img" />
      <p className="description"> {item.description}</p>
      <h4 className="price"> {item.price}{item.currency}</h4>
      <button
        className="button-cart"
        onClick={() => {
          handleClickButton(item._id);
        }}
      >
        <div className="add-to-cart-icon">
          <AddShoppingCartIcon  />
        </div>
      </button>
    </div>
  );
};

export default Item;
