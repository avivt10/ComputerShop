import { ProductsType } from '../../../../Shared/Types/ProductsType';
import CreateProduct from '../CreateProduct';

export type CreateProductDialogProps = {
    onClose : () => void;
    open: boolean;
    filteredProducts: ProductsType;
    setFilteredProducts:Function;
}

const CreateProductDialog = ({onClose,open,filteredProducts,setFilteredProducts} : CreateProductDialogProps) => {
  if(!open)
  {
    return null;
  }

  return (
    <div className="modal">
      <CreateProduct 
      onClose={onClose} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts}/>
                
    </div>
  )
}

export default CreateProductDialog;