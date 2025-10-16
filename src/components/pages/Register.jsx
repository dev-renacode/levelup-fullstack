import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import { useRegisterForm } from "../../utils/hooks/useRegisterForm";
import FormHeader from "../molecules/FormHeader";
import TextInput from "../atoms/TextInput";
import SubmitButton from "../atoms/SubmitButton";
import LoginLink from "../atoms/LoginLink";

const Register = () => {
  const {
    formData,
    errors,
    isLoading,
    successMessage,
    handleInputChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <main
      className="min-h-screen bg-black font-[Roboto] relative overflow-hidden"
      id="registro"
    >
      <GameBackgroundEffects />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pt-20">
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-2xl shadow-green-400/20 p-6 md:p-8">
          <FormHeader
            title="Registro de Usuario"
            subtitle="Únete a la comunidad gamer más grande de Chile"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
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
              </div>

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
                id="confirmEmail"
                name="confirmEmail"
                label="CONFIRMAR CORREO"
                type="email"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                placeholder="Confirma tu correo @duocuc.cl"
                error={errors.confirmEmail}
                required
              />

              <TextInput
                id="password"
                name="password"
                label="CONTRASEÑA"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mínimo 6 caracteres"
                error={errors.password}
                required
              />

              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                label="CONFIRMAR CONTRASEÑA"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirma tu contraseña"
                error={errors.confirmPassword}
                required
              />

              <TextInput
                id="birthDate"
                name="birthDate"
                label="FECHA DE NACIMIENTO"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                placeholder=""
                error={errors.birthDate}
                required
              />

              <TextInput
                id="run"
                name="run"
                label="RUN"
                type="text"
                value={formData.run}
                onChange={handleInputChange}
                placeholder="12345678-9"
                error={errors.run}
                required
              />
            </div>

            <div className="text-center pt-2">
              <SubmitButton disabled={isLoading}>
                {isLoading ? "Registrando..." : "REGISTRAR"}
              </SubmitButton>
            </div>

            <LoginLink />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
