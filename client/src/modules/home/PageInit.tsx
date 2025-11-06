import { LightRays } from "@/common/components/ui/light-rays";
import { Globe } from "@/common/components/ui/globe";
import { useState } from "react";
import { Link } from "react-router-dom";
import cintaDedo from "@/common/public/cinta-dedo.png";
import inflador from "@/common/public/inflador.png";
import mangas from "@/common/public/mangas.png";
import pelotaVoley from "@/common/public/pelota-de-voley.png";
import redVoley from "@/common/public/red-voley.png";
import remera from "@/common/public/remera.png";
import rodillera from "@/common/public/rodillera.png";
import zapatillas from "@/common/public/zapatilla.png";

export default function PageInit() {
  const [currentPage, setCurrentPage] = useState("inicio");

  // Contenido de cada página
  const renderPageContent = () => {
    switch (currentPage) {
      case "tienda":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              🏐 Tienda de Vóley
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Cinta Dedos",
                  price: "$15.000",
                  image: cintaDedo, // Sin llaves
                  desc: "Protección para dedos",
                },
                {
                  name: "Inflador",
                  price: "$8.000",
                  image: inflador, // Usar la variable importada
                  desc: "Inflador portátil",
                },
                {
                  name: "Mangas Protectoras",
                  price: "$25.000",
                  image: mangas,
                  desc: "Mangas deportivas",
                },
                {
                  name: "Pelota de Vóley",
                  price: "$45.000",
                  image: pelotaVoley,
                  desc: "Pelota profesional",
                },
                {
                  name: "Red de Vóley",
                  price: "$85.000",
                  image: redVoley,
                  desc: "Red oficial FIVB",
                },
                {
                  name: "Remera",
                  price: "$30.000",
                  image: remera,
                  desc: "Remera deportiva",
                },
                {
                  name: "Rodilleras",
                  price: "$35.000",
                  image: rodillera,
                  desc: "Protección para rodillas",
                },
                {
                  name: "Zapatillas",
                  price: "$120.000",
                  image: zapatillas,
                  desc: "Zapatillas profesionales",
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group shadow-xl"
                >
                  <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{product.desc}</p>
                  <p className="text-orange-400 font-bold text-2xl mb-4">
                    {product.price}
                  </p>
                  <button className="w-full bg-gradient-to-r from-red-500/80 to-orange-500/80 backdrop-blur-lg border border-red-400/30 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 hover:scale-105 transition-all duration-300 shadow-lg">
                    Agregar al Carrito
                  </button>

                  {/* Mensaje de inicio de sesión */}
                  <p className="text-white/50 text-xs text-center mt-3">
                    💡 Para comprar necesitas iniciar sesión
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "sobre-nosotros":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Sobre Nosotros
            </h2>
          </div>
        );

      default:
        return (
          <div className="text-center md:text-left space-y-8">
            <h2 className="text-4xl lg:text-7xl font-extrabold text-white mb-4 leading-tight">
              Bienvenido a{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                SPORTGLOW
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-lg md:max-w-none mx-auto md:mx-0">
              Conectamos el deporte de todo el mundo en una sola experiencia
              interactiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <button
                onClick={() => setCurrentPage("tienda")}
                className="px-8 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🏆 Ver Eventos
              </button>
              <button
                onClick={() => setCurrentPage("tienda")}
                className="px-8 py-3 bg-gradient-to-r from-red-500/80 to-orange-500/80 backdrop-blur-lg border border-red-400/50 rounded-full text-white font-semibold hover:from-red-600/80 hover:to-orange-600/80 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🛒 Ir a Tienda
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <LightRays variant="basketball" blur={40} speed={12} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/30 py-3 px-6">
          <div className="flex items-center justify-between">
            {/* Logo y Nombre SPORTGLOW */}
            <div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => setCurrentPage("inicio")}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-red-500/50 transition-all duration-300">
                <span className="text-white font-bold text-xs">SG</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent group-hover:from-red-300 group-hover:to-orange-300 transition-all duration-300">
                SPORTGLOW
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {[
                { name: "Inicio", page: "inicio" },
                { name: "Tienda", page: "tienda" },
                { name: "Sobre Nosotros", page: "sobre-nosotros" },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`${
                    currentPage === item.page
                      ? "text-white bg-white/20 border-white/20"
                      : "text-white/80 hover:text-white border-transparent"
                  } transition-all duration-300 font-medium text-sm px-3 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-lg border`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Botones de Auth y CTA */}
            <div className="flex items-center space-x-3">
              {/* Iniciar Sesión */}
              <Link
                to="/login"
                className="px-4 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium text-sm hover:bg-white/10 hover:backdrop-blur-lg border border-transparent hover:border-white/10 rounded-lg"
              >
                Iniciar Sesión
              </Link>

              {/* Registrarse */}
              <Link
                to="/registro"
                className="px-4 py-2 bg-gradient-to-r from-red-500/90 to-orange-500/90 backdrop-blur-lg border border-red-400/30 rounded-full text-white font-semibold hover:from-red-600 hover:to-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 pt-32 md:pt-16">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Columna Izquierda: Contenido Dinámico */}
            <div
              className={`${
                currentPage === "inicio" ? "order-2 md:order-1" : "col-span-2"
              }`}
            >
              {renderPageContent()}
            </div>

            {/* Columna Derecha: Globo 3D (solo en inicio) */}
            {currentPage === "inicio" && (
              <div className="w-full max-w-[600px] mx-auto order-1 md:order-2">
                <Globe />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
