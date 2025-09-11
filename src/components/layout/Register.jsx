import GameBackgroundEffects from "../visualeffects/GameBackgroundEffects";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import FormHeader from "../forms/FormHeader";
import TextInput from "../forms/TextInput";
import SelectInput from "../forms/SelectInput";
import SubmitButton from "../forms/SubmitButton";
import LoginLink from "../forms/LoginLink";

const Register = () => {
  const {
    formData,
    errors,
    regions,
    communes,
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
                id="phone"
                name="phone"
                label="TELÉFONO (opcional)"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+56 9 1234 5678"
                labelColor="text-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                id="region"
                name="region"
                label="REGIÓN"
                value={formData.region}
                onChange={handleInputChange}
                options={regions}
                placeholder="-- Seleccione la región --"
                error={errors.region}
                required
              />

              <SelectInput
                id="commune"
                name="commune"
                label="COMUNA"
                value={formData.commune}
                onChange={handleInputChange}
                options={formData.region ? communes[formData.region] || [] : []}
                placeholder="-- Seleccione la comuna --"
                error={errors.commune}
                disabled={!formData.region}
                required
                labelColor="text-blue-400"
              />
            </div>

            <div className="text-center pt-2">
              <SubmitButton>REGISTRAR</SubmitButton>
            </div>

            <LoginLink />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
