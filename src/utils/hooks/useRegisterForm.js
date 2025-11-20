import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { addUser } from "../../config/firestoreService";
import { validarRun, validadMayoriaEdad } from "../validaciones";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    run: "",
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

    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Los correos no coinciden";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es requerida";
    } else if (!validadMayoriaEdad(formData.birthDate)) {
      newErrors.birthDate = "Debes ser mayor de edad para registrarte";
    }

    if (!formData.run) {
      newErrors.run = "El RUN es requerido";
    } else if (!validarRun(formData.run)) {
      newErrors.run = "El RUN no es válido (formato: 12345678-9)";
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        nombreCompleto: formData.fullName,
        email: formData.email,
        fechaNacimiento: formData.birthDate,
        run: formData.run,
        emailVerified: user.emailVerified,
      };

      await addUser(userData);

      console.log("Usuario registrado exitosamente:", user);
      
      // Mostrar mensaje de éxito
      setSuccessMessage("¡Registro exitoso! Bienvenido a Level-UP Gamers. Redirigiendo al login...");
      
      // Redirigir al login después de un breve delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Error en registro:", error);
      
      let errorMessage = "Error inesperado al registrarse. Inténtalo de nuevo.";
      let fieldError = null;
      
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Ya existe una cuenta con este correo electrónico.";
          fieldError = "email";
          break;
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico no es válido.";
          fieldError = "email";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es muy débil. Debe tener al menos 6 caracteres.";
          fieldError = "password";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "El registro no está habilitado. Contacta al administrador.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Error de conexión. Verifica tu conexión a internet.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Espera unos minutos antes de intentar nuevamente.";
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
