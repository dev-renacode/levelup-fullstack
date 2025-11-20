import jsPDF from 'jspdf';

/**
 * Genera un PDF de boleta para una orden
 * @param {Object} orderData - Datos de la orden
 * @param {string} orderId - ID de la orden
 * @returns {jsPDF} - Documento PDF generado
 */
export const generateInvoicePDF = (orderData, orderId) => {
  const doc = new jsPDF();
  
  // Configuración de colores
  const primaryColor = [34, 197, 94]; // Verde
  const secondaryColor = [59, 130, 246]; // Azul
  const textColor = [31, 41, 55]; // Gris oscuro
  const lightGray = [156, 163, 175]; // Gris claro
  
  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };
  
  // Función para formatear fecha
  const formatDate = (date) => {
    if (!date) {
      return new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  let yPosition = 20;
  
  // Header con logo y título
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Level-UP Gamers', 20, 20);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Boleta de Compra', 20, 28);
  
  // Información de la orden
  yPosition = 45;
  doc.setTextColor(...textColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Información de la Orden', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Número de Orden: ${orderData.numeroOrden}`, 20, yPosition);
  yPosition += 6;
  doc.text(`ID de Firebase: ${orderId}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Fecha: ${formatDate(orderData.fechaCreacion)}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Estado: ${orderData.estado}`, 20, yPosition);
  
  // Información del cliente
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Datos del Cliente', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nombre: ${orderData.informacionCliente.nombre} ${orderData.informacionCliente.apellidos}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Email: ${orderData.informacionCliente.correo}`, 20, yPosition);
  
  // Dirección de entrega
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Dirección de Entrega', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orderData.direccionEntrega.calle} ${orderData.direccionEntrega.departamento}`, 20, yPosition);
  yPosition += 6;
  doc.text(`${orderData.direccionEntrega.comuna}, ${orderData.direccionEntrega.region}`, 20, yPosition);
  if (orderData.direccionEntrega.indicaciones) {
    yPosition += 6;
    doc.text(`Indicaciones: ${orderData.direccionEntrega.indicaciones}`, 20, yPosition);
  }
  
  // Tabla de productos
  yPosition += 20;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Productos Comprados', 20, yPosition);
  
  yPosition += 10;
  
  // Header de la tabla
  doc.setFillColor(...lightGray);
  doc.rect(20, yPosition - 5, 170, 8, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Producto', 25, yPosition);
  doc.text('Cantidad', 100, yPosition);
  doc.text('Precio Unit.', 130, yPosition);
  doc.text('Subtotal', 170, yPosition);
  
  yPosition += 8;
  
  // Productos
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  
  orderData.productos.forEach((item, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Fila del producto
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(20, yPosition - 5, 170, 8, 'F');
    }
    
    doc.text(item.nombre.length > 30 ? item.nombre.substring(0, 30) + '...' : item.nombre, 25, yPosition);
    doc.text(item.cantidad.toString(), 100, yPosition);
    doc.text(formatPrice(item.precio), 130, yPosition);
    doc.text(formatPrice(item.subtotal), 170, yPosition);
    
    yPosition += 8;
  });
  
  // Totales
  yPosition += 10;
  doc.setFillColor(...primaryColor);
  doc.rect(20, yPosition - 5, 170, 8, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN DE TOTALES', 25, yPosition);
  
  yPosition += 15;
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  doc.text(`Subtotal (${orderData.totalProductos} items):`, 20, yPosition);
  doc.text(formatPrice(orderData.subtotal), 170, yPosition);
  
  yPosition += 6;
  doc.text('Envío:', 20, yPosition);
  doc.text('Gratis', 170, yPosition);
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL:', 20, yPosition);
  doc.text(formatPrice(orderData.total), 170, yPosition);
  
  // Footer
  yPosition += 20;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...lightGray);
  doc.text('Gracias por tu compra en Level-UP Gamers', 20, yPosition);
  yPosition += 5;
  doc.text('Para consultas contacta a: admin@levelupgamers.cl', 20, yPosition);
  yPosition += 5;
  doc.text('Esta es una boleta generada automáticamente', 20, yPosition);
  
  return doc;
};

/**
 * Descarga un PDF de boleta
 * @param {Object} orderData - Datos de la orden
 * @param {string} orderId - ID de la orden
 */
export const downloadInvoicePDF = (orderData, orderId) => {
  try {
    const pdf = generateInvoicePDF(orderData, orderId);
    const fileName = `boleta_${orderData.numeroOrden}_${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error al generar PDF:', error);
    throw new Error('No se pudo generar el PDF');
  }
};

/**
 * Genera un PDF de boleta desde datos de Firebase
 * @param {string} orderId - ID de la orden en Firebase
 * @param {Object} orderData - Datos de la orden
 */
export const generatePDFFromOrder = (orderId, orderData) => {
  try {
    downloadInvoicePDF(orderData, orderId);
  } catch (error) {
    console.error('Error al generar PDF desde orden:', error);
    alert('Error al generar el PDF. Por favor, intenta de nuevo.');
  }
};

/**
 * Genera un PDF de boleta con diseño mejorado
 * @param {Object} orderData - Datos de la orden
 * @param {string} orderId - ID de la orden
 * @returns {jsPDF} - Documento PDF generado
 */
export const generateEnhancedInvoicePDF = (orderData, orderId) => {
  const doc = new jsPDF();
  
  // Configuración de colores
  const primaryColor = [34, 197, 94]; // Verde
  const secondaryColor = [59, 130, 246]; // Azul
  const textColor = [31, 41, 55]; // Gris oscuro
  const lightGray = [156, 163, 175]; // Gris claro
  const veryLightGray = [248, 250, 252]; // Gris muy claro
  
  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };
  
  // Función para formatear fecha
  const formatDate = (date) => {
    if (!date) {
      return new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  let yPosition = 20;
  
  // Header con diseño mejorado
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Logo/Título principal
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Level-UP Gamers', 20, 25);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Boleta de Compra', 20, 35);
  
  // Información de la orden en el lado derecho
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('BOLETA N°', 150, 20);
  doc.setFont('helvetica', 'normal');
  doc.text(orderData.numeroOrden, 150, 28);
  doc.text(`ID: ${orderId}`, 150, 35);
  
  // Línea separadora
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(2);
  doc.line(20, 45, 190, 45);
  
  // Información del cliente
  yPosition = 55;
  doc.setTextColor(...textColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Información del Cliente', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nombre: ${orderData.informacionCliente.nombre} ${orderData.informacionCliente.apellidos}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Email: ${orderData.informacionCliente.correo}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Fecha: ${formatDate(orderData.fechaCreacion)}`, 20, yPosition);
  
  // Dirección de entrega
  yPosition += 15;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Dirección de Entrega', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${orderData.direccionEntrega.calle} ${orderData.direccionEntrega.departamento}`, 20, yPosition);
  yPosition += 7;
  doc.text(`${orderData.direccionEntrega.comuna}, ${orderData.direccionEntrega.region}`, 20, yPosition);
  if (orderData.direccionEntrega.indicaciones) {
    yPosition += 7;
    doc.text(`Indicaciones: ${orderData.direccionEntrega.indicaciones}`, 20, yPosition);
  }
  
  // Tabla de productos con diseño mejorado
  yPosition += 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Productos Comprados', 20, yPosition);
  
  yPosition += 10;
  
  // Header de la tabla con diseño mejorado
  doc.setFillColor(...primaryColor);
  doc.rect(20, yPosition - 5, 170, 10, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Producto', 25, yPosition + 2);
  doc.text('Cant.', 100, yPosition + 2);
  doc.text('Precio Unit.', 130, yPosition + 2);
  doc.text('Subtotal', 170, yPosition + 2);
  
  yPosition += 10;
  
  // Productos con diseño alternado
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  
  orderData.productos.forEach((item, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Fondo alternado para las filas
    if (index % 2 === 0) {
      doc.setFillColor(...veryLightGray);
      doc.rect(20, yPosition - 5, 170, 10, 'F');
    }
    
    // Nombre del producto (truncado si es muy largo)
    const productName = item.nombre.length > 25 ? item.nombre.substring(0, 25) + '...' : item.nombre;
    doc.text(productName, 25, yPosition + 2);
    doc.text(item.cantidad.toString(), 100, yPosition + 2);
    doc.text(formatPrice(item.precio), 130, yPosition + 2);
    doc.text(formatPrice(item.subtotal), 170, yPosition + 2);
    
    yPosition += 10;
  });
  
  // Sección de totales con diseño mejorado
  yPosition += 10;
  doc.setFillColor(...lightGray);
  doc.rect(20, yPosition - 5, 170, 8, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN DE TOTALES', 25, yPosition + 2);
  
  yPosition += 15;
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');
  doc.text(`Subtotal (${orderData.totalProductos} items):`, 20, yPosition);
  doc.text(formatPrice(orderData.subtotal), 170, yPosition);
  
  yPosition += 8;
  doc.text('Envío:', 20, yPosition);
  doc.text('Gratis', 170, yPosition);
  
  // Línea separadora antes del total
  yPosition += 5;
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(1);
  doc.line(20, yPosition, 190, yPosition);
  
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL:', 20, yPosition);
  doc.text(formatPrice(orderData.total), 170, yPosition);
  
  // Footer mejorado
  yPosition += 20;
  doc.setFillColor(...veryLightGray);
  doc.rect(0, yPosition - 5, 210, 30, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...textColor);
  doc.text('¡Gracias por tu compra!', 20, yPosition + 5);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Level-UP Gamers - Tu tienda de confianza para gaming', 20, yPosition + 12);
  doc.text('Para consultas: admin@levelupgamers.cl', 20, yPosition + 18);
  doc.text('Esta boleta fue generada automáticamente', 20, yPosition + 24);
  
  return doc;
};

/**
 * Descarga un PDF de boleta con diseño mejorado
 * @param {Object} orderData - Datos de la orden
 * @param {string} orderId - ID de la orden
 */
export const downloadEnhancedInvoicePDF = (orderData, orderId) => {
  try {
    const pdf = generateEnhancedInvoicePDF(orderData, orderId);
    const fileName = `boleta_${orderData.numeroOrden}_${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error al generar PDF mejorado:', error);
    throw new Error('No se pudo generar el PDF mejorado');
  }
};
