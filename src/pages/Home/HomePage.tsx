import React, {
  useEffect,
  useState
} from "react";

import "./HomePage.scss";

function HomePage() {
  const slides = [
    {
      title: "Enhance Style In You",
      subtitle:
        "Luxury fashion curated exclusively for modern women.",
      button: "Shop Now",
      className: "slide-1"
    },

    {
      title: "Premium Ethnic Collection",
      subtitle:
        "Elegant sarees and timeless ethnic wear.",
      button: "Explore Collection",
      className: "slide-2"
    },

    {
      title: "Luxury Accessories",
      subtitle:
        "Complete your perfect style with elegance.",
      button: "View Products",
      className: "slide-3"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Elegant Kurti",
      price: "₹1499",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
    },

    {
      id: 2,
      name: "Designer Saree",
      price: "₹2999",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
    },

    {
      id: 3,
      name: "Luxury Handbag",
      price: "₹1999",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const [currentSlide, setCurrentSlide] =
    useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setCurrentSlide(
          (prev) =>
            (prev + 1) %
            slides.length
        );
      }, 4000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="home-page">

      {/* HERO */}

      <section
        className={`hero ${slides[currentSlide].className}`}
      >
        <div className="overlay"></div>

        <div className="hero-content">

          <h1>
            {
              slides[currentSlide]
                .title
            }
          </h1>

          <p>
            {
              slides[currentSlide]
                .subtitle
            }
          </p>

          <button>
            {
              slides[currentSlide]
                .button
            }
          </button>

        </div>
      </section>

      {/* CATEGORIES */}

      <section className="categories">

        <h2>
          Shop By Category
        </h2>

        <div className="category-grid">

          <div>👗 Dresses</div>

          <div>👜 Handbags</div>

          <div>💄 Beauty</div>

          <div>👠 Footwear</div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="products">

        <h2>New Arrivals</h2>

        <div className="product-grid">

          {products.map(
            (product) => (
              <div
                className="product-card"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>
                  {product.name}
                </h3>

                <p>
                  {product.price}
                </p>

                <button>
                  Add To Cart
                </button>

              </div>
            )
          )}

        </div>

      </section>

      {/* PROMO */}

      <section className="promo">

        <div className="promo-content">

          <h2>
            Summer Collection
          </h2>

          <p>
            Flat 30% Off On Premium Styles
          </p>

          <button>
            Explore
          </button>

        </div>

      </section>

      {/* NEWSLETTER */}

      <section className="newsletter">

        <h2>
          Stay Updated
        </h2>

        <p>
          Get latest fashion updates & offers
        </p>

        <div className="newsletter-box">

          <input
            placeholder="Enter email"
          />

          <button>
            Subscribe
          </button>

        </div>

      </section>

    </div>
  );
}

export default HomePage;