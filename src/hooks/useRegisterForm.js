import { useState } from "react";

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phone: "",
    region: "",
    commune: "",
  });

  const [errors, setErrors] = useState({});

  const regions = [
    "Región Metropolitana de Santiago",
    "Región de la Araucanía",
    "Región de Ñuble",
    "Región de Valparaíso",
    "Región del Biobío",
    "Región de Antofagasta",
  ];

  const communes = {
    "Región Metropolitana de Santiago": [
      "Santiago",
      "Las Condes",
      "Providencia",
      "Ñuñoa",
      "Maipú",
    ],
    "Región de la Araucanía": [
      "Temuco",
      "Padre Las Casas",
      "Villarrica",
      "Pucón",
    ],
    "Región de Ñuble": ["Chillán", "Linares", "Longaví", "Concepción"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Chiguayante", "Hualpén"],
    "Región de Antofagasta": [
      "Antofagasta",
      "Calama",
      "Tocopilla",
      "Mejillones",
    ],
  };

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

    if (!formData.region) {
      newErrors.region = "Debe seleccionar una región";
    }

    if (!formData.commune) {
      newErrors.commune = "Debe seleccionar una comuna";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos del formulario:", formData);
      alert("¡Registro exitoso! Bienvenido a Level-UP Gamers");
    }
  };

  return {
    formData,
    errors,
    regions,
    communes,
    handleInputChange,
    handleSubmit,
  };
};
