import { useState, useEffect } from "react";
import Hero from "./components/organism/Hero.jsx";
import Products from "./components/organism/Products.jsx";
import Footer from "./components/organism/Footer.jsx";
import Register from "./components/pages/Register.jsx";
import Login from "./components/pages/Login.jsx";
import Blog from "./components/pages/Blog.jsx";
import Contact from "./components/pages/Contact.jsx";
import ProductDetail from "./components/molecules/ProductDetail.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import CategoryPage from "./components/pages/CategoryPage.jsx";
import Cart from "./components/pages/Cart.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith("product/")) {
        setCurrentPage("product");
      } else if (hash.startsWith("categoria/")) {
        setCurrentPage("categoria");
        const category = decodeURIComponent(hash.replace("categoria/", ""));
        setCategoryName(category);
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
    case "carrito":
      return <Cart />;
    case "productos":
      return (
        <>
          <Products />
          <Footer />
        </>
      );
    case "categoria":
      return <CategoryPage categoryName={categoryName} />;
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
