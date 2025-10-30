import { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import App from "./App.jsx";
import Navbar from "./components/organism/Navbar.jsx";
import { scrollToTop } from "./utils/scrollUtils.js";

const LayoutWithNavbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-black">
      {!isAdminRoute && <Navbar />}
      <App />
    </div>
  );
};

const RootApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <LayoutWithNavbar />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default RootApp;
