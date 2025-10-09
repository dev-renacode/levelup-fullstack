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
      
      const userData = await getUserByEmail(formData.email);
      
      if (userData) {
        if (userData.role === "admin") {
          window.location.hash = "admin";
        } else {
          localStorage.setItem("currentUser", JSON.stringify({
            fullName: userData.fullName,
            email: userData.email
          }));
          window.location.hash = "home";
        }
      } else {
        if (formData.email === "admin@duocuc.cl") {
          window.location.hash = "admin";
        } else {
          localStorage.setItem("currentUser", JSON.stringify({
            fullName: "Usuario",
            email: formData.email
          }));
          window.location.hash = "home";
        }
      }
      
    } catch (error) {
      console.error("Error en login:", error);
      
      let errorMessage = "Error al iniciar sesión. Inténtalo de nuevo.";
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo electrónico.";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Inténtalo más tarde.";
          break;
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada.";
          break;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
