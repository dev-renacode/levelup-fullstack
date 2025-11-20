import emailjs from '@emailjs/browser';

// Configuración de EmailJS
// NOTA: En producción, estas claves deben estar en variables de entorno
const EMAILJS_SERVICE_ID = 'service_levelup_gamers'; // Cambiar por tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_boleta'; // Cambiar por tu Template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Cambiar por tu Public Key

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Envía una boleta por email al cliente
 * @param {Object} orderData - Datos de la orden
 * @param {string} orderId - ID de la orden
 * @param {string} customerEmail - Email del cliente
 * @returns {Promise<boolean>} - True si se envió correctamente
 */
export const sendInvoiceEmail = async (orderData, orderId, customerEmail) => {
  try {
    // Preparar los datos para el template de email
    const templateParams = {
      to_email: customerEmail,
      customer_name: `${orderData.informacionCliente.nombre} ${orderData.informacionCliente.apellidos}`,
      order_number: orderData.numeroOrden,
      order_id: orderId,
      order_date: new Date(orderData.fechaCreacion?.toDate?.() || orderData.fechaCreacion).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      total_amount: new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
      }).format(orderData.total),
      total_items: orderData.totalProductos,
      shipping_address: `${orderData.direccionEntrega.calle} ${orderData.direccionEntrega.departamento}, ${orderData.direccionEntrega.comuna}, ${orderData.direccionEntrega.region}`,
      company_name: 'Level-UP Gamers',
      company_email: 'admin@levelupgamers.cl',
      company_phone: '+56 9 1234 5678',
      website_url: 'https://levelupgamers.cl'
    };

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email enviado exitosamente:', response);
    return true;

  } catch (error) {
    console.error('Error al enviar email:', error);
    throw new Error('No se pudo enviar el email. Por favor, intenta de nuevo.');
  }
};

/**
 * Envía un email de confirmación simple (sin PDF adjunto)
 * @param {Object} orderData - Datos de la orden
 * @param {string} orderId - ID de la orden
 * @param {string} customerEmail - Email del cliente
 * @returns {Promise<boolean>} - True si se envió correctamente
 */
export const sendConfirmationEmail = async (orderData, orderId, customerEmail) => {
  try {
    const templateParams = {
      to_email: customerEmail,
      customer_name: `${orderData.informacionCliente.nombre} ${orderData.informacionCliente.apellidos}`,
      order_number: orderData.numeroOrden,
      order_id: orderId,
      order_date: new Date(orderData.fechaCreacion?.toDate?.() || orderData.fechaCreacion).toLocaleDateString('es-CL'),
      total_amount: new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
      }).format(orderData.total),
      company_name: 'Level-UP Gamers'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_confirmacion', // Template diferente para confirmación
      templateParams
    );

    console.log('Email de confirmación enviado:', response);
    return true;

  } catch (error) {
    console.error('Error al enviar email de confirmación:', error);
    throw new Error('No se pudo enviar el email de confirmación.');
  }
};

/**
 * Simula el envío de email (para desarrollo/testing)
 * @param {Object} orderData - Datos de la orden
 * @param {string} orderId - ID de la orden
 * @param {string} customerEmail - Email del cliente
 * @returns {Promise<boolean>} - True si se simuló correctamente
 */
export const simulateEmailSend = async (orderData, orderId, customerEmail) => {
  return new Promise((resolve) => {
    // Simular delay de envío
    setTimeout(() => {
      console.log('📧 Email simulado enviado a:', customerEmail);
      console.log('📋 Datos de la orden:', {
        orderNumber: orderData.numeroOrden,
        orderId,
        customer: `${orderData.informacionCliente.nombre} ${orderData.informacionCliente.apellidos}`,
        total: orderData.total
      });
      resolve(true);
    }, 2000);
  });
};

/**
 * Verifica si EmailJS está configurado correctamente
 * @returns {boolean} - True si está configurado
 */
export const isEmailConfigured = () => {
  return EMAILJS_SERVICE_ID !== 'service_levelup_gamers' && 
         EMAILJS_TEMPLATE_ID !== 'template_boleta' && 
         EMAILJS_PUBLIC_KEY !== 'your_public_key_here';
};
