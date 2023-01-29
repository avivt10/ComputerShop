import "./App.css";
import NavBar from "./Shared/Components/NavBar/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import { CartContext } from "./Shared/context/cart-context";
import React, { useState, useEffect } from "react";
import { SearchContext } from "./Shared/context/search-context";
import { AuthContext } from "./Shared/context/auth-context";
import { CartType } from "./Shared/Types/CartType";
import Payment from "./Components/Cart/Payment";
import { ProductsType } from "./Shared/Types/ProductsType";
import { ProductsContext } from "./Shared/context/products-context";
import { getProducts } from "./services/product.service";
import ProductManagement from "./Components/ProductManagement/ProductManagement";
import { ClipLoader } from "react-spinners";

function App() {
  const [cart, setCart] = useState<CartType[]>([]);
  const [itemSearch, setItemSearch] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [products, setProducts] = useState<ProductsType>([]);
  const [loading, setLoading] = useState(false);
  const [userId,setUserId] = useState("")
  const [cartView,setCartView] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredCart = JSON.parse(localStorage.getItem('cart') || '[]');
       setCart(filteredCart)
      const getAllProducts = async () => {
        const allProducts = await getProducts();
        setProducts(allProducts);
      };
      getAllProducts();
      setLoading(false);
      const storageData = JSON.parse(localStorage.getItem('userData') || '{}');
      if(storageData && storageData.token && storageData.firstName && storageData.id){
        setToken(storageData.token);
        setUserName(storageData.firstName)
        setUserId(storageData.id)
        setIsLogin(true);
      }
    }, 1000);
  }, []);

  if (products.length === 0) {
    return (
      <div className="spinner-container">
        <ClipLoader />
      </div>
    );
  }

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path="/cart/payment" exact>
        <Payment />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  if (userId === "63aada5ae6c9362630efc419" ) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <ProductManagement />
        </Route>
        <Route path="/product-management" exact>
          <ProductManagement />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Router>
      <ProductsContext.Provider value={{ products, setProducts}}>
        <CartContext.Provider value={{ cart, setCart,cartView,setCartView }}>
          <SearchContext.Provider value={{ itemSearch, setItemSearch }}>
            <AuthContext.Provider
              value={{
                isLogin,
                setIsLogin,
                token,
                setToken,
                userName,
                setUserName,
                role,
                setRole,
                userId,
                setUserId,
              }}
            >
              <NavBar />
              <main>{routes}</main>
            </AuthContext.Provider>
          </SearchContext.Provider>
        </CartContext.Provider>
      </ProductsContext.Provider>
    </Router>
  );
}

export default App;
