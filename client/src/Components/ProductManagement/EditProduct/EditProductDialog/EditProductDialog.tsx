import {ProductType } from '../../../../Shared/Types/ProductsType';
import EditProduct from '../EditProduct';

export type EditProductDialogProps = {
  onClose : () => void;
  open: boolean;
  item: ProductType;
}

const EditProductDialog = ({onClose,open,item} : EditProductDialogProps) => {
  if(!open)
  {
    return null;
  }
  return (
    <div className="modal">
      <EditProduct onClose={onClose} item={item}/>
    </div>
  )
}

export default EditProductDialog