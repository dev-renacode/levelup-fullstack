import { useState, useEffect } from 'react';
import { getAllProducts } from '../../config/firestoreService';
import { useCart } from '../../contexts/CartContext';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { syncProductStock } = useCart();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await getAllProducts();
      setProducts(productsData);
      
      // Sincronizar el stock inicial con el contexto del carrito
      syncProductStock(productsData);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar productos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refreshProducts
  };
};
