import { useState, useEffect } from "react";
import Hero from "./components/layout/Hero.jsx";
import Products from "./components/layout/Products.jsx";
import Footer from "./components/layout/Footer.jsx";
import Register from "./components/layout/Register.jsx";
import Login from "./components/layout/Login.jsx";
import Blog from "./components/layout/Blog.jsx";
import Contact from "./components/layout/Contact.jsx";
import ProductDetail from "./components/layout/ProductDetail.jsx";
import AdminDashboard from "./components/layout/AdminDashboard.jsx";

function App() {
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
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  switch (currentPage) {
    case "login":
      return <Login />;
    case "register":
      return <Register />;
    case "blog":
      return <Blog />;
    case "contacto":
      return <Contact />;
    case "product":
      return <ProductDetail />;
    case "admin":
      return <AdminDashboard />;
    case "home":
    default:
      return (
        <>
          <Hero />
          <Products />
          <Footer />
        </>
      );
  }
}

export default App;
