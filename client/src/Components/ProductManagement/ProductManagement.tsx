import React, { useState, useEffect } from "react";
import "./ProductManagement.css";
import { useProductsContext } from "./../../Shared/context/products-context";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateProductDialog from "./CreateProduct/CreateProductDialog/CreateProductDialog";
import { ProductsType } from "../../Shared/Types/ProductsType";

import Product from "./Product";

const ProductManagement = () =>{ 
  const [isShowCreateProductDialog, setIsShowCreateProductDialog] =
    useState(false);
  const { products } = useProductsContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductsType>([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  
  const sortedByHeighPrice = () => {
    const sortedProducts = [...products].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    setFilteredProducts(sortedProducts);
  };

  const sortedByLowPrice = () => {
    const sortedProducts = [...products].sort(
      (b, a) => parseFloat(b.price) - parseFloat(a.price)
    );
    setFilteredProducts(sortedProducts);
  };

  const sortedByName = () => {
    setFilteredProducts(
      [...products].sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : a.title.toLowerCase() < b.title.toLowerCase()
          ? -1
          : 0
      )
    );
  };

  const handleChange = (value: string) => {
    console.log(value);
    switch (value) {
      case "Highest Price":
        sortedByHeighPrice();
        break;
      case "Lowest Price":
        sortedByLowPrice();
        break;
      case "Name":
        sortedByName();
        break;
      default:
        console.log("234");
    }
  };



return(
<div>
        <div className="sort-container">
        <p className="sort-text"> sorted by:</p>
        <select
          onChange={(e) => handleChange(e.target.value)}
          className="select-product-management"
        >
          <option value="Highest Price"> Highest Price </option>
          <option value="Lowest Price"> Lowest Price </option>
          <option value="Name"> Name </option>
        </select>
        <p> {filteredProducts.length} products</p>
         </div>
      <div className="product-management-main-container">
        <div className="product">
          <h4 style={{ textAlign: "center"}}> To add a new product </h4>
          <button
            className="add-product"
            onClick={() => setIsShowCreateProductDialog(true)}
          > 
            <AddCircleOutlineIcon style={{ height: "auto", width: "100px",marginTop:"110px"}} />
          </button>
          <CreateProductDialog
            onClose={() => {
              setIsShowCreateProductDialog(false);
            }}
            open={isShowCreateProductDialog}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </div>

  
      {filteredProducts.map((item,index) => {
        return(
          <div>          
            <Product key={index} item={item}/>
          </div>

      )})}
    </div>
  </div>
)}

export default ProductManagement;
