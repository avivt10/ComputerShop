import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./NavBar.css";
import LoginDialog from "./../../../Components/Login/LoginDialog";
import PersonIcon from "@mui/icons-material/Person";
import { SearchBar } from "../SearchBar/SearchBar";
import { useAuthContext } from "../../context/auth-context";
import { useCartContext } from "../../context/cart-context";

const NavBar = () => {
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);
  const { isLogin, userName, token, setToken,userId,setUserId } =
    useAuthContext();
  const { cart,cartView,setCartView } = useCartContext();
  const [countAmount, setCountAmount] = useState<Number>(0);

  window.localStorage.setItem("cart", JSON.stringify(cart))
  const logOut = () => {
    window.localStorage.removeItem("userData");
    setToken("");
    setUserId("")
  }

  useEffect(() => {
    const numOfProducts = cart.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue.counter);
    }, 0);
    setCountAmount(numOfProducts);
  }, [cart]);

  if (userId === "63aada5ae6c9362630efc419" && token) {
    return (
      <div>
        <nav className="nav-bar-admin-mode">
          <ul className="nav-menu-admin-mode">
            <li>
            <p style={{marginTop:"0px",fontWeight:"700"}}>Product management</p>
            </li>
            <li>
            <Link to="/"
                className="button-logout"
                onClick={logOut}>
                {" "}
                Logout{" "}
              </Link>
            </li>
             
          </ul>
        </nav>
      </div>
    );
  }
  return (
    <div>
      <nav className="nav-bar">
        <ul className="nav-menu">
          {}
          <li>
            {cart.length > 0 ? (
              <div className="cart-amount"> {countAmount.toString()} </div>
            ) : null}
            <Link className="navbar-login" to="/cart">
              <ShoppingCartIcon onClick={()=> 
                setCartView(true)}/>
            </Link>
          </li>
          <li>
            <Link className="navbar-login" to="/store" onClick={()=> setCartView(false)}>
              Store
            </Link>
          </li>
          <li>
            {isLogin && token ? (
              <p className="welcome-user">
                {" "}
                welcome {userName}{" "}
                <Link to="/"
                  className="button-logout"
                  onClick={logOut}>
                  {" "}
                  Logout{" "}
                </Link>
              </p>
            ) : (
              <>
                <button
                  className="navbar-login"
                  onClick={() => setIsShowLoginDialog(true)}
                >
                  <PersonIcon />
                  Login
                </button>
                <LoginDialog
                  onClose={() => {
                    setIsShowLoginDialog(false);
                  }}
                  open={isShowLoginDialog}
                />
              </>
            )}
          </li>
        </ul>
        {!cartView ? ( <div className="search-container">
          <SearchBar PlaceHolder="search..." />
        </div>) : null}
       
      </nav>
      {!cartView ? (<div className="search-container-mobile">
        <SearchBar PlaceHolder="search..."/>
      </div>) : null}
      
    </div>
  );
};

export default NavBar;
