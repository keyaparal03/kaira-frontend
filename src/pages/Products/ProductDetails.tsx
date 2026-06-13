import React, {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import ProductService from "../../services/product.service";

import "./ProductDetails.scss";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  /*
  |--------------------------------------------------------------------------
  | Fetch Product
  |--------------------------------------------------------------------------
  */

  const fetchProduct =
    async () => {
      try {
        const response:any=
          await ProductService.getProduct(
            id as string
          );

        setProduct(
          response.data
        );
      } catch (error) {
        console.log(
          "Product fetch error",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | Add To Cart
  |--------------------------------------------------------------------------
  */

  const handleAddToCart =
    async () => {
      // later connect cart API

      alert(
        `${product?.name} added to cart`
      );

      console.log({
        productId:
          product?._id,
        quantity
      });
    };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div>
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        Product not found
      </div>
    );
  }

  return (
    <div className="product-details">

      {/* Image */}

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      {/* Info */}

      <div className="product-info">

        <h1>
          {product.name}
        </h1>

        <p className="price">
          ₹ {product.price}
        </p>

        <p className="description">
          {product.description}
        </p>

        {/* Quantity */}

        <div className="quantity-box">

          <button
            onClick={() =>
              setQuantity(
                quantity > 1
                  ? quantity - 1
                  : 1
              )
            }
          >
            -
          </button>

          <span>
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(
                quantity + 1
              )
            }
          >
            +
          </button>

        </div>

        {/* Buttons */}

        <div className="button-group">

          <button
            className="cart-btn"
            onClick={
              handleAddToCart
            }
          >
            Add To Cart
          </button>

          <button className="buy-btn">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;