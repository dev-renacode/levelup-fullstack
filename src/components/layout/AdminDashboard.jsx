import { useState, lazy, Suspense, useMemo } from "react";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";
import DashboardLoading from "../admin/DashboardLoading";

// Lazy loading de componentes pesados
const StatsCards = lazy(() => import("../admin/StatsCards"));
const RecentOrders = lazy(() => import("../admin/RecentOrders"));
const TopProducts = lazy(() => import("../admin/TopProducts"));
const SalesChart = lazy(() => import("../admin/SalesChart"));

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderContent = useMemo(() => {
    switch (currentPage) {
      case "orders":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Gestión de Pedidos
            </h2>
            <Suspense fallback={<DashboardLoading />}>
              <RecentOrders />
            </Suspense>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Inventario
            </h2>
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <p className="text-white/70 font-[Roboto]">
                Gestión de inventario en desarrollo...
              </p>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Reportes
            </h2>
            <Suspense fallback={<DashboardLoading />}>
              <SalesChart />
            </Suspense>
          </div>
        );
      case "employees":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Empleados
            </h2>
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <p className="text-white/70 font-[Roboto]">
                Gestión de empleados en desarrollo...
              </p>
            </div>
          </div>
        );
      case "customers":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Clientes
            </h2>
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <p className="text-white/70 font-[Roboto]">
                Gestión de clientes en desarrollo...
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Configuración
            </h2>
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <p className="text-white/70 font-[Roboto]">
                Configuración del sistema en desarrollo...
              </p>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Perfil
            </h2>
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <p className="text-white/70 font-[Roboto]">
                Gestión de perfil en desarrollo...
              </p>
            </div>
          </div>
        );
      case "search":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Búsqueda
            </h2>
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <p className="text-white/70 font-[Roboto]">
                Búsqueda avanzada en desarrollo...
              </p>
            </div>
          </div>
        );
      case "help":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white font-[Orbitron]">
              Ayuda
            </h2>
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <p className="text-white/70 font-[Roboto]">
                Centro de ayuda en desarrollo...
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <Suspense fallback={<DashboardLoading />}>
              <StatsCards />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Suspense fallback={<DashboardLoading />}>
                <SalesChart />
              </Suspense>
              <Suspense fallback={<DashboardLoading />}>
                <TopProducts />
              </Suspense>
            </div>

            <Suspense fallback={<DashboardLoading />}>
              <RecentOrders />
            </Suspense>
          </div>
        );
    }
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
      <div className="flex h-screen">
        <AdminSidebar currentPage={currentPage} onNavigate={handleNavigate} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />

          <div className="flex-1 overflow-y-auto p-6">{renderContent}</div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
