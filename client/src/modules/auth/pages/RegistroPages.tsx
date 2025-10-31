import { LightRays } from "@/components/ui/light-rays";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Definición de tipos
interface FormData {
  nombreCompleto: string;
  correoElectronico: string;
  contraseña: string;
}

export default function RegistroPages() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nombreCompleto: "",
    correoElectronico: "",
    contraseña: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    // Validación de contraseña
    if (formData.contraseña.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      // Importar SOLO la función de registro del API específico
      const { registerUser } = await import('../api/registroAPI');
      
      // Llamar a la función de registro
      await registerUser(formData);

      // Éxito
      toast.success(`¡Cuenta creada exitosamente! Bienvenido ${formData.nombreCompleto}`);
      setFormData({
        nombreCompleto: "",
        correoElectronico: "",
        contraseña: ""
      });
      
      // Redirigir después de un breve delay
      setTimeout(() => {
        navigate('/home');
      }, 1000);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleShowTerms = () => {
    toast.info('Términos de Servicio', {
      description: 'Al registrarte aceptas nuestros términos y condiciones de uso.',
      duration: 4000,
    });
  };

  const handleShowPrivacy = () => {
    toast.info('Política de Privacidad', {
      description: 'Tu información personal está protegida según nuestra política de privacidad.',
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Fondo con efectos de luz */}
      <div className="absolute inset-0">
        <LightRays variant="basketball" blur={40} speed={12} />
      </div>

      {/* Botón de volver al inicio */}
      <button 
        onClick={handleBackToHome}
        disabled={isLoading}
        className="fixed top-6 left-6 z-50 px-5 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al Inicio
      </button>

      {/* Contenido Principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto">
          {/* Tarjeta de Registro con fondo transparente */}
          <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/50 p-8 md:p-10">
            
            {/* Encabezado */}
            <div className="text-center mb-8">
              {/* Logo SPORTGLOW */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SG</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  SPORTGLOW
                </h1>
              </div>

              <span className="text-xs font-semibold tracking-[0.35em] text-white/60 uppercase mb-2 block">
                Únete a la Comunidad
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Crea tu <span className="text-red-400">Cuenta</span>
              </h2>
              <p className="text-white/70 text-sm">
                Completa tus datos para acceder a todas las funcionalidades
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo Nombre Completo */}
              <div className="relative">
                <label htmlFor="nombreCompleto" className="block text-white/80 text-sm font-medium mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="nombreCompleto"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
              </div>

              {/* Campo Correo Electrónico */}
              <div className="relative">
                <label htmlFor="correoElectronico" className="block text-white/80 text-sm font-medium mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="correoElectronico"
                    name="correoElectronico"
                    value={formData.correoElectronico}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="relative">
                <label htmlFor="contraseña" className="block text-white/80 text-sm font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              {/* Botón de Envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-red-500/90 to-orange-500/90 backdrop-blur-lg border border-red-400/30 rounded-xl text-white font-semibold hover:from-red-600 hover:to-orange-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creando cuenta...</span>
                    </>
                  ) : (
                    <>
                      <span>Crear Cuenta</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Pie de formulario */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                ¿Ya tienes una cuenta?{" "}
                <button 
                  type="button"
                  onClick={handleGoToLogin}
                  disabled={isLoading}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Inicia Sesión
                </button>
              </p>
            </div>

            {/* Términos y condiciones */}
            <div className="mt-4 text-center">
              <p className="text-white/40 text-xs">
                Al registrarte, aceptas nuestros{" "}
                <button 
                  type="button" 
                  onClick={handleShowTerms}
                  disabled={isLoading}
                  className="text-white/60 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Términos de Servicio
                </button>{" "}
                y{" "}
                <button 
                  type="button" 
                  onClick={handleShowPrivacy}
                  disabled={isLoading}
                  className="text-white/60 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Política de Privacidad
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}