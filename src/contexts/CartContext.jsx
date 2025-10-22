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
  const [productStock, setProductStock] = useState({}); // Estado para manejar stock local
  const [operationsInProgress, setOperationsInProgress] = useState(new Set()); // Control de operaciones en progreso
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

  // Función helper para manejar operaciones en progreso
  const setOperationInProgress = (productId, inProgress) => {
    setOperationsInProgress(prev => {
      const newSet = new Set(prev);
      if (inProgress) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  // Función helper para verificar si una operación está en progreso
  const isOperationInProgress = (productId) => {
    return operationsInProgress.has(productId);
  };

  // Cargar carrito desde Firebase cuando el usuario esté autenticado
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && userData?.uid) {
        try {
          const firebaseCart = await getUserCart(userData.uid);
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
  }, [isAuthenticated, userData?.uid]);

  // Guardar carrito en Firebase cuando cambie (si está autenticado)
  useEffect(() => {
    const saveCart = async () => {
      if (isAuthenticated && userData?.uid) {
        try {
          await saveUserCart(userData.uid, cartItems);
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
  }, [cartItems, isAuthenticated, userData?.uid]);

  // Limpiar estado del carrito cuando el usuario cierra sesión
  useEffect(() => {
    if (!isAuthenticated) {
      resetCartState();
    }
  }, [isAuthenticated]);

  const addToCart = async (product) => {
    try {
      // Verificar si hay stock disponible
      if (!product.stock || product.stock <= 0) {
        showNotification('No hay stock disponible para este producto');
        return false;
      }

      // Verificar si ya está en el carrito y si hay stock suficiente
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem && existingItem.quantity >= product.stock) {
        showNotification('No hay suficiente stock disponible');
        return false;
      }

      // Si no está autenticado, mostrar mensaje informativo
      if (!isAuthenticated) {
        showNotification('Inicia sesión para guardar tu carrito permanentemente');
      }

      // Actualizar stock en Firebase
      await updateProductStock(product.id, 1);

      // Actualizar stock local inmediatamente
      setProductStock(prevStock => ({
        ...prevStock,
        [product.id]: Math.max(0, (prevStock[product.id] || product.stock) - 1)
      }));

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
      return true;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      showNotification('Error al agregar el producto al carrito');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    // Verificar si ya hay una operación en progreso para este producto
    if (isOperationInProgress(productId)) {
      return; // Salir si ya hay una operación en progreso
    }

    try {
      setOperationInProgress(productId, true);
      
      const itemToRemove = cartItems.find(item => item.id === productId);
      if (itemToRemove) {
        // Restaurar stock en Firebase
        await restoreProductStock(productId, itemToRemove.quantity);
        
        // Actualizar stock local inmediatamente
        setProductStock(prevStock => ({
          ...prevStock,
          [productId]: (prevStock[productId] || 0) + itemToRemove.quantity
        }));
      }
      
      // Remover del carrito local
      setCartItems(prevCart => prevCart.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error al remover producto del carrito:', error);
      showNotification('Error al remover el producto del carrito');
    } finally {
      setOperationInProgress(productId, false);
    }
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    // Verificar si ya hay una operación en progreso para este producto
    if (isOperationInProgress(productId)) {
      return; // Salir si ya hay una operación en progreso
    }

    try {
      setOperationInProgress(productId, true);
      
      const currentItem = cartItems.find(item => item.id === productId);
      if (!currentItem) {
        setOperationInProgress(productId, false);
        return;
      }

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

        // Actualizar stock local inmediatamente
        setProductStock(prevStock => ({
          ...prevStock,
          [productId]: Math.max(0, (prevStock[productId] || 0) - quantityDifference)
        }));

        // Actualizar carrito local
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
      showNotification('Error al actualizar la cantidad del producto');
    } finally {
      setOperationInProgress(productId, false);
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
      
      // Limpiar estado local de stock
      setProductStock({});
      
      // Limpiar carrito en Firebase si está autenticado
      if (isAuthenticated && userData?.uid) {
        await clearUserCart(userData.uid);
      }
      
      // Limpiar localStorage también
      localStorage.removeItem('cart');
      
      showNotification('Carrito limpiado correctamente');
    } catch (error) {
      console.error('Error al limpiar carrito:', error);
      showNotification('Error al limpiar el carrito');
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  // Función para obtener el stock actualizado de un producto
  const getUpdatedStock = (productId, originalStock) => {
    return productStock[productId] !== undefined ? productStock[productId] : originalStock;
  };

  // Función para sincronizar el stock inicial de los productos
  const syncProductStock = (products) => {
    const initialStock = {};
    products.forEach(product => {
      if (product.id && product.stock !== undefined) {
        initialStock[product.id] = product.stock;
      }
    });
    setProductStock(prevStock => ({
      ...initialStock,
      ...prevStock // Mantener las actualizaciones locales
    }));
  };

  // Función para limpiar completamente el estado del carrito
  const resetCartState = () => {
    setCartItems([]);
    setProductStock({});
    setOperationsInProgress(new Set());
    localStorage.removeItem('cart');
  };


  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getUpdatedStock,
    syncProductStock,
    isOperationInProgress,
    resetCartState
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
