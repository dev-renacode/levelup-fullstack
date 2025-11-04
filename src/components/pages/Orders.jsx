import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAllOrders } from "../../config/firestoreService";
import { downloadEnhancedInvoicePDF } from "../../utils/pdfGenerator";
import { useEmail } from "../../utils/hooks/useEmail";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import { scrollToTop } from "../../utils/scrollUtils";

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { sendInvoice, isSendingEmail, emailError, emailSuccess, clearEmailStates } = useEmail();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirigir si no está autenticado o no es admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getAllOrders();
        // Ordenar por fecha de creación (más recientes primero)
        const sortedOrders = ordersData.sort((a, b) => 
          new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error al cargar órdenes:", err);
        setError("Error al cargar las órdenes");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

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

  // Scroll al tope al cargar la página
  scrollToTop();

  if (loading) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
              <p className="text-white text-lg">Cargando órdenes...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400 text-lg">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
      <GameBackgroundEffects />
      
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-green-400">Órdenes</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Gestiona todas las compras realizadas en la tienda
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-12 max-w-md mx-auto">
                <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
                </svg>
                <h3 className="text-white text-2xl font-bold mb-4">No hay órdenes</h3>
                <p className="text-gray-400 mb-6">
                  Aún no se han realizado compras en la tienda
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Información de la orden */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white text-xl font-bold">
                          Orden #{order.orderNumber}
                        </h3>
                        <span className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-green-400 font-bold mb-2">Cliente</h4>
                          <p className="text-white">{order.customerInfo?.nombre} {order.customerInfo?.apellidos}</p>
                          <p className="text-gray-400 text-sm">{order.customerInfo?.correo}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-green-400 font-bold mb-2">Dirección de Entrega</h4>
                          <p className="text-white text-sm">
                            {order.shippingAddress?.calle} {order.shippingAddress?.departamento}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {order.shippingAddress?.comuna}, {order.shippingAddress?.region}
                          </p>
                          {order.shippingAddress?.indicaciones && (
                            <p className="text-gray-400 text-sm italic">
                              "{order.shippingAddress.indicaciones}"
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-green-400 font-bold mb-2">Productos</h4>
                        <div className="space-y-2">
                          {order.items?.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-black/30 rounded-lg p-3">
                              {item.imagen && (
                                <img
                                  src={item.imagen}
                                  alt={item.nombre}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.nombre}</p>
                                <p className="text-gray-400 text-sm">
                                  Cantidad: {item.cantidad} × {formatPrice(item.precio)}
                                </p>
                              </div>
                              <span className="text-green-400 font-bold">
                                {formatPrice(item.subtotal)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Resumen y acciones */}
                    <div className="lg:col-span-1">
                      <div className="bg-black/50 border border-green-400/30 rounded-lg p-4 mb-4">
                        <h4 className="text-green-400 font-bold mb-3">Resumen</h4>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-300">
                            <span>Subtotal ({order.totalItems} items)</span>
                            <span>{formatPrice(order.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Envío</span>
                            <span className="text-green-400">Gratis</span>
                          </div>
                          <div className="border-t border-green-400/30 pt-2">
                            <div className="flex justify-between text-white font-bold">
                              <span>Total</span>
                              <span className="text-green-400">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                          <span>Fecha:</span>
                          <span className="text-white">{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Método de pago:</span>
                          <span className="text-white">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Estado del pago:</span>
                          <span className="text-green-400 font-bold">{order.paymentStatus}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <button
                          onClick={() => {
                            try {
                              downloadEnhancedInvoicePDF(order, order.id);
                            } catch (error) {
                              console.error('Error al generar PDF:', error);
                              alert('Error al generar el PDF. Por favor, intenta de nuevo.');
                            }
                          }}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold transition-colors text-sm"
                        >
                          📄 Descargar Boleta
                        </button>
                        
                        <button
                          onClick={async () => {
                            try {
                              clearEmailStates();
                              const success = await sendInvoice(order, order.id, order.customerInfo.correo);
                              if (success) {
                                alert("✅ Boleta enviada por email exitosamente");
                              } else {
                                alert("❌ Error al enviar el email. Por favor, intenta de nuevo.");
                              }
                            } catch (error) {
                              console.error('Error al enviar email:', error);
                              alert("❌ Error al enviar el email. Por favor, intenta de nuevo.");
                            }
                          }}
                          disabled={isSendingEmail}
                          className={`w-full py-2 px-4 rounded-lg font-bold transition-colors text-sm ${
                            isSendingEmail
                              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {isSendingEmail ? (
                            <span className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Enviando...
                            </span>
                          ) : (
                            '📧 Enviar por Email'
                          )}
                        </button>
                        
                        <button
                          onClick={() => {
                            // TODO: Implementar vista detallada de la orden
                            alert("Vista detallada en desarrollo");
                          }}
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-bold transition-colors text-sm"
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Orders;
