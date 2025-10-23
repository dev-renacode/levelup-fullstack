import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import App from "./App.jsx";
import Navbar from "./components/organism/Navbar.jsx";
import { scrollToTop } from "./utils/scrollUtils.js";

const RootApp = () => {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("product/")) {
        setCurrentPage("product");
      } else if (hash.startsWith("categoria/")) {
        setCurrentPage("categoria");
      } else if (hash.startsWith("admin")) {
        setCurrentPage("admin");
      } else {
        setCurrentPage(hash || "home");
      }
      
      // Scroll al tope de la página cuando cambie la ruta
      scrollToTop();
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Verificar hash inicial

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-black">
          {currentPage !== "admin" && <Navbar currentPage={currentPage} />}
          <App />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default RootApp;
