import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification,
  createNotification
} from '../config/firestoreService';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications debe ser usado dentro de un NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, userData } = useAuth();

  // Cargar notificaciones cuando el usuario esté autenticado
  useEffect(() => {
    const loadNotifications = async () => {
      if (isAuthenticated && userData?.uid) {
        setLoading(true);
        try {
          const userNotifications = await getUserNotifications(userData.uid);
          setNotifications(userNotifications);
        } catch (error) {
          console.error('Error al cargar notificaciones:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Si no está autenticado, limpiar notificaciones
        setNotifications([]);
      }
    };

    loadNotifications();
  }, [isAuthenticated, userData?.uid]);

  // Obtener notificaciones no leídas
  const getUnreadCount = () => {
    return notifications.filter(n => !n.leida).length;
  };

  // Marcar notificación como leída
  const markAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId 
            ? { ...n, leida: true, fechaLectura: new Date() }
            : n
        )
      );
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  // Marcar todas las notificaciones como leídas
  const markAllAsRead = async () => {
    if (!isAuthenticated || !userData?.uid) return;
    
    try {
      await markAllNotificationsAsRead(userData.uid);
      setNotifications(prev => 
        prev.map(n => ({ ...n, leida: true, fechaLectura: new Date() }))
      );
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
    }
  };

  // Eliminar notificación
  const removeNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
    }
  };

  // Crear notificación (para uso interno)
  const sendNotification = async (userId, notificationData) => {
    try {
      const notificationId = await createNotification(userId, notificationData);
      console.log('Notificación creada con ID:', notificationId);
      
      // Si es para el usuario actual, esperar y recargar notificaciones desde la base de datos
      if (userId === userData?.uid) {
        // Esperar más tiempo para asegurar que Firebase haya procesado la escritura
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Recargar notificaciones desde la base de datos
        try {
          const userNotifications = await getUserNotifications(userId);
          console.log('Notificaciones recargadas:', userNotifications.length);
          setNotifications(userNotifications);
        } catch (reloadError) {
          console.error('Error al recargar notificaciones:', reloadError);
          // Intentar de nuevo después de otro segundo
          await new Promise(resolve => setTimeout(resolve, 1000));
          const userNotifications = await getUserNotifications(userId);
          setNotifications(userNotifications);
        }
      }
      return notificationId;
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      throw error;
    }
  };

  // Recargar notificaciones manualmente
  const refreshNotifications = async () => {
    if (!isAuthenticated || !userData?.uid) return;
    
    setLoading(true);
    try {
      const userNotifications = await getUserNotifications(userData.uid);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Error al recargar notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    notifications,
    loading,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    sendNotification,
    refreshNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

