import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../organism/Navbar";

const Layout = () => {
  const location = useLocation();
  
  // No mostrar Navbar en rutas de admin
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-black">
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;

