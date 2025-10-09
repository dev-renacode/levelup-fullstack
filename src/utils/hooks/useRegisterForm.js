import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { addUser } from "../../config/firestoreService";
import { validarRun, validadMayoriaEdad } from "../validaciones";

export const useRegisterForm = () => {
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
        fullName: formData.fullName,
        email: formData.email,
        birthDate: formData.birthDate,
        run: formData.run,
        emailVerified: user.emailVerified,
      };

      await addUser(userData);

      console.log("Usuario registrado exitosamente:", user);
      
      alert("¡Registro exitoso! Bienvenido a Level-UP Gamers. Ahora puedes iniciar sesión.");
      
      window.location.hash = "login";

    } catch (error) {
      console.error("Error en registro:", error);
      
      let errorMessage = "Error al registrarse. Inténtalo de nuevo.";
      
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Ya existe una cuenta con este correo electrónico.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es muy débil. Debe tener al menos 6 caracteres.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "El registro no está habilitado. Contacta al administrador.";
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
