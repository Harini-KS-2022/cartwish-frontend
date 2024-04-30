import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import "./SingleProductPage.css";
import config from "../../config.json";
import QuantityInput from "./QuantityInput";
import apiClient from "../../utils/api-client";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  const { id } = useParams();
  // apiClient
  //   .get(`/products/${id}`)
  //   .then((res) => {
  //     const productInfo = {
  //       id,
  //       title: res.data.title,
  //       description: res.data.description,
  //       price: res.data.price,
  //       images: res.data.images,
  //       stock: res.data.stock,
  //     };
  //     setProduct(productInfo);
  //     console.log(product);
  //   })
  //   .catch((err) => console.log(err.message));

  const { data: product, error, isLoading } = useData(`/products/${id}`);

  return (
    <section className="single_product align_center">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  // src={image}
                  src={`${config.backendURL}/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            <img
              // src={product.images[selectedImage]}
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            {user && (
              <>
                <h2 className="quantity_title">Quantity:</h2>
                <div className="quantity_input align_center">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>
                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
