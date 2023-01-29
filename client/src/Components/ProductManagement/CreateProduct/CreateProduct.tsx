import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { addProduct } from '../../../services/product.service';
import "./CreateProduct.css"
import { ProductsType } from '../../../Shared/Types/ProductsType';
import { useProductsContext } from './../../../Shared/context/products-context';
import { getProducts } from './../../../services/product.service';
export type CreateProductProps = {
  onClose: () => void;
  filteredProducts:ProductsType;
  setFilteredProducts:Function;
};
const CreateProduct = ({onClose,filteredProducts,setFilteredProducts}:CreateProductProps) => {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [currency,setCurrency] = useState("");
  const [category,setCategory] = useState("");
  const [image,setImage] = useState<any>();
  const [stock,setStock] = useState("");
  const {setProducts} = useProductsContext(); 



   const sendDataToServer = async ()=>{
    const formData = new FormData();
    formData.append('title',title)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('currency',currency)
    formData.append('category',category)
    formData.append('image',image)
    formData.append('stock',stock)

    try{
    const res = await addProduct(formData)
    if(res)
    {
     const newProducts = await getProducts()
     setProducts(newProducts);
      alert(res)
      onClose()
    }

    }
    catch(error:any){
      alert(error.response.data.message);
    }

  }

  const createProduct = ()=>{
    const isValidAll = title && description && price && category && image && stock ;
    isValidAll ? sendDataToServer() : alert("Missing/wrong parameters")
  }

  return (
    <div className="product-management-container">
             <button onClick={onClose} className="close-button-create-product">
        <CloseIcon />
        </button>
        <h5 className="add-product-text"> Add product </h5>
       <div className="product-management-container-main">
          <h4 className="text-form-h4"> add title</h4>
         <input className="inputs-create-product" type="text" placeholder='add title' required onChange={(e)=> setTitle(e.target.value)}/>
         <h4 className="text-form-h4"> add description</h4>
         <input className="inputs-create-product" type="text" placeholder='add description' onChange={(e)=> setDescription(e.target.value)}/>
         <h4 className="text-form-h4"> add price</h4>
         <input className="inputs-create-product" type="text" placeholder='add price' onChange={(e)=> setPrice(e.target.value)}/>
         <h4 className="text-form-h4"> add currency</h4>
         <input className="inputs-create-product" type="text" placeholder='add currency' onChange={(e)=> setCurrency(e.target.value)}/>
         <h4 className="text-form-h4"> add category</h4>
         <input className="inputs-create-product" type="text" placeholder='add category' onChange={(e)=> setCategory(e.target.value)}/>
        <h4 className="text-form-h4"> add image</h4>
        <input type="file" onChange={(e:any)=> setImage(e.target.files[0])}/>
         <h4 className="text-form-h4"> add stock </h4>
         <input className="inputs-create-product" type="text" placeholder='add stock ' onChange={(e)=> setStock(e.target.value)}/>
       <button onClick={createProduct} className="send-button"> send </button>
       </div>
       
    </div>
  )
}

export default CreateProduct
