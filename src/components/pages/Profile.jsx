import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserOrders } from "../../config/firestoreService";
import { downloadEnhancedInvoicePDF } from "../../utils/pdfGenerator";
import { useEmail } from "../../utils/hooks/useEmail";

const Profile = () => {
  const { isAuthenticated, userData, logout } = useAuth();
  const { sendInvoice, isSendingEmail, clearEmailStates } = useEmail();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [currentSection, setCurrentSection] = useState("info");

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    window.location.hash = "login";
    return null;
  }

  useEffect(() => {
    const loadUserOrders = async () => {
      try {
        setLoading(true);
        const userOrders = await getUserOrders(userData.uid);
        // Ordenar por fecha de creación (más recientes primero)
        const sortedOrders = userOrders.sort((a, b) => 
          new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error al cargar órdenes del usuario:", err);
        setError("Error al cargar tus órdenes");
      } finally {
        setLoading(false);
      }
    };

    loadUserOrders();
  }, [userData.uid]);

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
      case 'completed':
        return 'text-green-400 bg-green-400/10';
      case 'processing':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'shipped':
        return 'text-blue-400 bg-blue-400/10';
      case 'delivered':
        return 'text-purple-400 bg-purple-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'processing':
        return 'Procesando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  };

  const filteredOrders = orders.filter(order => 
    searchOrderId === "" || 
    order.id.toLowerCase().includes(searchOrderId.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(searchOrderId.toLowerCase())
  );

  const handleLogout = () => {
    logout();
  };

  const handleStoreRedirect = () => {
    window.location.hash = "home";
  };

  // Iconos SVG para la navegación del perfil

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

  const InfoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  );

  const HistoryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l4 2"/>
    </svg>
  );

  const ContactIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const renderContent = () => {
    switch (currentSection) {
      case "info":
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <p className="text-gray-900">{userData?.fullName || "No disponible"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <p className="text-gray-900">{userData?.email || "No disponible"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <p className="text-gray-900 capitalize">{userData?.role || "Usuario"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado de Verificación</label>
                  <p className="text-gray-900">{userData?.emailVerified ? "Verificado" : "No verificado"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas de Cuenta</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                  <div className="text-sm text-gray-600">Órdenes Totales</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {orders.reduce((total, order) => total + order.totalItems, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Productos Comprados</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatPrice(orders.reduce((total, order) => total + order.total, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Gastado</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Historial de Órdenes</h2>
                <div className="text-sm text-gray-600">
                  Total: {orders.length} órdenes
                </div>
              </div>

              {/* Search */}
              <div className="max-w-md mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    placeholder="Buscar por ID de orden o número..."
                    className="w-full px-4 py-3 pl-12 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                  />
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchOrderId && (
                    <button
                      onClick={() => setSearchOrderId("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 max-w-md mx-auto">
                    <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
                    </svg>
                    <h3 className="text-gray-800 text-2xl font-bold mb-4">
                      {searchOrderId ? "No se encontraron órdenes" : "No tienes órdenes"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchOrderId 
                        ? "No se encontraron órdenes que coincidan con tu búsqueda"
                        : "Aún no has realizado ninguna compra"
                      }
                    </p>
                    {!searchOrderId && (
                      <a
                        href="#productos"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                      >
                        Comenzar a Comprar
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Información de la orden */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-800 text-xl font-bold">
                              Orden #{order.orderNumber}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="text-blue-500 font-bold mb-2">Información</h4>
                              <p className="text-gray-800 text-sm">ID: {order.id}</p>
                              <p className="text-gray-600 text-sm">Fecha: {formatDate(order.createdAt)}</p>
                              <p className="text-gray-600 text-sm">Total: {formatPrice(order.total)}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-blue-500 font-bold mb-2">Dirección de Entrega</h4>
                              <p className="text-gray-800 text-sm">
                                {order.shippingAddress?.calle} {order.shippingAddress?.departamento}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {order.shippingAddress?.comuna}, {order.shippingAddress?.region}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-blue-500 font-bold mb-2">Productos ({order.totalItems})</h4>
                            <div className="space-y-2">
                              {order.items?.slice(0, 3).map((item, index) => (
                                <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-2">
                                  {item.imagen && (
                                    <img
                                      src={item.imagen}
                                      alt={item.nombre}
                                      className="w-8 h-8 object-cover rounded"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <p className="text-gray-800 text-sm font-medium">{item.nombre}</p>
                                    <p className="text-gray-600 text-xs">Cantidad: {item.cantidad}</p>
                                  </div>
                                  <span className="text-blue-500 font-bold text-sm">
                                    {formatPrice(item.subtotal)}
                                  </span>
                                </div>
                              ))}
                              {order.items?.length > 3 && (
                                <p className="text-gray-600 text-sm">
                                  ... y {order.items.length - 3} producto(s) más
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Acciones */}
                        <div className="lg:col-span-1">
                          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                            <h4 className="text-blue-500 font-bold mb-3">Resumen</h4>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span className="text-green-500">Gratis</span>
                              </div>
                              <div className="border-t border-gray-200 pt-2">
                                <div className="flex justify-between text-gray-800 font-bold">
                                  <span>Total</span>
                                  <span className="text-blue-500">{formatPrice(order.total)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                try {
                                  downloadEnhancedInvoicePDF(order, order.id);
                                } catch (error) {
                                  console.error('Error al generar PDF:', error);
                                  alert('Error al generar el PDF. Por favor, intenta de nuevo.');
                                }
                              }}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold transition-colors text-sm flex items-center justify-center space-x-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Descargar Boleta</span>
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
                              className={`w-full py-2 px-4 rounded-lg font-bold transition-colors text-sm flex items-center justify-center space-x-2 ${
                                isSendingEmail
                                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {isSendingEmail ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  <span>Enviando...</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <span>Enviar por Email</span>
                                </>
                              )}
                            </button>
                            
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(order.id).then(() => {
                                  alert("✅ ID de orden copiado al portapapeles");
                                }).catch(() => {
                                  alert("❌ No se pudo copiar el ID. Cópialo manualmente: " + order.id);
                                });
                              }}
                              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-bold transition-colors text-sm flex items-center justify-center space-x-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span>Copiar ID</span>
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
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial de Contacto</h2>
              <div className="text-center py-16">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-12 max-w-md mx-auto">
                  <svg className="w-20 h-20 text-yellow-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-gray-800 text-2xl font-bold mb-4">En Desarrollo</h3>
                  <p className="text-gray-600 mb-6">
                    Esta sección está siendo desarrollada. Aquí podrás ver el historial de tus consultas y mensajes de contacto.
                  </p>
                  <div className="text-sm text-gray-500">
                    Próximamente disponible
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Company name</h1>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <ProfileIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-64 bg-gray-200 min-h-screen"></div>
          <div className="flex-1 bg-white p-8">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Cargando tu perfil...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Company name</h1>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <ProfileIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-64 bg-gray-200 min-h-screen"></div>
          <div className="flex-1 bg-white p-8">
            <div className="text-center py-16">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-500 text-lg">{error}</p>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Company name</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <ProfileIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 min-h-screen">
          <div className="p-4">

            {/* Profile Sections */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Mi Perfil</h3>
              
              <button
                onClick={() => setCurrentSection("info")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  currentSection === "info"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                <InfoIcon />
                <span>Información</span>
              </button>

              <button
                onClick={() => setCurrentSection("orders")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  currentSection === "orders"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                <HistoryIcon />
                <span>Historial de Órdenes</span>
              </button>

              <button
                onClick={() => setCurrentSection("contact")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  currentSection === "contact"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ContactIcon />
                <span>Historial de Contacto</span>
              </button>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-400 my-4"></div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleStoreRedirect}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <StoreIcon />
                <span>Tienda</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <LogoutIcon />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-8">
          <div className="max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Perfil</h1>
              <p className="text-gray-600">
                {currentSection === "info" && "Gestiona tu información personal y estadísticas de cuenta"}
                {currentSection === "orders" && "Consulta el historial de todas tus compras"}
                {currentSection === "contact" && "Historial de consultas y mensajes de contacto"}
              </p>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;