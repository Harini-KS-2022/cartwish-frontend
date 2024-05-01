import React, { useCallback, useEffect, useReducer, useState } from "react";
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
import cartReducer from "./reducers/cartReducer";

setAuthToken(getJWT());

const App = () => {
  const [user, setUser] = useState(null);
  // const [cart, setCart] = useState([]);
  const [cart, dispatchCart] = useReducer(cartReducer, []);

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

  const addToCart = useCallback(
    (product, quantity) => {
      dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });

      addToCartAPI(product._id, quantity)
        .then((res) => {
          toast.success("Product Added Successfuly");
        })
        .catch((err) => {
          toast.error("Failed to add product!");
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (id) => {
      dispatchCart({ type: "REMOVE_FROM_CART", payload: { id } });

      removeFromCartAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        dispatchCart({ type: "REVERT_CART", payload: { cart } });
      });
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        dispatchCart({ type: "GET_CART", payload: { products: updatedCart } });

        increaseFromCartAPI(id).catch((err) => {
          toast.error("Something went wrong!");
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
      } else {
        updatedCart[productIndex].quantity -= 1;
        dispatchCart({ type: "GET_CART", payload: { products: updatedCart } });

        decreaseFromCartAPI(id).catch((err) => {
          toast.error("Something went wrong!");
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
      }
    },
    [cart]
  );

  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
        dispatchCart({ type: "GET_CART", payload: { products: res.data } });
      })
      .catch((err) => toast.error("Something went wrong!"));
  }, [user]);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart }}
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
