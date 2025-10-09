import { useState, useEffect } from "react";

const productsData = [
  {
    id: 1,
    name: "Mouse Gamer RGB Pro",
    price: 45000,
    category: "Periféricos",
    description:
      "El Mouse Gamer RGB Pro es la herramienta perfecta para dominar cualquier juego. Con sensor óptico de alta precisión, iluminación RGB personalizable y diseño ergonómico, este mouse te dará la ventaja competitiva que necesitas. Sus 6 botones programables y scroll ultra-responsivo te permitirán ejecutar movimientos precisos y rápidos. Perfecto para FPS, MOBA y cualquier género de juego.",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1598550463415-d40055450072?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1605773527852-4b0b5c8a8c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    features: [
      "Sensor óptico de alta precisión",
      "Iluminación RGB personalizable",
      "6 botones programables",
      "Scroll ultra-responsivo",
      "Diseño ergonómico",
      "Cable reforzado",
    ],
    specifications: {
      DPI: "1000-16000",
      "Polling Rate": "1000Hz",
      Botones: "6 programables",
      Conexión: "USB 2.0",
      Peso: "120g",
      Dimensiones: "126 x 66 x 38 mm",
    },
  },
  {
    id: 2,
    name: "Teclado Mecánico Gaming",
    price: 85000,
    category: "Periféricos",
    description:
      "El Teclado Mecánico Gaming redefine la experiencia de escritura y gaming. Con switches mecánicos de alta calidad, retroiluminación RGB dinámica y construcción robusta, este teclado te ofrece la respuesta táctil perfecta para cada tecla. Sus teclas anti-ghosting y rollover completo garantizan que cada comando se registre instantáneamente, incluso durante las sesiones de juego más intensas.",
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    features: [
      "Switches mecánicos de alta calidad",
      "Retroiluminación RGB dinámica",
      "Anti-ghosting completo",
      "Construcción robusta",
      "Teclas multimedia",
      "Cable desmontable",
    ],
    specifications: {
      Tipo: "Mecánico",
      Switches: "Blue/Red/Brown",
      Conectividad: "USB-C",
      Teclas: "104 teclas",
      Peso: "1.2kg",
      Dimensiones: "440 x 130 x 35 mm",
    },
  },
  {
    id: 3,
    name: "Monitor Gaming 144Hz",
    price: 180000,
    category: "Monitores",
    description:
      "El Monitor Gaming 144Hz te sumerge en una experiencia visual sin precedentes. Con resolución Full HD, tiempo de respuesta de 1ms y frecuencia de actualización de 144Hz, este monitor elimina el motion blur y te da la ventaja competitiva que necesitas. Su tecnología FreeSync garantiza una sincronización perfecta con tu tarjeta gráfica, mientras que su diseño ultradelgado y bezels mínimos maximizan tu espacio de trabajo.",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    features: [
      "144Hz de frecuencia de actualización",
      "Tiempo de respuesta 1ms",
      "Tecnología FreeSync",
      "Resolución Full HD",
      "Diseño ultradelgado",
      "Bezels mínimos",
    ],
    specifications: {
      Tamaño: "24 pulgadas",
      Resolución: "1920x1080",
      Frecuencia: "144Hz",
      "Tiempo de respuesta": "1ms",
      Panel: "IPS",
      Conectores: "HDMI, DisplayPort, USB",
    },
  },
  {
    id: 4,
    name: "Auricular Gaming 7.1",
    price: 65000,
    category: "Audio",
    description:
      "El Auricular Gaming 7.1 te transporta al corazón de la acción con sonido surround virtual de 7.1 canales. Con micrófono omnidireccional de alta calidad, almohadillas de memoria viscoelástica y construcción robusta, este auricular te ofrece comodidad durante horas de gaming. Su tecnología de cancelación de ruido pasiva y drivers de 50mm te garantizan una experiencia de audio inmersiva y cristalina.",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    features: [
      "Sonido surround virtual 7.1",
      "Micrófono omnidireccional",
      "Almohadillas de memoria viscoelástica",
      "Drivers de 50mm",
      "Cancelación de ruido pasiva",
      "Construcción robusta",
    ],
    specifications: {
      Tipo: "Circumaural",
      Conectividad: "USB 2.0",
      Frecuencia: "20Hz - 20kHz",
      Impedancia: "32 Ohm",
      Peso: "350g",
      Cable: "2 metros",
    },
  },
  {
    id: 5,
    name: "Silla Gaming Ergonómica",
    price: 120000,
    category: "Mobiliario",
    description:
      "La Silla Gaming Ergonómica combina comodidad y estilo para tus largas sesiones de gaming. Con soporte lumbar ajustable, reposabrazos 4D, y tapizado de cuero sintético de alta calidad, esta silla te mantiene cómodo durante horas. Su base de 5 ruedas con ruedas de 60mm y mecanismo de inclinación te permite encontrar la posición perfecta para cualquier tipo de juego o trabajo.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    features: [
      "Soporte lumbar ajustable",
      "Reposabrazos 4D",
      "Tapizado de cuero sintético",
      "Base de 5 ruedas",
      "Mecanismo de inclinación",
      "Altura ajustable",
    ],
    specifications: {
      "Peso máximo": "150kg",
      Altura: "130-140cm",
      Ancho: "70cm",
      Profundidad: "70cm",
      Material: "Cuero sintético",
      Garantía: "2 años",
    },
  },
];

export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundProduct = productsData.find(
        (p) => p.id === parseInt(productId)
      );
      setProduct(foundProduct);

      if (foundProduct) {
        const related = productsData
          .filter(
            (p) =>
              p.category === foundProduct.category && p.id !== foundProduct.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }

      setIsLoading(false);
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      console.log(`Agregando al carrito: ${product.name} x${quantity}`);
      alert(`¡${product.name} agregado al carrito! (Cantidad: ${quantity})`);
    }
  };

  return {
    product,
    selectedImage,
    quantity,
    isLoading,
    relatedProducts,
    handleImageSelect,
    handleQuantityChange,
    handleAddToCart,
  };
};
