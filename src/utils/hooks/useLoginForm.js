import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { getUserByEmail } from "../../config/firestoreService";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    
    // Limpiar mensaje de éxito cuando el usuario empiece a escribir
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar errores y mensajes previos
    setErrors({});
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      console.log("Usuario autenticado:", userCredential.user);
      
      // Mostrar mensaje de éxito
      setSuccessMessage("¡Inicio de sesión exitoso! Redirigiendo...");
      
      // Obtener datos del usuario
      let userData = null;
      try {
        userData = await getUserByEmail(formData.email);
      } catch (firestoreError) {
        console.warn("Error al obtener datos de Firestore:", firestoreError);
        // Continuar sin datos de Firestore si hay error
      }
      
      // Pequeño delay para mostrar el mensaje de éxito
      setTimeout(() => {
        // El contexto de autenticación se encargará de la redirección automáticamente
        // Solo redirigir si es admin
        if (userData && userData.role === "admin") {
          window.location.hash = "admin";
        } else if (formData.email === "admin@duocuc.cl") {
          window.location.hash = "admin";
        } else {
          window.location.hash = "home";
        }
      }, 1000);
      
    } catch (error) {
      console.error("Error en login:", error);
      
      let errorMessage = "Error inesperado al iniciar sesión. Inténtalo de nuevo.";
      let fieldError = null;
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo electrónico.";
          fieldError = "email";
          break;
        case "auth/wrong-password":
          errorMessage = "La contraseña es incorrecta. Verifica tu contraseña.";
          fieldError = "password";
          break;
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico no es válido.";
          fieldError = "email";
          break;
        case "auth/invalid-credential":
          errorMessage = "Las credenciales son incorrectas. Verifica tu correo y contraseña.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Espera unos minutos antes de intentar nuevamente.";
          break;
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada. Contacta al administrador.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Error de conexión. Verifica tu conexión a internet.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "El inicio de sesión no está habilitado. Contacta al administrador.";
          break;
        case "auth/requires-recent-login":
          errorMessage = "Por seguridad, necesitas iniciar sesión nuevamente.";
          break;
        default:
          // Para errores no manejados específicamente
          if (error.message) {
            errorMessage = `Error: ${error.message}`;
          }
      }
      
      // Establecer el error en el campo específico si es posible, o como error general
      if (fieldError) {
        setErrors({ [fieldError]: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }
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
