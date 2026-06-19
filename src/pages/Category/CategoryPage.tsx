import React, {
useEffect
} from "react";

import {
useDispatch,
useSelector
} from "react-redux";

import {
fetchProducts
} from "../../redux/features/productThunk";

import {
addProductToCart
} from "../../redux/features/cartThunk";

import {
DEFAULT_PRODUCT_IMAGE
} from "../../constants/images";

import {
toast
} from "react-toastify";

import Loader from "../../components/loader/Loader";

import {
Link,
useParams
} from "react-router-dom";

import "../../styles/_product-grid.scss";

function CategoryPage() {

const dispatch: any =
useDispatch();

/*
GET CATEGORY FROM URL
*/

const {
categoryName
} = useParams();

const {
products,
loading
} = useSelector(
(state: any) =>
    state.product
);

/*
FETCH PRODUCTS
*/

useEffect(() => {
dispatch(
    fetchProducts()
);
}, [dispatch]);

/*
FILTER CATEGORY RESULTS
*/

const filteredProducts =
products.filter(
    (product: any) =>

    product?.category?.name
        ?.toLowerCase()
        .trim() ===
    categoryName
        ?.toLowerCase()
        .trim()
);

/*
ADD TO CART
*/

const handleAddCart =
async (
    product: any
) => {

    try {

    await dispatch(
        addProductToCart({

        productId:
            product._id,

        quantity: 1
        })
    ).unwrap();

    toast.success(
        "Added to cart 🛒"
    );

    } catch {

    toast.error(
        "Failed to add cart"
    );
    }
};

/*
LOADING
*/

if (loading) {
return <Loader />;
}

    return (
        <div className="shop-page">

            <aside className="sidebar">
            
                <h3>
                    Categories
                </h3>

                <ul>

                <li>
                <Link
                to="/category/women"
                >
                Women
                </Link>
                </li>

                <li>
                <Link
                to="/category/sarees"
                >
                Sarees
                </Link>
                </li>

                <li>
                <Link
                to="/category/beauty"
                >
                Beauty
                </Link>
                </li>

                <li>
                <Link
                to="/category/accessories"
                >
                Accessories
                </Link>
                </li>

                </ul>

            </aside>

            <div className="shop-content">

            <h2
                style={{
                marginBottom:
                    "30px"
                }}
            >
                Category:
                {categoryName}
            </h2>

            {
                filteredProducts.length === 0 ?

                <h3>
                No products found
                </h3>

                :

                <div className="product-grid">

                {
                    filteredProducts.map(
                    (
                        product: any
                    ) => (

                        <div
                        className="product-card"
                        key={
                            product._id
                        }
                        >

                        <Link
                            to={`/products/${product._id}`}
                        >

                            <img
                            src={
                                product.image ||
                                DEFAULT_PRODUCT_IMAGE
                            }

                            alt={
                                product.name
                            }

                            onError={(
                                e: any
                            ) => {
                                e.target.src =
                                DEFAULT_PRODUCT_IMAGE;
                            }}
                            />

                        </Link>

                        <span>
                            {
                            product
                                ?.category
                                ?.name
                            }
                        </span>

                        <Link
                            to={`/products/${product._id}`}
                        >

                            <h3>
                            {
                                product.name
                            }
                            </h3>

                        </Link>

                        <p>
                            ₹
                            {
                            product.price
                            }
                        </p>

                        <div className="buttons">

                            <button
                            onClick={() =>
                                handleAddCart(
                                product
                                )
                            }
                            >
                            Add To Cart
                            </button>

                        </div>

                        </div>
                    )
                    )
                }

                </div>
            }

            </div>

        </div>
    );
}

export default CategoryPage;