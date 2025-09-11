import GameBackgroundEffects from "../visualeffects/GameBackgroundEffects";
import { useContactForm } from "../../hooks/useContactForm";
import FormHeader from "../forms/FormHeader";
import TextInput from "../forms/TextInput";
import TextareaInput from "../forms/TextareaInput";
import SubmitButton from "../forms/SubmitButton";

const Contact = () => {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useContactForm();

  return (
    <main
      className="min-h-screen bg-black font-[Roboto] relative overflow-hidden"
      id="contacto"
    >
      <GameBackgroundEffects />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pt-20">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-400/25">
            <svg
              className="w-12 h-12 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-green-400 font-[Orbitron] mb-2">
            Level-UP Gamers
          </h1>
        </div>

        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-2xl shadow-green-400/20 p-6 md:p-8">
          <FormHeader
            title="FORMULARIO DE CONTACTOS"
            subtitle="Envíanos tu mensaje y te responderemos pronto"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm font-[Roboto] text-center">
                  {errors.general}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <TextInput
                id="fullName"
                name="fullName"
                label="NOMBRE COMPLETO"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Ingresa tu nombre completo"
                error={errors.fullName}
                required
              />

              <TextInput
                id="email"
                name="email"
                label="CORREO"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu.nombre@duocuc.cl"
                error={errors.email}
                required
              />

              <TextareaInput
                id="content"
                name="content"
                label="CONTENIDO"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Escribe tu mensaje aquí... ¿Tienes alguna pregunta sobre nuestros productos? ¿Necesitas ayuda con tu pedido? ¡Estamos aquí para ayudarte!"
                error={errors.content}
                required
                rows={6}
              />
            </div>

            <div className="text-center pt-2">
              <SubmitButton disabled={isLoading}>
                {isLoading ? "Enviando mensaje..." : "ENVIAR MENSAJE"}
              </SubmitButton>
            </div>

            <div className="text-center pt-4">
              <p className="text-white/70 text-sm font-[Roboto]">
                ¿Prefieres contactarnos directamente?{" "}
                <a
                  href="mailto:contacto@levelupgamers.cl"
                  className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium"
                >
                  contacto@levelupgamers.cl
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg font-[Orbitron] mb-2">
              Teléfono
            </h3>
            <p className="text-white/70 text-sm font-[Roboto]">
              +56 2 2345 6789
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg font-[Orbitron] mb-2">
              Email
            </h3>
            <p className="text-white/70 text-sm font-[Roboto]">
              contacto@levelupgamers.cl
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg font-[Orbitron] mb-2">
              Ubicación
            </h3>
            <p className="text-white/70 text-sm font-[Roboto]">
              Santiago, Chile
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
