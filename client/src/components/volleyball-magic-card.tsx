import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description: string;
  linkText: string;
  href: string;
  icon: React.ReactNode;
}

const VolleyballBall = ({ className }: { className?: string }) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("text-red-500", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a10 10 0 0 1 7.37 3.37L12 12V2z"></path>
    <path d="M12 2v10l7.37 7.37A10 10 0 0 0 12 2z"></path>
    <path d="M12 2a10 10 0 0 0-7.37 3.37L12 12V2z"></path>
  </svg>
);

export function VolleyballGlassCard({
  title,
  description,
  linkText,
  href,
  icon,
}: CardProps) {
  // Colores esmeralda y naranja para el gradiente
  const emerald_orange_gradient =
    "linear-gradient(135deg, rgba(52, 211, 163, 0.4) 0%, rgba(251, 146, 60, 0.4) 100%)";

  return (
    <div className="relative w-full max-w-sm h-full group transition-all duration-500">
      {/* Capa de Borde con Gradiente Esmeralda/Naranja y Sombra */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: emerald_orange_gradient,
          filter: "blur(10px)",
          zIndex: 0,
          boxShadow: "0 0 20px rgba(52, 211, 163, 0.5)", // Sombra esmeralda
        }}
      />

      {/* Contenido Principal con Efecto Glassmórfico */}
      <div
        className="relative flex flex-col gap-4 p-6 rounded-xl h-full border border-white/20 
                       bg-white/5 backdrop-blur-lg overflow-hidden transition-all duration-300 transform 
                       group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-white/40"
        style={{
          // Color de fondo muy sutil y borroso para el efecto vidrioso
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          zIndex: 1,
        }}
      >
        <div className="flex items-start gap-3">
          {icon}
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-orange-300">
            {title}
          </h3>
        </div>

        <p className="text-white/80 text-base leading-relaxed flex-grow">
          {description}
        </p>

        <a
          href={href}
          className="mt-4 text-sm font-semibold text-emerald-300 hover:text-orange-400 transition-colors flex items-center gap-1"
        >
          {linkText} &rarr;
        </a>
      </div>
    </div>
  );
}
