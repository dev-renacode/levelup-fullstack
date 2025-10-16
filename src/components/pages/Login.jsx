import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import { useLoginForm } from "../../utils/hooks/useLoginForm";
import FormHeader from "../molecules/FormHeader";
import TextInput from "../atoms/TextInput";
import SubmitButton from "../atoms/SubmitButton";

const Login = () => {
  const { formData, errors, isLoading, successMessage, handleInputChange, handleSubmit } =
    useLoginForm();

  return (
    <main
      className="min-h-screen bg-black font-[Roboto] relative overflow-hidden"
      id="login"
    >
      <GameBackgroundEffects />

      <div className="relative z-10 max-w-md mx-auto px-4 py-8 pt-20">
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-2xl shadow-green-400/20 p-6 md:p-8">
          <FormHeader
            title="Inicio de Sesión"
            subtitle="Accede a tu cuenta de Level-UP Gamers"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-400 text-sm font-[Roboto]">
                    {errors.general}
                  </p>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-400 text-sm font-[Roboto]">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
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

              <TextInput
                id="password"
                name="password"
                label="CONTRASEÑA"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña"
                error={errors.password}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/70 font-[Roboto]">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-green-400/50 bg-black/50 text-green-400 focus:ring-green-400/50"
                />
                Recordarme
              </label>
              <a
                href="#forgot-password"
                className="text-green-400 hover:text-green-300 transition-colors duration-300 font-[Roboto]"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div className="text-center pt-2">
              <SubmitButton disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "INICIAR SESIÓN"}
              </SubmitButton>
            </div>

            <div className="text-center pt-4">
              <p className="text-white/70 text-sm font-[Roboto]">
                ¿No tienes cuenta?{" "}
                <a
                  href="#register"
                  className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium"
                >
                  Regístrate aquí
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
