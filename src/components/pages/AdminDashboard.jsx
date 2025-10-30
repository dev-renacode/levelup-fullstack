import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ProductManagement from "../molecules/ProductManagement";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    logout();
  };

  const handleStoreRedirect = () => {
    navigate("/");
  };

  // Iconos SVG para la navegación
  const DashboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  );

  const OrdersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  );

  const ProductsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );

  const CategoriesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );

  const UsersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const ReportsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10"/>
      <path d="M12 20V4"/>
      <path d="M6 20v-6"/>
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const StoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  );

  const LogoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );

  // Iconos para las tarjetas de características
  const FeatureDashboardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  );

  const FeatureOrdersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  );

  const FeatureProductsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );

  const FeatureCategoriesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );

  const FeatureUsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const FeatureReportsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10"/>
      <path d="M12 20V4"/>
      <path d="M6 20v-6"/>
    </svg>
  );

  const FeatureProfileIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const FeatureStoreIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-[Roboto]">
      <GameBackgroundEffects />
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/90 backdrop-blur-md border-r border-green-400/30 min-h-screen">
          <div className="p-4">
            {/* Header Sidebar */}
            <div className="mb-6 pb-4 border-b border-green-400/30">
              <h1 className="text-xl font-bold font-[Orbitron] text-green-400">Level-UP Admin</h1>
            </div>
            {/* Navigation Items */}
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate("dashboard")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 font-[Roboto] ${
                  currentPage === "dashboard"
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-white/70 hover:text-green-400 hover:bg-green-400/10"
                }`}
              >
                <DashboardIcon />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleNavigate("orders")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 font-[Roboto] ${
                  currentPage === "orders"
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-white/70 hover:text-green-400 hover:bg-green-400/10"
                }`}
              >
                <OrdersIcon />
                <span>Órdenes</span>
              </button>

              <button
                onClick={() => handleNavigate("products")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 font-[Roboto] ${
                  currentPage === "products"
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-white/70 hover:text-green-400 hover:bg-green-400/10"
                }`}
              >
                <ProductsIcon />
                <span>Productos</span>
              </button>

              <button
                onClick={() => handleNavigate("categories")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 font-[Roboto] ${
                  currentPage === "categories"
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-white/70 hover:text-green-400 hover:bg-green-400/10"
                }`}
              >
                <CategoriesIcon />
                <span>Categorías</span>
              </button>

              <button
                onClick={() => handleNavigate("users")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 font-[Roboto] ${
                  currentPage === "users"
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-white/70 hover:text-green-400 hover:bg-green-400/10"
                }`}
              >
                <UsersIcon />
                <span>Usuarios</span>
              </button>

              <button
                onClick={() => handleNavigate("reports")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 font-[Roboto] ${
                  currentPage === "reports"
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-white/70 hover:text-green-400 hover:bg-green-400/10"
                }`}
              >
                <ReportsIcon />
                <span>Reportes</span>
              </button>
            </div>

            {/* Separator */}
            <div className="border-t border-green-400/30 my-4"></div>

            {/* Profile and Action Buttons */}
            <div className="space-y-2">
              <Link
                to="/perfil"
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 text-white/70 hover:text-green-400 hover:bg-green-400/10 font-[Roboto]"
              >
                <ProfileIcon />
                <span>Perfil</span>
              </Link>

              <button
                onClick={handleStoreRedirect}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-green-500/20 border border-green-400/30 text-green-400 hover:bg-green-400/30 transition-all duration-300 font-[Roboto]"
              >
                <StoreIcon />
                <span>Tienda</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-red-500/20 border border-red-400/30 text-red-400 hover:bg-red-500/30 transition-all duration-300 font-[Roboto]"
              >
                <LogoutIcon />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-black/80 backdrop-blur-sm p-8 overflow-y-auto min-h-screen">
          <div className="max-w-7xl mx-auto">
            {currentPage === "products" ? (
              <ProductManagement />
            ) : (
              <>
                {/* Title Section */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] text-white mb-2">Dashboard</h1>
                  <p className="text-gray-300">Resumen de las actividades diarias</p>
                </div>

                {/* Top Row - Key Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Compras Card */}
              <div className="bg-black/80 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-400/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-2 text-blue-400">Compras</h3>
                    <div className="text-3xl font-bold mb-2 font-[Orbitron] text-white">1,234</div>
                    <p className="text-sm text-gray-400">Probabilidad de aumento: 20%</p>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center text-blue-400">
                    <ProductsIcon />
                  </div>
                </div>
              </div>

              {/* Productos Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 shadow-lg shadow-green-400/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-2 text-green-400">Productos</h3>
                    <div className="text-3xl font-bold mb-2 font-[Orbitron] text-white">400</div>
                    <p className="text-sm text-gray-400">Inventario actual: 500</p>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center text-blue-400">
                    <ProductsIcon />
                  </div>
                </div>
              </div>

              {/* Usuarios Card */}
              <div className="bg-black/80 backdrop-blur-md border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300 shadow-lg shadow-yellow-400/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-2 text-yellow-400">Usuarios</h3>
                    <div className="text-3xl font-bold mb-2 font-[Orbitron] text-white">890</div>
                    <p className="text-sm text-gray-400">Nuevos usuarios este mes: 120</p>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <UsersIcon />
                  </div>
                </div>
              </div>
                </div>

                {/* Bottom Grid - Feature Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Dashboard Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureDashboardIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Dashboard</h3>
                <p className="text-gray-300 text-sm">Visión general de todas las métricas y estadísticas clave del sistema.</p>
              </div>

              {/* Órdenes Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureOrdersIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Órdenes</h3>
                <p className="text-gray-300 text-sm">Gestión y seguimiento de todas las órdenes de compra realizadas.</p>
              </div>

              {/* Productos Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureProductsIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Productos</h3>
                <p className="text-gray-300 text-sm">Administrar inventario y detalles de los productos disponibles.</p>
              </div>

              {/* Categorías Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureCategoriesIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Categorías</h3>
                <p className="text-gray-300 text-sm">Organizar productos en categorías para facilitar su navegación.</p>
              </div>

              {/* Usuarios Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureUsersIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Usuarios</h3>
                <p className="text-gray-300 text-sm">Gestión de cuentas de usuario y sus roles dentro del sistema.</p>
              </div>

              {/* Reportes Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureReportsIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Reportes</h3>
                <p className="text-gray-300 text-sm">Generación de informes detallados sobre las operaciones del sistema.</p>
              </div>

              {/* Perfil Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureProfileIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Perfil</h3>
                <p className="text-gray-300 text-sm">Administración de la información personal y configuraciones de cuenta.</p>
              </div>

              {/* Tienda Card */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="text-green-400 mb-4">
                  <FeatureStoreIcon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Orbitron]">Tienda</h3>
                <p className="text-gray-300 text-sm">Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.</p>
              </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;