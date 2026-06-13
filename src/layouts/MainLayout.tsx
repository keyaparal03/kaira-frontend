import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import React from "react";
function MainLayout({
  children
}: any) {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;