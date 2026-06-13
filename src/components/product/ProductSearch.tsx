import React from "react";

import "./ProductSearch.scss";

function ProductSearch({
  search,
  setSearch
}: any) {
  return (
    <input
      className="product-search"

      value={search}

      placeholder="Search product"

      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
    />
  );
}

export default ProductSearch;