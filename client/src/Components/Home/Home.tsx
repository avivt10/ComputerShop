import Store from "../Store/Store";
import { useCartContext } from "../../Shared/context/cart-context";
import { useSearchContext } from "../../Shared/context/search-context";
import { useEffect } from 'react';
import { useState } from 'react';
import { ProductsType } from "../../Shared/Types/ProductsType";
import { CartType } from "../../Shared/Types/CartType";
import { useProductsContext } from "../../Shared/context/products-context";

const Home = () => {
  const {itemSearch} = useSearchContext();
  const { cart, setCart } = useCartContext();
  const {products} = useProductsContext();
  const [filteredProducts,setFilteredProducts] = useState<ProductsType>(products);

  // const storageDataCart = window.localStorage.getItem("cart")

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    if(itemSearch !== "")
    {
        let filtered = products.filter((product) => product.title.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase()))
        setFilteredProducts(filtered);
    }
    else
    {
      setFilteredProducts(products)
    }
  }, [itemSearch])



  const handleAddItemToCart = (id: string) => {
    let flag = false;
    console.log(cart)
    cart?.map((item, index) => {
      if (item.id === id) {
        setCart(
          [...cart].map((object) => {
            if (object.id === id) {
              return {
                ...object,
                counter: object.counter + 1,
              };
            } else return object;
          })
        );
        flag = true;
      }
    });
    if (!flag) {
      const newCartItem = {
        id: id,
        counter: 1,
      };
      setCart((prev: CartType[]) => [...prev, newCartItem]);
    }
  };


  return (
    <div>
      <Store
        addItemToCart={(id: string) => {handleAddItemToCart(id)}} productsItems={filteredProducts}
      />
    </div>
  );
}

export default Home;
