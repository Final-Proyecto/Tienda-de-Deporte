import { LightRays } from "@/components/ui/light-rays";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Definición de tipos
interface LoginFormData {
  correoElectronico: string;
  contraseña: string;
}

export default function LoginPages() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
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

    try {
      const { loginUser } = await import('../api/loginAPI');
      
      await loginUser(formData);

      toast.success('¡Sesión iniciada correctamente!');
      setFormData({
        correoElectronico: "",
        contraseña: ""
      });
      
      setTimeout(() => {
        navigate('/home');
      }, 1000);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleGoToRegister = () => {
    navigate('/registro');
  };

  const handleForgotPassword = () => {
    toast.info('Recuperar Contraseña', {
      description: 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
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
          {/* Tarjeta de Login con fondo transparente */}
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
                Bienvenido de Nuevo
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Inicia <span className="text-red-400">Sesión</span>
              </h2>
              <p className="text-white/70 text-sm">
                Accede a tu cuenta para continuar con la experiencia
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
              </div>

              {/* Recordar contraseña */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={isLoading}
                    className="w-4 h-4 bg-white/5 border border-white/20 rounded focus:ring-red-500 focus:ring-2 disabled:opacity-50"
                  />
                  <span className="ml-2 text-white/70 text-sm">Recordar sesión</span>
                </label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-red-400 hover:text-red-300 text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ¿Olvidaste tu contraseña?
                </button>
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
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <span>Iniciar Sesión</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Pie de formulario */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                ¿No tienes una cuenta?{" "}
                <button 
                  type="button"
                  onClick={handleGoToRegister}
                  disabled={isLoading}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}