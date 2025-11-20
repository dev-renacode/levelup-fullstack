import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import ProtectedRoute from "../layout/ProtectedRoute";

const Notifications = () => {
  const { notifications, loading, markAsRead, markAllAsRead, removeNotification, refreshNotifications } = useNotifications();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const formatDate = (date) => {
    if (!date) return "";
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    const diff = now - dateObj;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Hace un momento";
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    
    return dateObj.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (tipo) => {
    switch (tipo) {
      case "success":
        return "bg-green-500/20 border-green-400/50 text-green-400";
      case "error":
        return "bg-red-500/20 border-red-400/50 text-red-400";
      case "warning":
        return "bg-yellow-500/20 border-yellow-400/50 text-yellow-400";
      default:
        return "bg-blue-500/20 border-blue-400/50 text-blue-400";
    }
  };

  const getTypeIcon = (tipo) => {
    switch (tipo) {
      case "success":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "error":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const unreadCount = notifications.filter(n => !n.leida).length;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <span className="text-blue-400">Notificaciones</span>
                </h1>
                <p className="text-gray-300">
                  {unreadCount > 0 
                    ? `${unreadCount} notificación${unreadCount > 1 ? 'es' : ''} nueva${unreadCount > 1 ? 's' : ''}`
                    : "No tienes notificaciones nuevas"
                  }
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                <span className="ml-3 text-white">Cargando notificaciones...</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-black/80 backdrop-blur-md border border-blue-400/30 rounded-xl p-12 max-w-md mx-auto">
                  <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <h3 className="text-white text-2xl font-bold mb-4">No hay notificaciones</h3>
                  <p className="text-gray-400 mb-6">
                    Cuando tengas notificaciones nuevas, aparecerán aquí
                  </p>
                  <Link
                    to="/"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-black/80 backdrop-blur-md border rounded-xl p-4 transition-all duration-300 ${
                      notification.leida
                        ? "border-gray-600/30 opacity-70"
                        : `${getTypeColor(notification.tipo)} border-2`
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 ${getTypeColor(notification.tipo).split(' ')[2]}`}>
                        {getTypeIcon(notification.tipo)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-1 ${
                              notification.leida ? "text-gray-400" : "text-white"
                            }`}>
                              {notification.titulo}
                            </h3>
                            <p className={`text-sm mb-2 ${
                              notification.leida ? "text-gray-500" : "text-gray-300"
                            }`}>
                              {notification.mensaje}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(notification.fechaCreacion)}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.leida && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                                title="Marcar como leída"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              title="Eliminar"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
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
    </ProtectedRoute>
  );
};

export default Notifications;

