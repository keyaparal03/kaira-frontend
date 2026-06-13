import React from "react";

import "./ProductCard.scss";

function ProductCard({
  product
}: any) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p>₹ {product.price}</p>

      <button>
        View Product
      </button>

    </div>
  );
}

export default ProductCard;