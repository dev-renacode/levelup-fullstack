import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../config/firestoreService";
import { downloadEnhancedInvoicePDF } from "../../utils/pdfGenerator";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const ordersData = await getAllOrders();
      // Ordenar por fecha de creación (más recientes primero)
      const sortedOrders = ordersData.sort((a, b) => 
        new Date(b.fechaCreacion?.toDate?.() || b.fechaCreacion) - new Date(a.fechaCreacion?.toDate?.() || a.fechaCreacion)
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error al cargar órdenes:", err);
      setError("Error al cargar las órdenes");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;

    try {
      setUpdatingStatus(true);
      await updateOrderStatus(selectedOrder.id, newStatus);
      
      // Actualizar el estado local
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id
            ? { ...order, estado: newStatus }
            : order
        )
      );
      
      setShowStatusModal(false);
      setSelectedOrder(null);
      
      // Mostrar notificación de éxito
      showNotification("Estado actualizado correctamente", "success");
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      showNotification("Error al actualizar el estado", "error");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 font-bold animate-slide-in ${
      type === "success" ? "bg-green-500 text-black" : "bg-red-500 text-white"
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return "Fecha no disponible";
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completado':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'procesando':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'pendiente':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completado':
        return 'Completado';
      case 'procesando':
        return 'Procesando';
      case 'pendiente':
        return 'Pendiente';
      default:
        return status;
    }
  };

  // Icono de ojo
  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  // Icono de actualizar
  const UpdateIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
    </svg>
  );

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">Cargando órdenes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-400 text-lg">{error}</p>
          <button 
            onClick={loadOrders} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] text-white mb-2">Gestión de Órdenes</h1>
        <p className="text-gray-300">Administra y gestiona todas las órdenes de compra</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">{orders.length}</div>
          <div className="text-sm text-gray-400">Total de Órdenes</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-blue-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {orders.filter(o => o.estado === 'pendiente').length}
          </div>
          <div className="text-sm text-gray-400">Pendientes</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-yellow-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {orders.filter(o => o.estado === 'procesando').length}
          </div>
          <div className="text-sm text-gray-400">Procesando</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {orders.filter(o => o.estado === 'completado').length}
          </div>
          <div className="text-sm text-gray-400">Completadas</div>
        </div>
      </div>

      {/* Tabla de órdenes */}
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-12 max-w-md mx-auto">
            <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
            </svg>
            <h3 className="text-white text-2xl font-bold mb-4">No hay órdenes</h3>
            <p className="text-gray-400">Aún no se han realizado compras en la tienda</p>
          </div>
        </div>
      ) : (
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50 border-b border-green-400/30">
                <tr>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">ID Orden</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Cliente</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Fecha</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Total</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Estado</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-green-400/10 hover:bg-green-400/5 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-white font-[Roboto] font-medium">
                      {order.numeroOrden || order.id}
                    </td>
                    <td className="py-4 px-6 text-white/80 font-[Roboto]">
                      {order.informacionCliente?.nombre} {order.informacionCliente?.apellidos}
                    </td>
                    <td className="py-4 px-6 text-white/60 font-[Roboto] text-sm">
                      {formatDate(order.fechaCreacion)}
                    </td>
                    <td className="py-4 px-6 text-green-400 font-[Roboto] font-bold">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.estado)}`}>
                        {getStatusText(order.estado)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(order)}
                          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-400 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                          title="Ver detalle"
                        >
                          <EyeIcon />
                          <span className="text-sm">Ver</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(order)}
                          className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 text-yellow-400 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                          title="Actualizar estado"
                        >
                          <UpdateIcon />
                          <span className="text-sm">Estado</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Detalles */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 border border-green-400/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-[Orbitron]">
                  Detalles de la Orden #{selectedOrder.numeroOrden || selectedOrder.id}
                </h2>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
                  <h3 className="text-green-400 font-bold mb-3">Información del Cliente</h3>
                  <p className="text-white text-sm mb-1">
                    <span className="text-gray-400">Nombre:</span> {selectedOrder.informacionCliente?.nombre} {selectedOrder.informacionCliente?.apellidos}
                  </p>
                  <p className="text-white text-sm mb-1">
                    <span className="text-gray-400">Email:</span> {selectedOrder.informacionCliente?.correo}
                  </p>
                  <p className="text-white text-sm">
                    <span className="text-gray-400">Fecha:</span> {formatDate(selectedOrder.fechaCreacion)}
                  </p>
                </div>

                <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
                  <h3 className="text-green-400 font-bold mb-3">Dirección de Entrega</h3>
                  <p className="text-white text-sm mb-1">
                    {selectedOrder.direccionEntrega?.calle} {selectedOrder.direccionEntrega?.departamento}
                  </p>
                  <p className="text-white text-sm mb-1">
                    {selectedOrder.direccionEntrega?.comuna}, {selectedOrder.direccionEntrega?.region}
                  </p>
                  {selectedOrder.direccionEntrega?.indicaciones && (
                    <p className="text-white text-sm italic">
                      Indicaciones: {selectedOrder.direccionEntrega.indicaciones}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-black/50 border border-green-400/30 rounded-lg p-4 mb-6">
                <h3 className="text-green-400 font-bold mb-3">Productos</h3>
                <div className="space-y-2">
                  {selectedOrder.productos?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        {item.imagen && (
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="text-white font-medium">{item.nombre}</p>
                          <p className="text-gray-400 text-sm">Cantidad: {item.cantidad} × {formatPrice(item.precio)}</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-bold">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black/50 border border-green-400/30 rounded-lg p-4 mb-6">
                <h3 className="text-green-400 font-bold mb-3">Resumen</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({selectedOrder.totalProductos} items):</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Envío:</span>
                    <span className="text-green-400">Gratis</span>
                  </div>
                  <div className="border-t border-green-400/30 pt-2">
                    <div className="flex justify-between text-white font-bold">
                      <span>Total:</span>
                      <span className="text-green-400">{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-300 mt-2">
                    <span>Estado:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedOrder.estado)}`}>
                      {getStatusText(selectedOrder.estado)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Método de pago:</span>
                    <span>{selectedOrder.metodoPago}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    try {
                      downloadEnhancedInvoicePDF(selectedOrder, selectedOrder.id);
                    } catch (error) {
                      console.error('Error al generar PDF:', error);
                      showNotification('Error al generar el PDF', 'error');
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                  Descargar Boleta
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedOrder(null);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Actualizar Estado */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 border border-green-400/30 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-[Orbitron]">
                  Actualizar Estado
                </h2>
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-300 mb-4">
                  Orden: <span className="text-white font-bold">{selectedOrder.numeroOrden || selectedOrder.id}</span>
                </p>
                <p className="text-gray-300 mb-4">
                  Estado actual: <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedOrder.estado)}`}>
                    {getStatusText(selectedOrder.estado)}
                  </span>
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleStatusChange('pendiente')}
                  disabled={updatingStatus || selectedOrder.estado === 'pendiente'}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedOrder.estado === 'pendiente'
                      ? 'bg-blue-500/20 border-blue-400/50 text-blue-400'
                      : 'bg-black/50 border-blue-400/30 text-white hover:bg-blue-500/20 hover:border-blue-400/50'
                  } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-bold">Pendiente</div>
                  <div className="text-sm text-gray-400">La orden está pendiente de procesamiento</div>
                </button>

                <button
                  onClick={() => handleStatusChange('procesando')}
                  disabled={updatingStatus || selectedOrder.estado === 'procesando'}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedOrder.estado === 'procesando'
                      ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-400'
                      : 'bg-black/50 border-yellow-400/30 text-white hover:bg-yellow-500/20 hover:border-yellow-400/50'
                  } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-bold">Procesando</div>
                  <div className="text-sm text-gray-400">La orden está siendo procesada</div>
                </button>

                <button
                  onClick={() => handleStatusChange('completado')}
                  disabled={updatingStatus || selectedOrder.estado === 'completado'}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedOrder.estado === 'completado'
                      ? 'bg-green-500/20 border-green-400/50 text-green-400'
                      : 'bg-black/50 border-green-400/30 text-white hover:bg-green-500/20 hover:border-green-400/50'
                  } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-bold">Completado</div>
                  <div className="text-sm text-gray-400">La orden ha sido completada</div>
                </button>
              </div>

              {updatingStatus && (
                <div className="text-center mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400 mx-auto"></div>
                  <p className="text-gray-400 text-sm mt-2">Actualizando estado...</p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedOrder(null);
                  }}
                  disabled={updatingStatus}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;

