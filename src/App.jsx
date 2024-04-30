import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJWT, getUser } from "./components/services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  getCartAPI,
  increaseFromCartAPI,
  removeFromCartAPI,
  decreaseFromCartAPI,
} from "./components/services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import "./context/UserContext";
import UserContext from "./context/UserContext";
import CartContext from "./context/CartContext";

setAuthToken(getJWT());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    // setCart([...cart, { product, quantity }]);
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Successfuly");
      })
      .catch((err) => {
        toast.error("Failed to add product!");
        setCart(cart);
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);
    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);

      increaseFromCartAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    } else {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseFromCartAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => setCart(res.data))
      .catch((err) => toast.error("Something went wrong!"));
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
