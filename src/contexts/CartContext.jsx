import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { updateProductStock, restoreProductStock, getUserCart, saveUserCart, clearUserCart } from '../config/firestoreService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated, userData } = useAuth();

  // Función para mostrar notificaciones
  const showNotification = (message) => {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-black px-6 py-3 rounded-lg shadow-lg z-50 font-bold animate-slide-in';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Cargar carrito desde Firebase cuando el usuario esté autenticado
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && userData?.id) {
        try {
          const firebaseCart = await getUserCart(userData.id);
          setCartItems(firebaseCart);
        } catch (error) {
          console.error('Error al cargar carrito desde Firebase:', error);
          // Fallback a localStorage si Firebase falla
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            try {
              setCartItems(JSON.parse(savedCart));
            } catch (parseError) {
              console.error('Error al parsear carrito desde localStorage:', parseError);
            }
          }
        }
      } else {
        // Si no está autenticado, usar localStorage como fallback
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setCartItems(JSON.parse(savedCart));
          } catch (error) {
            console.error('Error al cargar carrito desde localStorage:', error);
          }
        }
      }
    };

    loadCart();
  }, [isAuthenticated, userData?.id]);

  // Guardar carrito en Firebase cuando cambie (si está autenticado)
  useEffect(() => {
    const saveCart = async () => {
      if (isAuthenticated && userData?.id) {
        try {
          await saveUserCart(userData.id, cartItems);
        } catch (error) {
          console.error('Error al guardar carrito en Firebase:', error);
          // Fallback a localStorage
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
      } else {
        // Si no está autenticado, usar localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    };

    if (cartItems.length > 0) {
      saveCart();
    }
  }, [cartItems, isAuthenticated, userData?.id]);

  const addToCart = async (product) => {
    try {
      // Verificar si hay stock disponible
      if (product.stock <= 0) {
        alert('No hay stock disponible para este producto');
        return;
      }

      // Si no está autenticado, mostrar mensaje informativo
      if (!isAuthenticated) {
        showNotification('Inicia sesión para guardar tu carrito permanentemente');
      }

      // Actualizar stock en Firebase
      await updateProductStock(product.id, 1);

      // Actualizar carrito local
      setCartItems(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });

      // Mostrar notificación de éxito
      showNotification(`¡${product.nombre} agregado al carrito!`);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      alert('Error al agregar el producto al carrito');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const itemToRemove = cartItems.find(item => item.id === productId);
      if (itemToRemove) {
        // Restaurar stock en Firebase
        await restoreProductStock(productId, itemToRemove.quantity);
      }
      
      // Remover del carrito local
      setCartItems(prevCart => prevCart.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error al remover producto del carrito:', error);
      alert('Error al remover el producto del carrito');
    }
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    try {
      const currentItem = cartItems.find(item => item.id === productId);
      if (!currentItem) return;

      const quantityDifference = newQuantity - currentItem.quantity;

      if (newQuantity <= 0) {
        await removeFromCart(productId);
      } else {
        // Actualizar stock en Firebase
        if (quantityDifference > 0) {
          await updateProductStock(productId, quantityDifference);
        } else if (quantityDifference < 0) {
          await restoreProductStock(productId, Math.abs(quantityDifference));
        }

        // Actualizar carrito local (sin modificar stock local)
        setCartItems(prevCart =>
          prevCart.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error al actualizar cantidad del producto:', error);
      alert('Error al actualizar la cantidad del producto');
    }
  };

  const clearCart = async () => {
    try {
      // Restaurar stock de todos los productos en el carrito
      for (const item of cartItems) {
        await restoreProductStock(item.id, item.quantity);
      }
      
      // Limpiar carrito local
      setCartItems([]);
      
      // Limpiar carrito en Firebase si está autenticado
      if (isAuthenticated && userData?.id) {
        await clearUserCart(userData.id);
      }
      
      // Limpiar localStorage también
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error al limpiar carrito:', error);
      alert('Error al limpiar el carrito');
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
