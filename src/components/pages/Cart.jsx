import { useCart } from "../../contexts/CartContext";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
      <GameBackgroundEffects />
      
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mi <span className="text-green-400">Carrito</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Revisa y gestiona los productos en tu carrito de compras
            </p>
          </div>

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
                <a
                  href="#home"
                  className="inline-block bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Continuar Comprando
                </a>
              </div>
            </div>
          ) : (
            /* Carrito con productos */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2">
                <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-xl font-bold">
                      Productos ({getTotalItems()} items)
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Vaciar carrito
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="bg-black/50 border border-green-400/20 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          {/* Imagen del producto */}
                          <div className="flex-shrink-0">
                            {item.imagen ? (
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Información del producto */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-lg truncate">
                              {item.nombre}
                            </h3>
                            <p className="text-gray-400 text-sm truncate">
                              {item.descripcion || 'Sin descripción'}
                            </p>
                            <p className="text-green-400 font-bold text-lg">
                              {formatPrice(item.precio)}
                            </p>
                          </div>

                          {/* Controles de cantidad */}
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center text-sm font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="text-white font-bold text-lg w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center text-sm font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Precio total del item */}
                          <div className="text-right">
                            <p className="text-green-400 font-bold text-lg">
                              {formatPrice(item.precio * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors mt-1"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resumen del pedido */}
              <div className="lg:col-span-1">
                <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 sticky top-24">
                  <h3 className="text-white text-xl font-bold mb-6">Resumen del Pedido</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Envío</span>
                      <span className="text-green-400">Gratis</span>
                    </div>
                    <div className="border-t border-green-400/30 pt-4">
                      <div className="flex justify-between text-white text-xl font-bold">
                        <span>Total</span>
                        <span className="text-green-400">{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // Aquí puedes agregar la lógica para proceder al checkout
                      console.log('Proceder al checkout');
                      alert('Funcionalidad de checkout en desarrollo');
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-black py-3 px-4 rounded-lg font-bold text-lg transition-colors mb-4"
                  >
                    Proceder al Pago
                  </button>

                  <a
                    href="#home"
                    className="block w-full text-center text-green-400 hover:text-green-300 py-2 font-medium transition-colors"
                  >
                    Continuar Comprando
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
