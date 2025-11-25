import { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

// Ya no usamos guestId en Firebase, solo localStorage para usuarios sin sesión

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [productStock, setProductStock] = useState({}); // Estado para manejar stock local
  const [operationsInProgress, setOperationsInProgress] = useState(new Set()); // Control de operaciones en progreso
  const [isLoadingCart, setIsLoadingCart] = useState(true); // Bandera para evitar guardar durante la carga inicial
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

  // Cargar carrito: Firebase para usuarios autenticados, localStorage para invitados
  useEffect(() => {
    const loadCart = async () => {
      setIsLoadingCart(true);
      let loadedCart = [];
      
      try {
        if (isAuthenticated && userData?.uid) {
          // Usuario autenticado: cargar desde Firebase
          try {
            const firebaseCart = await getUserCart(userData.uid);
            if (firebaseCart && firebaseCart.length > 0) {
              loadedCart = firebaseCart;
              // Guardar también en localStorage como respaldo
              localStorage.setItem('cart', JSON.stringify(firebaseCart));
            } else {
              // Si Firebase está vacío, intentar cargar desde localStorage (migración)
              const savedCart = localStorage.getItem('cart');
              if (savedCart) {
                try {
                  const parsedCart = JSON.parse(savedCart);
                  if (parsedCart && parsedCart.length > 0) {
                    loadedCart = parsedCart;
                    // Migrar carrito de localStorage a Firebase
                    try {
                      await saveUserCart(userData.uid, parsedCart);
                    } catch (syncError) {
                      console.warn('Error al migrar carrito a Firebase:', syncError);
                    }
                  }
                } catch (parseError) {
                  console.error('Error al parsear carrito desde localStorage:', parseError);
                }
              }
            }
          } catch (error) {
            console.error('Error al cargar carrito desde Firebase:', error);
            // Fallback a localStorage si Firebase falla
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
              try {
                const parsedCart = JSON.parse(savedCart);
                if (parsedCart && parsedCart.length > 0) {
                  loadedCart = parsedCart;
                }
              } catch (parseError) {
                console.error('Error al parsear carrito desde localStorage:', parseError);
              }
            }
          }
        } else {
          // Usuario NO autenticado: SOLO usar localStorage (NO Firebase)
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            try {
              const parsedCart = JSON.parse(savedCart);
              if (parsedCart && parsedCart.length > 0) {
                loadedCart = parsedCart;
              }
            } catch (parseError) {
              console.error('Error al parsear carrito desde localStorage:', parseError);
            }
          }
        }
        
        // Establecer el carrito cargado
        if (loadedCart.length > 0) {
          setCartItems(loadedCart);
        }
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCart();
  }, [isAuthenticated, userData?.uid]);

  // Esta función se exporta para que pueda ser llamada después de que los productos se carguen
  // y el carrito ya esté disponible
  const adjustStockForCart = useCallback((products) => {
    if (cartItems.length === 0 || !products || products.length === 0) {
      return;
    }
    
    // Ajustar el stock para reflejar los productos en el carrito
    setProductStock(prevStock => {
      const adjustedStock = { ...prevStock };
      cartItems.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product && product.stock !== undefined) {
          // El stock disponible es el stock original menos la cantidad en el carrito
          adjustedStock[cartItem.id] = Math.max(0, product.stock - cartItem.quantity);
        }
      });
      return adjustedStock;
    });
  }, [cartItems]);

  // Guardar carrito: Firebase solo para usuarios autenticados, localStorage para todos
  useEffect(() => {
    // No guardar durante la carga inicial
    if (isLoadingCart) {
      return;
    }

    const saveCart = async () => {
      // Guardar siempre en localStorage (para todos los usuarios)
      if (cartItems.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } else {
        // Si el carrito está vacío, limpiar localStorage solo si fue intencional
        localStorage.removeItem('cart');
      }
      
      // Solo guardar en Firebase si el usuario está autenticado
      if (isAuthenticated && userData?.uid) {
        try {
          await saveUserCart(userData.uid, cartItems);
        } catch (error) {
          console.error('Error al guardar carrito en Firebase:', error);
          // localStorage ya está guardado arriba como respaldo
        }
      }
      // Usuarios sin sesión: NO guardar en Firebase, solo localStorage
    };

    saveCart();
  }, [cartItems, isAuthenticated, userData?.uid, isLoadingCart]);

  // No limpiar el carrito al cerrar sesión - mantener el carrito del invitado

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

      // Intentar actualizar stock en Firebase (puede fallar si no está autenticado)
      try {
        await updateProductStock(product.id, 1);
        // Actualizar stock local inmediatamente si la actualización fue exitosa
        setProductStock(prevStock => ({
          ...prevStock,
          [product.id]: Math.max(0, (prevStock[product.id] || product.stock) - 1)
        }));
      } catch (stockError) {
        // Si no está autenticado y falla la actualización del stock, continuar de todos modos
        if (!isAuthenticated) {
          console.warn('No se pudo actualizar el stock en Firebase (usuario no autenticado), agregando al carrito local:', stockError);
        } else {
          // Si está autenticado y falla, lanzar el error
          throw stockError;
        }
      }

      // Actualizar carrito local (siempre se agrega, incluso si falló la actualización del stock)
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
      
      // Limpiar carrito en Firebase solo si el usuario está autenticado
      if (isAuthenticated && userData?.uid) {
        try {
          await clearUserCart(userData.uid);
        } catch (error) {
          console.error('Error al limpiar carrito en Firebase:', error);
        }
      }
      // Usuarios sin sesión: NO limpiar en Firebase, solo localStorage
      
      // Limpiar localStorage (para todos los usuarios)
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
  // Usa useCallback para que siempre tenga acceso al cartItems más reciente
  const syncProductStock = useCallback((products) => {
    const initialStock = {};
    products.forEach(product => {
      if (product.id && product.stock !== undefined) {
        initialStock[product.id] = product.stock;
      }
    });
    
    // Ajustar el stock según los productos en el carrito actual
    // Si hay productos en el carrito, restar su cantidad del stock inicial
    cartItems.forEach(cartItem => {
      if (initialStock[cartItem.id] !== undefined) {
        initialStock[cartItem.id] = Math.max(0, initialStock[cartItem.id] - cartItem.quantity);
      }
    });
    
    setProductStock(prevStock => {
      // Combinar: primero el stock inicial ajustado, luego las actualizaciones locales
      const merged = { ...initialStock };
      // Aplicar actualizaciones locales solo si no sobrescriben el stock ajustado del carrito
      Object.keys(prevStock).forEach(productId => {
        if (merged[productId] === undefined) {
          merged[productId] = prevStock[productId];
        }
      });
      return merged;
    });
  }, [cartItems]);

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
    adjustStockForCart,
    isOperationInProgress,
    resetCartState
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
