import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { createContact } from "../../config/firestoreService";

export const useContactForm = () => {
  const { userData, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || userData?.nombreCompleto || "",
    email: userData?.email || "",
    content: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else {
      const allowedDomains = [
        "@duocuc.cl",
        "@gmail.com",
        "@profesor.duocuc.cl",
      ];
      const hasAllowedDomain = allowedDomains.some((domain) =>
        formData.email.endsWith(domain)
      );
      if (!hasAllowedDomain) {
        newErrors.email =
          "El correo debe ser de @duocuc.cl, @gmail.com o @profesor.duocuc.cl";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "El correo no es válido";
      }
    }

    if (!formData.content.trim()) {
      newErrors.content = "El contenido del mensaje es requerido";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      // Preparar datos del contacto
      const contactData = {
        idUsuario: isAuthenticated ? userData?.uid : null,
        nombreCompleto: formData.fullName,
        email: formData.email,
        contenido: formData.content,
        estado: "pendiente"
      };

      // Guardar en Firebase
      await createContact(contactData);

      setSuccessMessage("¡Mensaje enviado exitosamente! Te responderemos pronto.");
      
      // Limpiar formulario (mantener nombre y email si está autenticado)
      setFormData({
        fullName: userData?.fullName || userData?.nombreCompleto || "",
        email: userData?.email || "",
        content: "",
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setErrors({ general: "Error al enviar el mensaje. Inténtalo de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    successMessage,
    handleInputChange,
    handleSubmit,
  };
};
