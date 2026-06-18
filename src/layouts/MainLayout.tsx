import React from "react";

import { useSelector } from "react-redux";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function MainLayout({
  children
}: any) {

  const theme =
    useSelector(
      (state: any) =>
        state.theme.theme
    );

  return (

    <div className={`app-layout ${theme}`}>

      <Header />

      <main>
        {children}
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;