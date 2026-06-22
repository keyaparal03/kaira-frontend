import React from "react";
import "./AboutPage.scss";

function AboutPage() {

  return (

    <div className="about-page">

      {/* HERO */}

      <section className="about-banner">

        <div className="overlay">

          <h1>
            About KAIRA
          </h1>

          <p>
            Elegance Crafted For Every Woman
          </p>

        </div>

      </section>

      {/* STORY */}

      <section className="about-section">

        <div className="container">

          <h2>
            Our Story
          </h2>

          <p>

            KAIRA Fashion is more than just
            a fashion brand — it is a
            celebration of style, elegance,
            tradition and individuality.

            We bring together beautifully
            handcrafted jewelry, oxidized
            collections, ethnic accessories,
            and women’s fashion designed
            to make every woman feel unique.

          </p>

        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="why-us">

        <h2>
          Why Choose Us
        </h2>

        <div className="features">

          <div className="feature-card">

            <div>💎</div>

            <h3>
              Premium Quality
            </h3>

            <p>
              Handcrafted with premium
              materials and fine detailing.
            </p>

          </div>

          <div className="feature-card">

            <div>✨</div>

            <h3>
              Unique Collection
            </h3>

            <p>
              Exclusive oxidized and
              handmade designs for every
              occasion.
            </p>

          </div>

          <div className="feature-card">

            <div>👗</div>

            <h3>
              Women Fashion
            </h3>

            <p>
              Trendy boutique fashion made
              for modern confident women.
            </p>

          </div>

          <div className="feature-card">

            <div>🚚</div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Safe packaging and quick
              delivery across India.
            </p>

          </div>

        </div>

      </section>

      {/* MISSION */}

      <section className="mission">

        <h2>
          Our Mission
        </h2>

        <p>

          Our mission is to empower women
          through fashion by delivering
          affordable luxury, handmade
          artistry, and elegant accessories
          that define confidence and beauty.

        </p>

      </section>

    </div>
  );
}

export default AboutPage;