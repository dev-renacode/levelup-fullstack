import Hero from "./components/organism/Hero.jsx";
import Products from "./components/organism/Products.jsx";
import Footer from "./components/organism/Footer.jsx";
import Register from "./components/pages/Register.jsx";
import Login from "./components/pages/Login.jsx";
import Blog from "./components/pages/Blog.jsx";
import Nosotros from "./components/pages/Nosotros.jsx";
import Contact from "./components/pages/Contact.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import CategoryPage from "./components/pages/CategoryPage.jsx";
import Cart from "./components/pages/Cart.jsx";
import Checkout from "./components/pages/Checkout.jsx";
import Orders from "./components/pages/Orders.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import Profile from "./components/pages/Profile.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Hero />
          <Products />
          <Footer />
        </>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/ordenes" element={<Orders />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/categoria/:categoryName" element={<CategoryPage />} />
      <Route path="/producto/:productId" element={<ProductDetail />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  );
}

export default App;
