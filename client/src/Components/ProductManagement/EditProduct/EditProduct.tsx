import React, { useState } from 'react'
import { ProductType } from '../../../Shared/Types/ProductsType';
import "./EditProduct.css";
import CloseIcon from "@mui/icons-material/Close";
import { editProduct, getProducts } from './../../../services/product.service';
import { useProductsContext } from '../../../Shared/context/products-context';

export type EditProductProps = {
  onClose: () => void;
  item:ProductType;
};

const EditProduct = ({onClose,item}: EditProductProps) => {
  const [title,setTitle] = useState(item.title);
  const [description,setDescription] = useState(item.description);
  const [price,setPrice] = useState(item.price);
  const [currency,setCurrency] = useState(item.currency);
  const [category,setCategory] = useState(item.category);
  const [image,setImage] = useState<any>();
  const [stock,setStock] = useState(item.stock);
  const {setProducts} = useProductsContext(); 


  const sendDataToServer = async ()=>{
    const formData = new FormData();
    formData.append('id',item._id)
    formData.append('title',title)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('currency',currency)
    formData.append('category',category)
    formData.append('image',image)
    formData.append('stock',stock)


    try{
        const res = await editProduct(formData);
        if(res)
        {
          const newProducts = await getProducts()
          setProducts(newProducts);
          alert(res);
          onClose();
        }
     
  }catch(err)
  {
    console.log(err)
  }
}
  const _editProduct = () => {
    const isValidAll = title && description && price && category && stock ;
    isValidAll ? sendDataToServer() : alert("Missing/wrong parameters")
  }
  return (
    <div className="product-management-edit-container">
      <button onClick={onClose} className="close-button-create-product">
        <CloseIcon />
        </button>
        <p className="p-header-edit"> Edit Product</p>        
        <div className="edit-main-container">
        <h4 className="h4-edit"> title </h4>
        <input className="inputs-edit" placeholder="title" type="text" value={title} onChange={(e)=> setTitle(e.target.value)} required />
        <h4 className="h4-edit"> description </h4>
        <input className="inputs-edit" placeholder="description" type="text" value={description} onChange={(e)=> setDescription(e.target.value)} required />
        <h4 className="h4-edit"> price </h4>
        <input className="inputs-edit" placeholder="price" type="text" value={price} onChange={(e)=> setPrice(e.target.value)} required />
        <h4 className="h4-edit"> currency </h4>
        <input className="inputs-edit" placeholder="currency" type="text" value={currency} onChange={(e)=> setCurrency(e.target.value)} required />
        <h4 className="h4-edit"> category </h4>
        <input className="inputs-edit" placeholder="category" type="text" value={category} onChange={(e)=> setCategory(e.target.value)} required />
        <h4 className="h4-edit"> image </h4>
        <input type="file" onChange={(e:any)=> setImage(e.target.files[0])} />
        <h4 className="h4-edit"> stock </h4>
        <input className="inputs-edit" placeholder="stock" type="text" value={stock} onChange={(e)=> setStock(e.target.value)} required />
        </div>
        <div className="button-edit-submit-container">
        <button className="button-edit-submit" onClick={_editProduct}> Edit </button>
        </div>

      </div>
  )
}

export default EditProduct