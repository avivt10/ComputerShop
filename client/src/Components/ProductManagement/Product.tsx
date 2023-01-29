import React,{useState} from 'react'
import { deleteProduct, getProducts } from '../../services/product.service';
import { useProductsContext } from '../../Shared/context/products-context';
import { ProductType } from '../../Shared/Types/ProductsType'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProductDialog from "./EditProduct/EditProductDialog/EditProductDialog";

export type ProductProps = {
  item: ProductType;
}

const Product = ({item}:ProductProps) => {
  const [isShowEditProductDialog, setIsShowIsEditProductDialog] =
    useState(false);
    const {setProducts} = useProductsContext();
    
    const beforeDeletion = (id: string) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        sendDeleteProduct(id);
      }
    };
    const sendDeleteProduct = async (id: string) => {
      const res = await deleteProduct(id);
      if (res) {
        const newProducts = await getProducts();
        setProducts(newProducts);
        alert(res);
      } else {
        alert("delete failed! try again");
      }
    };
  


  return (
    <div>
            <div className="product" key={item._id}>
              <div style={{ display: "flex" }}>
                <button
                  className="delete-product"
                  onClick={() => {
                    beforeDeletion(item._id);
                  }}
                >
                  <DeleteIcon
                    style={{ height: "40px", background: "bottom" }}
                  />
                </button>
                <button
                  className="edit-product"
                  onClick={() => {
                    setIsShowIsEditProductDialog(true);
                  }}
                >
                  <EditIcon />
                </button>
                <EditProductDialog
                  onClose={() => {
                    setIsShowIsEditProductDialog(false);
                  }}
                  open={isShowEditProductDialog}
                  item={item}
                />
              </div>
              <h1 className="h1-products"> {item.title}</h1>
              <img className="img-products" src={item.image} alt="img" />
              <p className="description"> {item.description}</p>
              <h4 className="price">
                {" "}
                {item.price}
                {item.currency}
              </h4>
              <h5 className="stock-style"> Stock quantity:   
        {Number(item.stock)}</h5>
            </div>

      </div>
  )
}

export default Product