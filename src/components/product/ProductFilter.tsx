import React from "react";

import "./ProductFilter.scss";

function ProductFilter() {
  return (
    <select
      className="product-filter"
    >
      <option>
        All Categories
      </option>

      <option>
        Shoes
      </option>

      <option>
        Fashion
      </option>
    </select>
  );
}

export default ProductFilter;