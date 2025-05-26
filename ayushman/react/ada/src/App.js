import { useEffect, useContext } from "react";
import axios from "axios";
import { CartContext, CartProvider } from "./component/Pages/CartContext";
import HomePage from "./component/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./component/Pages/AboutUs";
import Login from "./component/LoginPages/Login";
import SignUp from "./component/LoginPages/SignUp";
import Search from "./component/Pages/SearchPage";
import Cart from "./component/Pages/Cart";

// This component loads the cart from backend once the CartProvider is available
function CartLoader() {
  const { setCartItems, setCartLoading } = useContext(CartContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    if (user) {
      setCartLoading(true);
      axios.get(`http://localhost:5000/get-cart/${user._id}`)
        .then(res => {
          const dbCart = res.data || [];
          setCartItems(dbCart);
        })
        .catch(err => {
          console.error("Error loading user cart", err);
          setCartItems([]);
        })
        .finally(() => {
          setCartLoading(false);
        });
    } else {
      setCartLoading(false);
    }
  }, [setCartItems, setCartLoading]);

  return null;
}


function App() {
  return (
    <CartProvider>
      <CartLoader />  {/* Load user's cart on app start */}
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/About" element={<ProfilePage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
