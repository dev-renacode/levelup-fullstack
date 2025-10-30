import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/layout/ProtectedRoute";

// Pages
import Hero from "../components/organism/Hero";
import Products from "../components/organism/Products";
import Footer from "../components/organism/Footer";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Blog from "../components/pages/Blog";
import Nosotros from "../components/pages/Nosotros";
import Contact from "../components/pages/Contact";
import CategoryPage from "../components/pages/CategoryPage";
import ProductDetail from "../components/pages/ProductDetail";
import Cart from "../components/pages/Cart";
import Checkout from "../components/pages/Checkout";
import Orders from "../components/pages/Orders";
import Profile from "../components/pages/Profile";
import AdminDashboard from "../components/pages/AdminDashboard";

// Componente Home
const Home = () => (
  <>
    <Hero />
    <Products />
    <Footer />
  </>
);

// Componente ProductsPage
const ProductsPage = () => (
  <>
    <Products />
    <Footer />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/categoria/:categoryName" element={<CategoryPage />} />
        <Route path="/producto/:productId" element={<ProductDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contact />} />

        {/* Rutas protegidas (requieren autenticación) */}
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordenes"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Rutas de admin (requieren autenticación y rol admin) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta 404 - redirigir al home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

