/**
 * Genera características principales específicas para un producto basándose en su nombre y categoría
 * @param {Object} product - El objeto del producto con nombre y categoria
 * @returns {Array} - Un array de características específicas para el producto
 */
export function generateProductFeatures(product) {
  const nombre = (product.nombre || '').toLowerCase();
  const categoria = (product.categoria || '').toLowerCase();

  // Características específicas basadas en palabras clave del nombre
  if (nombre.includes('mouse') || nombre.includes('ratón') || nombre.includes('logitech')) {
    if (nombre.includes('superlight') || nombre.includes('g pro') || nombre.includes('wireless')) {
      return [
        'Sensor óptico de alta precisión (25,600 DPI)',
        'Conexión inalámbrica de baja latencia (1ms)',
        'Diseño ultraligero para máximo rendimiento',
        'Batería de larga duración (hasta 70 horas)',
        'Compatible con múltiples superficies',
        'Software de personalización incluido'
      ];
    }
    return [
      'Sensor óptico de alta precisión',
      'Diseño ergonómico para gaming prolongado',
      'Botones programables',
      'Compatibilidad multiplataforma',
      'Construcción duradera y resistente',
      'Garantía de 1 año'
    ];
  }

  if (nombre.includes('teclado') || nombre.includes('keyboard')) {
    if (nombre.includes('mecánico') || nombre.includes('mechanical')) {
      return [
        'Switches mecánicos de alta calidad',
        'Iluminación RGB personalizable',
        'Teclas anti-ghosting (N-key rollover)',
        'Diseño ergonómico con reposamuñecas',
        'Construcción robusta y duradera',
        'Software de personalización avanzado'
      ];
    }
    return [
      'Diseño compacto y ergonómico',
      'Iluminación LED personalizable',
      'Teclas de respuesta rápida',
      'Compatibilidad multiplataforma',
      'Construcción resistente',
      'Garantía de 1 año'
    ];
  }

  if (nombre.includes('auricular') || nombre.includes('headset') || nombre.includes('audífono') || nombre.includes('audifono')) {
    if (nombre.includes('wireless') || nombre.includes('inalámbrico')) {
      return [
        'Sonido envolvente 7.1 virtual',
        'Conexión inalámbrica de baja latencia',
        'Cancelación de ruido activa',
        'Batería de larga duración (30+ horas)',
        'Micrófono retráctil con cancelación de ruido',
        'Almohadillas cómodas para sesiones largas'
      ];
    }
    return [
      'Sonido estéreo de alta fidelidad',
      'Micrófono omnidireccional integrado',
      'Almohadillas acolchadas y cómodas',
      'Control de volumen en línea',
      'Compatibilidad multiplataforma',
      'Garantía de 1 año'
    ];
  }

  if (nombre.includes('monitor') || nombre.includes('pantalla')) {
    if (nombre.includes('144hz') || nombre.includes('240hz') || nombre.includes('gaming')) {
      return [
        'Alta frecuencia de actualización (144Hz/240Hz)',
        'Tiempo de respuesta ultra rápido (1ms)',
        'Tecnología FreeSync/G-Sync compatible',
        'Resolución Full HD o superior',
        'Panel IPS para colores precisos',
        'Diseño sin bordes para inmersión total'
      ];
    }
    return [
      'Resolución de alta calidad',
      'Panel IPS para colores precisos',
      'Múltiples puertos de conexión',
      'Diseño ergonómico ajustable',
      'Tecnología de bajo consumo energético',
      'Garantía de 1 año'
    ];
  }

  if (nombre.includes('silla') || nombre.includes('chair') || nombre.includes('gaming chair')) {
    return [
      'Soporte lumbar ajustable',
      'Reposabrazos multifuncionales 4D',
      'Material de cuero sintético premium',
      'Base de acero reforzado',
      'Mecanismo de inclinación 180°',
      'Ruedas suaves y silenciosas'
    ];
  }

  if (nombre.includes('alfombrilla') || nombre.includes('mousepad') || nombre.includes('pad')) {
    return [
      'Superficie optimizada para precisión',
      'Base antideslizante de goma',
      'Bordes cosidos para mayor durabilidad',
      'Tamaño amplio para movimientos libres',
      'Fácil limpieza y mantenimiento',
      'Diseño gaming estético'
    ];
  }

  if (nombre.includes('webcam') || nombre.includes('cámara') || nombre.includes('camara')) {
    return [
      'Resolución Full HD 1080p',
      'Enfoque automático inteligente',
      'Micrófono con cancelación de ruido',
      'Iluminación automática ajustable',
      'Compatibilidad multiplataforma',
      'Privacidad con tapa de lente'
    ];
  }

  if (nombre.includes('micrófono') || nombre.includes('microfono') || nombre.includes('mic')) {
    return [
      'Calidad de audio profesional',
      'Patrón de captación direccional',
      'Filtro anti-pop incluido',
      'Compatibilidad con múltiples plataformas',
      'Montaje flexible incluido',
      'Cancelación de ruido de fondo'
    ];
  }

  if (nombre.includes('control') || nombre.includes('mando') || nombre.includes('gamepad') || nombre.includes('controller')) {
    return [
      'Diseño ergonómico para gaming prolongado',
      'Botones analógicos de alta precisión',
      'Retroalimentación háptica avanzada',
      'Batería recargable de larga duración',
      'Compatibilidad multiplataforma',
      'Conexión inalámbrica de baja latencia'
    ];
  }

  if (nombre.includes('videojuego') || nombre.includes('juego') || nombre.includes('game') || categoria.includes('videojuego') || categoria.includes('juego')) {
    return [
      'Gráficos de última generación',
      'Modo multijugador online',
      'Historia inmersiva y emocionante',
      'Soporte para múltiples idiomas',
      'Actualizaciones y contenido adicional',
      'Compatibilidad multiplataforma'
    ];
  }

  if (nombre.includes('placa') || nombre.includes('tarjeta') || nombre.includes('gpu') || nombre.includes('rtx') || nombre.includes('gtx')) {
    return [
      'Arquitectura de última generación',
      'Ray Tracing y DLSS compatibles',
      'Múltiples puertos de salida',
      'Refrigeración avanzada',
      'Alto rendimiento en 4K',
      'Garantía extendida del fabricante'
    ];
  }

  if (nombre.includes('procesador') || nombre.includes('cpu') || nombre.includes('ryzen') || nombre.includes('intel')) {
    return [
      'Múltiples núcleos y hilos',
      'Frecuencias de boost altas',
      'Tecnología de proceso avanzada',
      'Soporte para overclocking',
      'Eficiencia energética mejorada',
      'Garantía del fabricante'
    ];
  }

  if (nombre.includes('ram') || nombre.includes('memoria')) {
    return [
      'Alta velocidad de transferencia',
      'Bajas latencias (CL)',
      'Compatible con overclocking',
      'Diseño con disipadores de calor',
      'Compatible con Intel y AMD',
      'Garantía de por vida'
    ];
  }

  if (nombre.includes('ssd') || nombre.includes('disco') || nombre.includes('almacenamiento')) {
    return [
      'Velocidades de lectura/escritura ultrarrápidas',
      'Tecnología NVMe PCIe',
      'Alta capacidad de almacenamiento',
      'Resistente a golpes y vibraciones',
      'Bajo consumo energético',
      'Garantía extendida'
    ];
  }

  if (nombre.includes('fuente') || nombre.includes('psu') || nombre.includes('power supply')) {
    return [
      'Certificación 80 Plus (alta eficiencia)',
      'Cables modulares para mejor gestión',
      'Protección completa (OVP, UVP, OCP, etc.)',
      'Ventilador silencioso',
      'Alta potencia para sistemas gaming',
      'Garantía extendida'
    ];
  }

  if (nombre.includes('gabinete') || nombre.includes('case') || nombre.includes('torre')) {
    return [
      'Diseño con flujo de aire optimizado',
      'Espacio amplio para componentes',
      'Gestión de cables mejorada',
      'Ventiladores RGB incluidos',
      'Panel lateral de vidrio templado',
      'Compatibilidad con múltiples formatos'
    ];
  }

  if (nombre.includes('consola') || nombre.includes('playstation') || nombre.includes('xbox') || nombre.includes('nintendo')) {
    return [
      'Procesador de última generación',
      'Almacenamiento de alta velocidad',
      'Compatibilidad con 4K y HDR',
      'Biblioteca de juegos exclusivos',
      'Suscripción a servicios online',
      'Mando inalámbrico incluido'
    ];
  }

  // Características basadas en categoría si no se encontró coincidencia en el nombre
  if (categoria.includes('accesorio') || categoria.includes('periférico')) {
    return [
      'Diseño gaming premium',
      'Compatibilidad multiplataforma',
      'Construcción de alta calidad',
      'Fácil instalación y configuración',
      'Soporte técnico incluido',
      'Garantía de 1 año'
    ];
  }

  if (categoria.includes('hardware') || categoria.includes('componente')) {
    return [
      'Tecnología de última generación',
      'Alto rendimiento y eficiencia',
      'Compatibilidad amplia',
      'Construcción robusta',
      'Soporte técnico del fabricante',
      'Garantía extendida'
    ];
  }

  // Características genéricas pero apropiadas para productos gaming
  return [
    'Tecnología gaming de última generación',
    'Diseño premium y duradero',
    'Compatibilidad multiplataforma',
    'Fácil instalación y uso',
    'Soporte técnico incluido',
    'Garantía de 1 año'
  ];
}

