import { useState, useEffect } from "react";
import { getAllOrders, getAllProducts } from "../../config/firestoreService";

const ReportsManagement = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [ordersData, productsData] = await Promise.all([
        getAllOrders(),
        getAllProducts()
      ]);
      setOrders(ordersData);
      setProducts(productsData);
      calculateStats(ordersData, productsData);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("Error al cargar los datos para los reportes");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ordersData, productsData) => {
    // Filtrar solo órdenes completadas
    const completedOrders = ordersData.filter(order => 
      order.estado === "completado" || !order.estado // Si no tiene estado, considerar completado
    );

    // Calcular ingresos totales
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.total || 0), 0);

    // Calcular total de ventas
    const totalSales = completedOrders.length;

    // Calcular promedio de venta
    const averageSale = totalSales > 0 ? totalRevenue / totalSales : 0;

    // Calcular total de productos vendidos
    const totalProductsSold = completedOrders.reduce((sum, order) => 
      sum + (order.totalProductos || order.productos?.length || 0), 0
    );

    // Calcular producto más vendido
    const productSales = {};
    completedOrders.forEach(order => {
      if (order.productos && Array.isArray(order.productos)) {
        order.productos.forEach(product => {
          const productId = product.idProducto || product.id;
          const productName = product.nombre;
          const quantity = product.cantidad || 0;
          
          if (productId && productName) {
            if (!productSales[productId]) {
              productSales[productId] = {
                id: productId,
                nombre: productName,
                cantidad: 0,
                ingresos: 0,
                imagen: product.imagen
              };
            }
            productSales[productId].cantidad += quantity;
            productSales[productId].ingresos += (product.subtotal || product.precio * quantity || 0);
          }
        });
      }
    });

    // Obtener top productos vendidos
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 10);

    // Producto más vendido
    const bestSeller = topProducts.length > 0 ? topProducts[0] : null;

    // Calcular ventas por mes (últimos 6 meses)
    const monthlySales = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long' });
      monthlySales[monthKey] = {
        mes: monthKey,
        ventas: 0,
        ingresos: 0
      };
    }

    completedOrders.forEach(order => {
      const orderDate = order.fechaCreacion?.toDate ? order.fechaCreacion.toDate() : new Date(order.fechaCreacion);
      const monthKey = orderDate.toLocaleDateString('es-CL', { year: 'numeric', month: 'long' });
      if (monthlySales[monthKey]) {
        monthlySales[monthKey].ventas += 1;
        monthlySales[monthKey].ingresos += (order.total || 0);
      }
    });

    // Calcular ventas por estado
    const salesByStatus = {
      completado: ordersData.filter(o => o.estado === "completado" || !o.estado).length,
      procesando: ordersData.filter(o => o.estado === "procesando").length,
      pendiente: ordersData.filter(o => o.estado === "pendiente").length
    };

    setStats({
      totalRevenue,
      totalSales,
      averageSale,
      totalProductsSold,
      bestSeller,
      topProducts,
      monthlySales: Object.values(monthlySales),
      salesByStatus
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">Cargando reportes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-400 text-lg">{error}</p>
          <button 
            onClick={loadData} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-16">
        <p className="text-white text-lg">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] text-white mb-2">Reportes y Estadísticas</h1>
        <p className="text-gray-300">Análisis completo de ventas y productos</p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-green-400">Ingresos Totales</h3>
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-3xl font-bold font-[Orbitron] text-white mb-2">
            {formatPrice(stats.totalRevenue)}
          </div>
          <p className="text-gray-400 text-sm">Total generado</p>
        </div>

        <div className="bg-black/80 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-blue-400">Total de Ventas</h3>
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="text-3xl font-bold font-[Orbitron] text-white mb-2">
            {stats.totalSales}
          </div>
          <p className="text-gray-400 text-sm">Órdenes completadas</p>
        </div>

        <div className="bg-black/80 backdrop-blur-md border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-purple-400">Promedio de Venta</h3>
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-3xl font-bold font-[Orbitron] text-white mb-2">
            {formatPrice(stats.averageSale)}
          </div>
          <p className="text-gray-400 text-sm">Por orden</p>
        </div>

        <div className="bg-black/80 backdrop-blur-md border border-yellow-400/30 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-yellow-400">Productos Vendidos</h3>
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="text-3xl font-bold font-[Orbitron] text-white mb-2">
            {stats.totalProductsSold}
          </div>
          <p className="text-gray-400 text-sm">Unidades totales</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Producto Más Vendido */}
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white font-[Orbitron] mb-6">Producto Más Vendido</h2>
          {stats.bestSeller ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-black/50 border border-green-400/30 rounded-lg p-4">
                {stats.bestSeller.imagen && (
                  <img
                    src={stats.bestSeller.imagen}
                    alt={stats.bestSeller.nombre}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-white text-lg font-bold font-[Orbitron] mb-2">
                    {stats.bestSeller.nombre}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Cantidad Vendida</p>
                      <p className="text-green-400 text-xl font-bold">{stats.bestSeller.cantidad} unidades</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Ingresos Generados</p>
                      <p className="text-green-400 text-xl font-bold">{formatPrice(stats.bestSeller.ingresos)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No hay productos vendidos aún</p>
            </div>
          )}
        </div>

        {/* Ventas por Estado */}
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white font-[Orbitron] mb-6">Ventas por Estado</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-black/50 border border-green-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">Completadas</span>
              </div>
              <span className="text-green-400 font-bold text-lg">{stats.salesByStatus.completado}</span>
            </div>
            <div className="flex items-center justify-between bg-black/50 border border-yellow-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-white">Procesando</span>
              </div>
              <span className="text-yellow-400 font-bold text-lg">{stats.salesByStatus.procesando}</span>
            </div>
            <div className="flex items-center justify-between bg-black/50 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white">Pendientes</span>
              </div>
              <span className="text-blue-400 font-bold text-lg">{stats.salesByStatus.pendiente}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 Productos Más Vendidos */}
      <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white font-[Orbitron] mb-6">Top 10 Productos Más Vendidos</h2>
        {stats.topProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50 border-b border-green-400/30">
                <tr>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">#</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Producto</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Cantidad Vendida</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {stats.topProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-b border-green-400/10 hover:bg-green-400/5 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-white font-[Roboto] font-bold">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {product.imagen && (
                          <img
                            src={product.imagen}
                            alt={product.nombre}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <span className="text-white font-[Roboto] font-medium">{product.nombre}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/80 font-[Roboto]">
                      {product.cantidad} unidades
                    </td>
                    <td className="py-4 px-6 text-green-400 font-[Roboto] font-bold">
                      {formatPrice(product.ingresos)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No hay productos vendidos aún</p>
          </div>
        )}
      </div>

      {/* Ventas por Mes */}
      <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white font-[Orbitron] mb-6">Ventas por Mes (Últimos 6 Meses)</h2>
        {stats.monthlySales.length > 0 ? (
          <div className="space-y-4">
            {stats.monthlySales.map((month, index) => (
              <div key={index} className="bg-black/50 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold font-[Orbitron]">{month.mes}</h3>
                  <span className="text-green-400 font-bold">{month.ventas} ventas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Ingresos del mes</span>
                  <span className="text-green-400 font-bold">{formatPrice(month.ingresos)}</span>
                </div>
                {/* Barra de progreso visual */}
                <div className="mt-3 bg-black/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-full transition-all duration-500"
                    style={{
                      width: `${stats.totalRevenue > 0 ? (month.ingresos / stats.totalRevenue) * 100 : 0}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No hay datos de ventas por mes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsManagement;

