# 🎨 SPORTGLOW - Guía de Estilos y Colores

## 🌈 Paleta de Colores

### **Fondos Principales**

```css
/* Gradiente principal de fondo */
bg-gradient-to-br from-gray-900 via-black to-gray-800

/* Equivalentes en CSS plano */
background: linear-gradient(135deg, #111827 0%, #000000 50%, #1f2937 100%);
```

### **Colores Glassmorphism**

```css
/* Navbar y elementos flotantes */
bg-white/10                    /* rgba(255, 255, 255, 0.1) */
backdrop-blur-2xl              /* Efecto de desenfoque intenso */
border border-white/20         /* rgba(255, 255, 255, 0.2) */

/* Efectos hover */
hover:bg-white/15              /* rgba(255, 255, 255, 0.15) */
hover:border-white/30          /* rgba(255, 255, 255, 0.3) */
```

### **Colores Deportivos - Gradientes**

```css
/* Logo SPORTGLOW */
from-red-500 to-orange-500     /* #ef4444 to #f97316 */
from-red-400 to-orange-400     /* #f87171 to #fb923c */

/* Botones principales */
from-red-500/90 to-orange-500/90    /* Con 90% de opacidad */
```

### **Colores de Texto**

```css
/* Texto principal */
text-white                     /* #ffffff */
text-white/80                  /* rgba(255, 255, 255, 0.8) */
text-white/60                  /* rgba(255, 255, 255, 0.6) */
text-white/50                  /* rgba(255, 255, 255, 0.5) */

/* Texto con gradiente */
bg-gradient-to-r from-red-400 to-orange-400
bg-clip-text text-transparent
```

## 🎯 Estilo Glassmorphism

### **Principios de Diseño**

```css
/* Fórmula base para glassmorphism */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 16px;
```

### **Niveles de Transparencia**

```css
/* Nivel 1 - Sutil (fondos) */
bg-white/5 to bg-white/10

/* Nivel 2 - Medio (tarjetas) */
bg-white/10 to bg-white/15

/* Nivel 3 - Intenso (botones) */
bg-white/15 to bg-white/20
```

### **Efectos de Sombra**

```css
/* Sombras para profundidad */
shadow-lg                      /* Sombra media */
shadow-xl                      /* Sombra grande */
shadow-2xl                     /* Sombra extra grande */
shadow-black/30                /* Sombra negra al 30% */

/* Sombras de acento */
shadow-red-500/25              /* Sombra roja para efectos */
shadow-red-500/30              /* Sombra roja más intensa */
```

## ⚡ Efectos y Animaciones

### **Transiciones**

```css
/* Transiciones base */
transition-all duration-300

/* Efectos hover */
hover:scale-105                /* Escala 105% */
hover:bg-white/25              /* Aumenta transparencia */
hover:shadow-lg                /* Aumenta sombra */
```

### **Efectos Específicos**

```css
/* Logo hover */
group-hover:scale-110
group-hover:shadow-red-500/50

/* Botones CTA */
hover:from-red-600
hover:to-orange-600
hover:scale-105
```

## 🎨 LightRays Personalizados

### **Variantes de Color para Deportes**

```javascript
// Fútbol - Naranja energético
variant = "football"; // rgba(255, 140, 0, 0.25)

// Baloncesto - Rojo vibrante
variant = "basketball"; // rgba(255, 60, 60, 0.3)

// Deportes Extremos - Amarillo eléctrico
variant = "extreme"; // rgba(255, 220, 0, 0.2)

// Default - Azul original
variant = "default"; // rgba(160, 210, 255, 0.2)
```

### **Configuración LightRays**

```javascript
// Configuración recomendada
<LightRays variant="basketball" blur={40} speed={12} count={7} />
```

## 📱 Responsive Design

### **Breakpoints Utilizados**

```css
/* Mobile First */
min-h-screen                   /* Altura completa */
p-6                           /* Padding general */

/* Tablet (md) */
md:text-7xl                   /* Texto más grande */
md:flex-row                   /* Flex en fila */
md:grid-cols-3                /* Grid de 3 columnas */

/* Desktop (lg) */
max-w-4xl mx-auto             /* Contenedor centrado */
```

## 🚀 Clases de Utilidad Tailwind

### **Posicionamiento**

```css
relative z-10                 /* Contenido principal */
fixed z-50                    /* Elementos fijos (navbar) */
absolute inset-0              /* Elementos de fondo */
```

### **Tipografía**

```css
text-xs tracking-[0.35em]     /* Texto pequeño con tracking */
text-5xl md:text-7xl          /* Escalado responsive */
font-bold                     /* Peso de fuente */
leading-relaxed               /* Interlineado */
```

### **Efectos Visuales**

```css
mix-blend-screen              /* Mezcla de capas */
backdrop-blur-lg              /* Desenfoque glassmorphism */
bg-clip-text                  /* Gradiente en texto */
```

---

## 💡 Uso Recomendado

### **Para mantener la consistencia:**

1. **Siempre usar gradientes** para fondos principales
2. **Aplicar glassmorphism** en elementos interactivos
3. **Utilizar las transparencias** definidas en la paleta
4. **Mantener las animaciones** suaves y coherentes

### **Ejemplo de Componente:**

```tsx
<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/15">
  {/* Contenido */}
</div>
```

Esta guía asegura que SPORTGLOW mantenga una identidad visual coherente y moderna en toda la aplicación. 🎨✨
