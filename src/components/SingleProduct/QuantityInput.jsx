import React, { useState } from "react";

import "./QuantityInput.css";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}) => {
  // const [quantity, setQuantity] = useState(1);
  return (
    <>
      <button
        className="quantity_input_button"
        disabled={quantity === 1 ? true : false}
        // disabled="true"
        onClick={() => {
          cartPage
            ? setQuantity("decrease", productId)
            : setQuantity(quantity - 1);
        }}
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        disabled={quantity === stock ? true : false}
        onClick={() => {
          cartPage
            ? setQuantity("increase", productId)
            : setQuantity(quantity + 1);
        }}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
