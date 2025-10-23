import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import { scrollToTop } from "../../utils/scrollUtils";

const Checkout = () => {
  const { cartItems, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { userData, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Estados del formulario
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: userData?.fullName?.split(" ")[0] || "",
    apellidos: userData?.fullName?.split(" ").slice(1).join(" ") || "",
    correo: userData?.email || "",
    // Dirección de entrega
    calle: "",
    departamento: "",
    region: "",
    comuna: "",
    indicaciones: ""
  });

  const [errors, setErrors] = useState({});

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    window.location.hash = "login";
    return null;
  }

  // Redirigir si el carrito está vacío
  if (cartItems.length === 0) {
    window.location.hash = "carrito";
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar campos obligatorios
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son obligatorios";
    if (!formData.correo.trim()) newErrors.correo = "El correo es obligatorio";
    if (!formData.calle.trim()) newErrors.calle = "La calle es obligatoria";
    if (!formData.departamento.trim()) newErrors.departamento = "El departamento es obligatorio";
    if (!formData.region.trim()) newErrors.region = "La región es obligatoria";
    if (!formData.comuna.trim()) newErrors.comuna = "La comuna es obligatoria";
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.correo && !emailRegex.test(formData.correo)) {
      newErrors.correo = "El formato del correo no es válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simular procesamiento del pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar ID de orden único
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setOrderId(newOrderId);
      setPaymentCompleted(true);
      
      // Limpiar carrito después del pago exitoso
      await clearCart();
      
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago. Por favor, intenta de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Scroll al tope al cargar la página
  scrollToTop();

  if (paymentCompleted) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-12 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">
                  ¡Pago Completado!
                </h1>
                
                <p className="text-gray-300 text-lg mb-6">
                  Tu compra ha sido procesada exitosamente
                </p>
                
                <div className="bg-black/50 border border-green-400/30 rounded-lg p-6 mb-8">
                  <h3 className="text-green-400 font-bold text-xl mb-2">ID de Orden</h3>
                  <p className="text-white text-2xl font-mono">{orderId}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Guarda este ID para futuras consultas
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.print()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    📄 Descargar Boleta
                  </button>
                  
                  <button
                    onClick={() => {
                      // TODO: Implementar envío por email
                      alert("Funcionalidad de envío por email en desarrollo");
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    📧 Enviar por Email
                  </button>
                  
                  <a
                    href="#home"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-colors text-center"
                  >
                    🏠 Volver al Inicio
                  </a>
                </div>
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
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-green-400">Checkout</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Completa tu información para finalizar la compra
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <h2 className="text-white text-2xl font-bold mb-6">Información de Entrega</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Datos Personales */}
                <div>
                  <h3 className="text-green-400 font-bold text-lg mb-4">Datos Personales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                          errors.nombre ? 'border-red-500' : 'border-green-400/30'
                        }`}
                        placeholder="Tu nombre"
                      />
                      {errors.nombre && (
                        <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                          errors.apellidos ? 'border-red-500' : 'border-green-400/30'
                        }`}
                        placeholder="Tus apellidos"
                      />
                      {errors.apellidos && (
                        <p className="text-red-400 text-sm mt-1">{errors.apellidos}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-white font-medium mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                        errors.correo ? 'border-red-500' : 'border-green-400/30'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {errors.correo && (
                      <p className="text-red-400 text-sm mt-1">{errors.correo}</p>
                    )}
                  </div>
                </div>

                {/* Dirección de Entrega */}
                <div>
                  <h3 className="text-green-400 font-bold text-lg mb-4">Dirección de Entrega</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Calle *
                      </label>
                      <input
                        type="text"
                        name="calle"
                        value={formData.calle}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                          errors.calle ? 'border-red-500' : 'border-green-400/30'
                        }`}
                        placeholder="Nombre de la calle y número"
                      />
                      {errors.calle && (
                        <p className="text-red-400 text-sm mt-1">{errors.calle}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Departamento *
                      </label>
                      <input
                        type="text"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                          errors.departamento ? 'border-red-500' : 'border-green-400/30'
                        }`}
                        placeholder="Número de departamento"
                      />
                      {errors.departamento && (
                        <p className="text-red-400 text-sm mt-1">{errors.departamento}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Región *
                        </label>
                        <input
                          type="text"
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                            errors.region ? 'border-red-500' : 'border-green-400/30'
                          }`}
                          placeholder="Región"
                        />
                        {errors.region && (
                          <p className="text-red-400 text-sm mt-1">{errors.region}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Comuna *
                        </label>
                        <input
                          type="text"
                          name="comuna"
                          value={formData.comuna}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                            errors.comuna ? 'border-red-500' : 'border-green-400/30'
                          }`}
                          placeholder="Comuna"
                        />
                        {errors.comuna && (
                          <p className="text-red-400 text-sm mt-1">{errors.comuna}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Indicaciones para la Entrega (Opcional)
                      </label>
                      <textarea
                        name="indicaciones"
                        value={formData.indicaciones}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors resize-none"
                        placeholder="Instrucciones adicionales para el repartidor..."
                      />
                    </div>
                  </div>
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                    isProcessing
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-400 to-blue-400 text-black hover:from-green-500 hover:to-blue-500 hover:scale-105 shadow-lg shadow-green-400/25'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                      Procesando Pago...
                    </span>
                  ) : (
                    '💳 Proceder al Pago'
                  )}
                </button>
              </form>
            </div>

            {/* Resumen del Pedido */}
            <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 sticky top-24">
              <h3 className="text-white text-2xl font-bold mb-6">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-black/30 rounded-lg p-3">
                    {item.imagen && (
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{item.nombre}</h4>
                      <p className="text-gray-400 text-xs">Cantidad: {item.quantity}</p>
                    </div>
                    <span className="text-green-400 font-bold">
                      {formatPrice(item.precio * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-green-400/30 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Envío</span>
                  <span className="text-green-400">Gratis</span>
                </div>
                <div className="border-t border-green-400/30 pt-2">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-400">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
