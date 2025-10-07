import { useState, useEffect } from "react";
import App from "./App.jsx";
import Navbar from "./components/organism/Navbar.jsx";

const RootApp = () => {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("product/")) {
        setCurrentPage("product");
      } else if (hash.startsWith("admin")) {
        setCurrentPage("admin");
      } else {
        setCurrentPage(hash || "home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Verificar hash inicial

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {currentPage !== "admin" && <Navbar currentPage={currentPage} />}
      <App />
    </div>
  );
};

export default RootApp;
