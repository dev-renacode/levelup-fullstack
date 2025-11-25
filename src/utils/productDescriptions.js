/**
 * Genera una descripción coherente para un producto basándose en su nombre y categoría
 * @param {Object} product - El objeto del producto con nombre y categoria
 * @returns {string} - Una descripción generada para el producto
 */
export function generateProductDescription(product) {
  const nombre = (product.nombre || '').toLowerCase();
  const categoria = (product.categoria || '').toLowerCase();

  // Descripciones específicas basadas en palabras clave del nombre
  if (nombre.includes('mouse') || nombre.includes('ratón') || nombre.includes('logitech')) {
    if (nombre.includes('superlight') || nombre.includes('g pro') || nombre.includes('gaming')) {
      return 'Mouse gaming inalámbrico de última generación diseñado para jugadores profesionales. Con sensor de alta precisión, diseño ergonómico ultraligero y batería de larga duración. Perfecto para gaming competitivo y uso intensivo. Incluye tecnología de conexión inalámbrica de baja latencia para una experiencia sin retrasos.';
    }
    return 'Mouse gaming de alta calidad con sensor óptico preciso y diseño ergonómico. Ideal para gaming y trabajo profesional. Ofrece precisión milimétrica y comodidad durante largas sesiones de juego. Compatible con múltiples superficies y configuraciones personalizables.';
  }

  if (nombre.includes('teclado') || nombre.includes('keyboard')) {
    if (nombre.includes('mecánico') || nombre.includes('mechanical')) {
      return 'Teclado mecánico gaming con switches de alta calidad que ofrecen retroalimentación táctil precisa. Diseñado para jugadores que buscan velocidad y precisión. Incluye iluminación RGB personalizable, teclas anti-ghosting y construcción robusta para soportar sesiones de gaming intensivas.';
    }
    return 'Teclado gaming de alto rendimiento con diseño ergonómico y teclas optimizadas para gaming. Ofrece respuesta rápida, iluminación personalizable y durabilidad excepcional. Perfecto para jugadores casuales y profesionales que buscan calidad y comodidad.';
  }

  if (nombre.includes('auricular') || nombre.includes('headset') || nombre.includes('audífono') || nombre.includes('audifono')) {
    if (nombre.includes('wireless') || nombre.includes('inalámbrico')) {
      return 'Auriculares gaming inalámbricos con sonido envolvente 7.1 y cancelación de ruido activa. Diseñados para ofrecer una experiencia inmersiva con audio de alta fidelidad. Batería de larga duración, micrófono retráctil con cancelación de ruido y comodidad durante horas de uso. Perfectos para gaming y comunicación.';
    }
    return 'Auriculares gaming con sonido estéreo de alta calidad y micrófono integrado. Ofrecen comodidad durante largas sesiones de juego con almohadillas acolchadas y ajuste ergonómico. Audio cristalino para una experiencia inmersiva y comunicación clara con tu equipo.';
  }

  if (nombre.includes('monitor') || nombre.includes('pantalla')) {
    if (nombre.includes('144hz') || nombre.includes('240hz') || nombre.includes('gaming')) {
      return 'Monitor gaming de alta frecuencia de actualización diseñado para gaming competitivo. Ofrece imágenes fluidas sin desenfoque de movimiento, tiempo de respuesta ultra rápido y tecnología de sincronización adaptativa. Perfecto para jugadores que buscan la ventaja competitiva con visuales nítidos y sin lag.';
    }
    return 'Monitor de alta calidad con excelente reproducción de color y nitidez. Ideal para gaming, trabajo y entretenimiento. Ofrece una experiencia visual inmersiva con tecnología avanzada de panel y diseño moderno.';
  }

  if (nombre.includes('silla') || nombre.includes('chair') || nombre.includes('gaming chair')) {
    return 'Silla gaming ergonómica diseñada para máximo confort durante largas sesiones de juego. Con soporte lumbar ajustable, reposabrazos multifuncionales y materiales de alta calidad. Ofrece la combinación perfecta de estilo gaming y comodidad profesional para cuidar tu postura.';
  }

  if (nombre.includes('alfombrilla') || nombre.includes('mousepad') || nombre.includes('pad')) {
    return 'Alfombrilla gaming de alta calidad con superficie optimizada para precisión y velocidad. Diseño antideslizante, bordes cosidos para mayor durabilidad y tamaño amplio para movimientos libres. Esencial para cualquier setup gaming profesional.';
  }

  if (nombre.includes('webcam') || nombre.includes('cámara') || nombre.includes('camara')) {
    return 'Cámara web de alta definición perfecta para streaming, videollamadas y contenido. Con enfoque automático, micrófono integrado con cancelación de ruido y calidad de imagen profesional. Ideal para creadores de contenido y profesionales que necesitan la mejor calidad de video.';
  }

  if (nombre.includes('micrófono') || nombre.includes('microfono') || nombre.includes('mic')) {
    return 'Micrófono de estudio de alta calidad con captura de audio profesional. Diseñado para streaming, podcasting y grabación. Ofrece cancelación de ruido, filtro anti-pop y compatibilidad con múltiples plataformas. La herramienta perfecta para creadores de contenido serios.';
  }

  if (nombre.includes('control') || nombre.includes('mando') || nombre.includes('gamepad') || nombre.includes('controller')) {
    return 'Control gaming inalámbrico con diseño ergonómico y precisión mejorada. Compatible con múltiples plataformas, botones programables y retroalimentación háptica avanzada. Perfecto para gaming en consola y PC, ofreciendo comodidad y control total durante tus sesiones de juego.';
  }

  if (nombre.includes('placa') || nombre.includes('tarjeta') || nombre.includes('gpu') || nombre.includes('rtx') || nombre.includes('gtx')) {
    return 'Tarjeta gráfica de alto rendimiento diseñada para gaming y creación de contenido. Ofrece potencia excepcional para juegos en 4K, ray tracing y tecnologías de última generación. Perfecta para jugadores y creadores que buscan el máximo rendimiento visual.';
  }

  if (nombre.includes('procesador') || nombre.includes('cpu') || nombre.includes('ryzen') || nombre.includes('intel')) {
    return 'Procesador de alto rendimiento optimizado para gaming y multitarea. Con múltiples núcleos y frecuencias elevadas, ofrece la potencia necesaria para los juegos más exigentes y aplicaciones profesionales. La base perfecta para cualquier PC gaming de alto rendimiento.';
  }

  if (nombre.includes('ram') || nombre.includes('memoria')) {
    return 'Memoria RAM de alta velocidad diseñada para gaming y overclocking. Ofrece latencias bajas y frecuencias altas para un rendimiento óptimo. Esencial para sistemas gaming de alto rendimiento que requieren velocidad y capacidad para multitarea intensiva.';
  }

  if (nombre.includes('ssd') || nombre.includes('disco') || nombre.includes('almacenamiento')) {
    return 'Unidad de almacenamiento SSD de alta velocidad que transforma la experiencia de tu PC. Carga de juegos instantánea, arranque rápido del sistema y transferencia de archivos ultrarrápida. La mejora más notable que puedes hacer a tu sistema gaming.';
  }

  if (nombre.includes('fuente') || nombre.includes('psu') || nombre.includes('power supply')) {
    return 'Fuente de alimentación de alta eficiencia certificada para sistemas gaming. Ofrece potencia estable y confiable para componentes de alto rendimiento. Con certificación de eficiencia energética, cables modulares y protección completa para tus componentes más valiosos.';
  }

  if (nombre.includes('gabinete') || nombre.includes('case') || nombre.includes('torre')) {
    return 'Gabinete gaming con diseño moderno y funcionalidad avanzada. Espacio amplio para componentes, gestión de cables optimizada, ventilación mejorada y diseño estético con iluminación RGB. La base perfecta para construir tu PC gaming soñado.';
  }

  // Descripciones basadas en categoría si no se encontró coincidencia en el nombre
  if (categoria.includes('accesorio') || categoria.includes('periférico')) {
    return 'Accesorio gaming de alta calidad diseñado para mejorar tu experiencia de juego. Fabricado con materiales premium y tecnología avanzada, este producto está pensado para jugadores que buscan lo mejor en rendimiento y durabilidad.';
  }

  if (categoria.includes('hardware') || categoria.includes('componente')) {
    return 'Componente de hardware gaming de última generación diseñado para ofrecer máximo rendimiento. Con tecnología avanzada y construcción de calidad, este producto es esencial para cualquier setup gaming profesional o de alto rendimiento.';
  }

  // Descripción genérica pero coherente para productos gaming
  return `Producto gaming de alta calidad diseñado para ofrecer la mejor experiencia a jugadores exigentes. Con tecnología de última generación, diseño ergonómico y construcción robusta, este producto está pensado para durar y ofrecer rendimiento excepcional en cada sesión de juego. Perfecto para gamers que buscan calidad y confiabilidad.`;
}

