import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import QuantityControls from "../molecules/QuantityControls";

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getTotalPrice,
    isOperationInProgress
  } = useCart();
  const { isAuthenticated } = useAuth();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
      <GameBackgroundEffects />
      
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {cartItems.length === 0 ? (
            /* Carrito vacío */
            <div className="text-center py-16">
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-12 max-w-md mx-auto">
                <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <h3 className="text-white text-2xl font-bold mb-4">Tu carrito está vacío</h3>
                <p className="text-gray-400 mb-6">
                  Explora nuestras categorías y agrega productos a tu carrito
                </p>
                <Link
                  to="/"
                  className="inline-block bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Sección 1: Carrito de compra */}
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Carrito de compra</h2>
                    <p className="text-gray-400 text-sm">Completa la siguiente información</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 text-black px-6 py-3 rounded-lg font-bold text-lg">
                    Total a pagar: {formatPrice(getTotalPrice())}
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-green-400/30">
                        <th className="text-left py-3 px-4 text-white font-semibold">Imagen</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Nombre</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Precio</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Cantidad</th>
                        <th className="text-left py-3 px-4 text-white font-semibold">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className="border-b border-green-400/10">
                          <td className="py-4 px-4">
                            {item.imagen ? (
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-16 h-16 object-cover rounded"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center text-gray-500 text-xs">
                                W x H
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4 text-white font-medium">{item.nombre}</td>
                          <td className="py-4 px-4 text-gray-300">{formatPrice(item.precio)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <QuantityControls item={item} />
                            </div>
                          </td>
                          <td className="py-4 px-4 text-green-400 font-semibold">{formatPrice(item.precio * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Botón para proceder al checkout */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={handleProceedToCheckout}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-black px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg shadow-green-400/25 hover:scale-105"
                >
                  Proceder al Pago
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
