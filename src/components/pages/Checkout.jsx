import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { createOrder } from "../../config/firestoreService";
import { downloadEnhancedInvoicePDF } from "../../utils/pdfGenerator";
import { useEmail } from "../../utils/hooks/useEmail";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { userData, isAuthenticated } = useAuth();
  const { sendInvoice, isSendingEmail, emailError, emailSuccess, clearEmailStates } = useEmail();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [completedOrderData, setCompletedOrderData] = useState(null);
  const [processingStep, setProcessingStep] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Datos de regiones y comunas de Chile
  const regionesYComunas = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Región Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil", "Treguaco", "San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"],
    "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
  };

  // Estados del formulario
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: userData?.fullName?.split(" ")[0] || "",
    apellidos: userData?.fullName?.split(" ").slice(1).join(" ") || "",
    correo: userData?.email || "",
    // Dirección de entrega
    calle: "",
    numero: "",
    region: "",
    comuna: "",
    indicaciones: ""
  });

  const [errors, setErrors] = useState({});
  
  // Obtener comunas disponibles según la región seleccionada
  const comunasDisponibles = formData.region ? (regionesYComunas[formData.region] || []) : [];

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Redirigir si el carrito está vacío (solo si no se ha completado el pago)
  useEffect(() => {
    if (cartItems.length === 0 && !paymentCompleted) {
      navigate("/carrito");
    }
  }, [cartItems.length, paymentCompleted, navigate]);

  if (!isAuthenticated || (cartItems.length === 0 && !paymentCompleted)) {
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
    
    // Si cambia la región, limpiar la comuna seleccionada
    if (name === "region") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        comuna: "" // Limpiar comuna cuando cambia la región
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
    if (!formData.numero.trim()) newErrors.numero = "El número es obligatorio";
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
    setProcessingStep("Preparando datos de la orden...");
    
    try {
      // Preparar datos de la orden
      const orderData = {
        userId: userData.uid,
        userEmail: userData.email,
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        createdAt: new Date(),
        
        // Datos del cliente
        customerInfo: {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          correo: formData.correo
        },
        
        // Dirección de entrega
        shippingAddress: {
          calle: formData.calle,
          numero: formData.numero,
          region: formData.region,
          comuna: formData.comuna,
          indicaciones: formData.indicaciones || ""
        },
        
        // Productos y totales
        items: cartItems.map(item => ({
          productId: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.quantity,
          imagen: item.imagen,
          subtotal: item.precio * item.quantity
        })),
        
        // Totales
        subtotal: getTotalPrice(),
        shipping: 0, // Envío gratis
        total: getTotalPrice(),
        
        // Metadatos
        totalItems: getTotalItems(),
        paymentMethod: "Simulado", // Por ahora es simulado
        notes: "Compra procesada desde la tienda online"
      };
      
      // Simular procesamiento del pago
      setProcessingStep("Procesando pago...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProcessingStep("Guardando orden en la base de datos...");
      // Guardar la orden en Firebase
      const firebaseOrderId = await createOrder(orderData);
      
      setProcessingStep("Finalizando compra...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usar el ID de Firebase como ID de orden
      setOrderId(firebaseOrderId);
      setCompletedOrderData(orderData);
      
      // Mostrar notificación de éxito
      setShowSuccessNotification(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentCompleted(true);
      
      // Esperar más tiempo antes de limpiar el carrito para que el usuario pueda descargar la boleta
      setTimeout(async () => {
        await clearCart();
      }, 30000); // 30 segundos de delay para dar tiempo a descargar la boleta
      
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago. Por favor, intenta de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Scroll al tope al cargar la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isProcessing) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-12 max-w-2xl mx-auto">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Procesando tu compra...
                </h2>
                <p className="text-gray-300 mb-4">
                  {processingStep}
                </p>
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>No cierres esta ventana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (showSuccessNotification) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-12 max-w-2xl mx-auto animate-fade-in">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  ¡Compra Exitosa!
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Tu compra ha sido procesada correctamente
                </p>
                
                {/* Botón de descarga de boleta */}
                <div className="bg-green-500/20 border border-green-400/50 rounded-xl p-6 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-green-400 font-bold text-lg mb-2">Descarga tu Boleta</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Descarga inmediatamente tu boleta de compra en formato PDF
                  </p>
                  <button
                    onClick={() => {
                      if (completedOrderData) {
                        try {
                          downloadEnhancedInvoicePDF(completedOrderData, orderId);
                        } catch (error) {
                          console.error('Error al generar PDF:', error);
                          alert('Error al generar el PDF. Por favor, intenta de nuevo.');
                        }
                      }
                    }}
                    className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Descargar Boleta PDF</span>
                  </button>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Preparando tu confirmación...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (paymentCompleted) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        
        <div className="relative z-10 pt-20 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-12 max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">
                  ¡Pago Completado!
                </h1>
                
                <p className="text-gray-300 text-lg mb-8">
                  Tu compra ha sido procesada exitosamente
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Detalles de la Orden */}
                  <div className="bg-black/50 border border-green-400/30 rounded-lg p-6">
                    <h3 className="text-green-400 font-bold text-xl mb-4">Detalles de la Orden</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">ID de Orden:</span>
                        <span className="text-white font-mono text-sm">{orderId}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-300">Número:</span>
                        <span className="text-white">{completedOrderData?.orderNumber}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-300">Fecha:</span>
                        <span className="text-white">{new Date().toLocaleDateString('es-CL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total:</span>
                        <span className="text-green-400 font-bold">{formatPrice(getTotalPrice())}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-300">Items:</span>
                        <span className="text-white">{getTotalItems()} productos</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-300">Estado:</span>
                        <span className="text-green-400 font-bold">Completado</span>
                      </div>
                    </div>
                  </div>

                  {/* Información del Cliente */}
                  <div className="bg-black/50 border border-green-400/30 rounded-lg p-6">
                    <h3 className="text-green-400 font-bold text-xl mb-4">Información del Cliente</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-300 block">Nombre:</span>
                        <span className="text-white">{formData.nombre} {formData.apellidos}</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-300 block">Email:</span>
                        <span className="text-white">{formData.correo}</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-300 block">Dirección de Entrega:</span>
                        <span className="text-white text-sm">
                          {formData.calle} {formData.numero}<br/>
                          {formData.comuna}, {formData.region}
                        </span>
                      </div>
                      
                      {formData.indicaciones && (
                        <div>
                          <span className="text-gray-300 block">Indicaciones:</span>
                          <span className="text-white text-sm italic">"{formData.indicaciones}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Productos Comprados */}
                <div className="bg-black/50 border border-green-400/30 rounded-lg p-6 mb-8">
                  <h3 className="text-green-400 font-bold text-xl mb-4">Productos Comprados</h3>
                  
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-black/30 rounded-lg p-3">
                        {item.imagen && (
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.nombre}</h4>
                          <p className="text-gray-400 text-sm">Cantidad: {item.quantity}</p>
                        </div>
                        <span className="text-green-400 font-bold">
                          {formatPrice(item.precio * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notificaciones */}
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-blue-400 font-medium">¡Importante!</p>
                      <p className="text-gray-300 text-sm">
                        📧 Se ha enviado un correo de confirmación a {formData.correo}<br/>
                        📱 Guarda el ID de orden para futuras consultas<br/>
                        🚚 Recibirás actualizaciones sobre el estado de tu envío
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={async () => {
                      if (completedOrderData && orderId) {
                        try {
                          clearEmailStates();
                          const success = await sendInvoice(completedOrderData, orderId, formData.correo);
                          if (success) {
                            alert("✅ Boleta enviada por email exitosamente");
                          } else {
                            alert("❌ Error al enviar el email. Por favor, intenta de nuevo.");
                          }
                        } catch (error) {
                          console.error('Error al enviar email:', error);
                          alert("❌ Error al enviar el email. Por favor, intenta de nuevo.");
                        }
                      }
                    }}
                    disabled={isSendingEmail}
                    className={`px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2 ${
                      isSendingEmail
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isSendingEmail ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Enviar por Email</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      // Copiar ID de orden al portapapeles
                      navigator.clipboard.writeText(orderId).then(() => {
                        alert("✅ ID de orden copiado al portapapeles");
                      }).catch(() => {
                        alert("❌ No se pudo copiar el ID. Cópialo manualmente: " + orderId);
                      });
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copiar ID</span>
                  </button>
                  
                  <Link
                    to="/"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-colors text-center flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Volver al Inicio</span>
                  </Link>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
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
                          placeholder="Nombre de la calle"
                        />
                        {errors.calle && (
                          <p className="text-red-400 text-sm mt-1">{errors.calle}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          name="numero"
                          value={formData.numero}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors ${
                            errors.numero ? 'border-red-500' : 'border-green-400/30'
                          }`}
                          placeholder="Número"
                        />
                        {errors.numero && (
                          <p className="text-red-400 text-sm mt-1">{errors.numero}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Región *
                        </label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors ${
                            errors.region ? 'border-red-500' : 'border-green-400/30'
                          }`}
                        >
                          <option value="">Selecciona una región</option>
                          {Object.keys(regionesYComunas).map((region) => (
                            <option key={region} value={region} className="bg-black text-white">
                              {region}
                            </option>
                          ))}
                        </select>
                        {errors.region && (
                          <p className="text-red-400 text-sm mt-1">{errors.region}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Comuna *
                        </label>
                        <select
                          name="comuna"
                          value={formData.comuna}
                          onChange={handleInputChange}
                          disabled={!formData.region}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors ${
                            errors.comuna ? 'border-red-500' : 'border-green-400/30'
                          } ${!formData.region ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <option value="">
                            {formData.region ? "Selecciona una comuna" : "Primero selecciona una región"}
                          </option>
                          {comunasDisponibles.map((comuna) => (
                            <option key={comuna} value={comuna} className="bg-black text-white">
                              {comuna}
                            </option>
                          ))}
                        </select>
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
