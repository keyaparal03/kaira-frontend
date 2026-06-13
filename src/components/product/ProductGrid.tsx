import React from "react";

import ProductCard from "./ProductCard";

import "./ProductGrid.scss";

function ProductGrid({
  products
}: any) {
  return (
    <div className="product-grid">

      {products.map(
        (item: any) => (
          <ProductCard
            key={item._id}
            product={item}
          />
        )
      )}

    </div>
  );
}

export default ProductGrid;