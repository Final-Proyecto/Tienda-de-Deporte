import { LightRays } from "@/components/ui/light-rays";

export default function PageInit() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Fondo con efectos de luz */}
      <div className="absolute inset-0">
        <LightRays variant="basketball" blur={40} speed={12} />
      </div>

      {/* Navbar Flotante Glassmorphic */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/30 py-3 px-6">
          <div className="flex items-center justify-between">
            {/* Logo y Nombre SPORTGLOW */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-red-500/50 transition-all duration-300">
                <span className="text-white font-bold text-xs">SG</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent group-hover:from-red-300 group-hover:to-orange-300 transition-all duration-300">
                SPORTGLOW
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {["Inicio", "Deportes", "Eventos", "Noticias", "Contacto"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-white/80 hover:text-white transition-all duration-300 font-medium text-sm px-3 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-lg border border-transparent hover:border-white/10"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            {/* CTA Button */}
            <button className="px-5 py-2 bg-gradient-to-r from-red-500/90 to-orange-500/90 backdrop-blur-lg border border-red-400/30 rounded-full text-white font-semibold hover:from-red-600 hover:to-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm">
              Únete Ahora
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eslogan */}
          <span className="text-xs font-semibold tracking-[0.35em] text-white/60 uppercase mb-4 block">
            Donde la Pasión Brilla
          </span>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            VIVE EL <span className="text-red-400">DEPORTE</span>
          </h1>

          {/* Descripción */}
          <p className="max-w-2xl mx-auto text-lg text-white/80 mb-8 leading-relaxed">
            Experimenta la emoción del deporte como nunca antes. Resultados en
            tiempo real, estadísticas avanzadas y una comunidad apasionada te
            esperan.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              🏆 Ver Eventos
            </button>
            <button className="px-8 py-3 bg-red-500/80 backdrop-blur-lg border border-red-400/50 rounded-full text-white font-semibold hover:bg-red-600/80 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              ⚡ Únete Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
