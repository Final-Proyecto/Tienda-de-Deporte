import { LightRays } from "@/common/components/ui/light-rays";
import { Globe } from "@/common/components/ui/globe";
import { useState, useEffect } from "react";
import { logout, getProfile } from "@/modules/user/api/UserAPI";
import { buyProduct } from "@/modules/shop/api/ShopAPI";
import { toast } from "sonner";

import cintaDedo from "@/common/public/cinta-dedo.png";
import inflador from "@/common/public/inflador.png";
import mangas from "@/common/public/mangas.png";
import pelotaVoley from "@/common/public/pelota-de-voley.png";
import redVoley from "@/common/public/red-voley.png";
import remera from "@/common/public/remera.png";
import rodillera from "@/common/public/rodillera.png";
import zapatillas from "@/common/public/zapatilla.png";

interface ProductData {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt?: string;
}
interface UserProduct {
  productId: ProductData;
  _id: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
  products: UserProduct[];
  createdAt: string;
}

type CartItem = ProductData & { qty: number };
type Step = "cart" | "payment" | "confirm" | null;
type Payment = "tarjeta" | "transferencia" | "mercadopago" | null;

export default function HomePages() {
  const [currentPage, setCurrentPage] = useState("inicio");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [buyingProduct, setBuyingProduct] = useState<string | null>(null);

  // Carrito
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<Step>(null);
  const [paymentMethod, setPaymentMethod] = useState<Payment>(null);

  // Productos disponibles en la tienda
  const storeProducts: ProductData[] = [
    {
      name: "Cinta Dedos",
      price: 15000,
      image: cintaDedo,
      description: "Protección para dedos",
    },
    {
      name: "Inflador",
      price: 8000,
      image: inflador,
      description: "Inflador portátil",
    },
    {
      name: "Mangas Protectoras",
      price: 25000,
      image: mangas,
      description: "Mangas deportivas",
    },
    {
      name: "Pelota de Vóley",
      price: 45000,
      image: pelotaVoley,
      description: "Pelota profesional",
    },
    {
      name: "Red de Vóley",
      price: 85000,
      image: redVoley,
      description: "Red oficial FIVB",
    },
    {
      name: "Remera",
      price: 30000,
      image: remera,
      description: "Remera deportiva",
    },
    {
      name: "Rodilleras",
      price: 35000,
      image: rodillera,
      description: "Protección para rodillas",
    },
    {
      name: "Zapatillas",
      price: 120000,
      image: zapatillas,
      description: "Zapatillas profesionales",
    },
  ];

  // Cargar datos al montar
  useEffect(() => {
    loadUserData();
    const raw = localStorage.getItem("cart");
    if (raw) setCart(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const loadUserData = async () => {
    try {
      const userData = await getProfile();
      setUser(userData);
    } catch (error) {
      toast.error("No se pudo cargar el usuario");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast("Sesión cerrada", { description: "Volvé cuando quieras." });
  };

  const handleBuyProduct = async (product: ProductData) => {
    if (!user) {
      toast.error("Iniciá sesión para comprar");
      return;
    }
    setBuyingProduct(product.name);
    try {
      await buyProduct(user._id, {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      });
      toast.success("Compra realizada", {
        description: `${product.name} fue agregado a tus productos`,
      });
      await loadUserData();
    } catch (error: any) {
      toast.error("Error al comprar", {
        description: error?.message || "Intentalo de nuevo",
      });
    } finally {
      setBuyingProduct(null);
    }
  };

  // Carrito helpers
  const addToCart = (p: ProductData) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.name === p.name);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        toast("Cantidad actualizada", {
          description: `${p.name} x${copy[idx].qty}`,
        });
        return copy;
      }
      toast.success("Agregado al carrito", { description: p.name });
      return [...prev, { ...p, qty: 1 }];
    });
  };
  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((i) => i.name !== name));
    toast("Producto eliminado", { description: name });
  };
  const changeQty = (name: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };
  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleConfirmPurchase = async () => {
    if (!user || cart.length === 0 || !paymentMethod) {
      toast.error("Faltan datos para confirmar");
      return;
    }
    setBuyingProduct("bulk");
    try {
      for (const item of cart) {
        for (let k = 0; k < item.qty; k++) {
          await buyProduct(user._id, {
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
          });
        }
      }
      toast.success("Compra confirmada", {
        description: `Método: ${paymentMethod} • Total: ${formatPrice(
          cartTotal
        )}`,
      });
      setCart([]);
      setCheckoutStep(null);
      await loadUserData();
    } catch (e: any) {
      toast.error("Error en el checkout", {
        description: e?.message || "Intentá nuevamente",
      });
    } finally {
      setBuyingProduct(null);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);

  // Modal genérico
  function Modal({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="relative bg-gray-900/90 border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
          {children}
        </div>
      </div>
    );
  }

  const CheckoutModal = () => {
    if (!checkoutStep) return null;
    return (
      <Modal onClose={() => setCheckoutStep(null)}>
        {checkoutStep === "cart" && (
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">
              Carrito ({cartCount} ítems)
            </h3>
            {cart.length === 0 ? (
              <p className="text-white/70">Tu carrito está vacío.</p>
            ) : (
              <div className="space-y-3">
                {cart.map((i) => (
                  <div
                    key={i.name}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={i.image}
                        alt={i.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{i.name}</p>
                        <p className="text-white/60 text-sm">
                          {formatPrice(i.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(i.name, -1)}
                        className="px-2 py-1 bg-white/10 rounded"
                      >
                        -
                      </button>
                      <span className="text-white">{i.qty}</span>
                      <button
                        onClick={() => changeQty(i.name, +1)}
                        className="px-2 py-1 bg-white/10 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(i.name)}
                        className="ml-2 px-3 py-1 bg-red-500/30 rounded text-white"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <p className="text-white text-lg font-bold">
                Total: {formatPrice(cartTotal)}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCheckoutStep(null)}
                  className="px-4 py-2 bg-white/10 rounded-lg text-white"
                >
                  Seguir comprando
                </button>
                <button
                  disabled={cart.length === 0}
                  onClick={() => setCheckoutStep("payment")}
                  className="px-4 py-2 bg-gradient-to-r from-red-500/80 to-orange-500/80 rounded-lg text-white disabled:opacity-50"
                >
                  Elegir pago
                </button>
              </div>
            </div>
          </div>
        )}

        {checkoutStep === "payment" && (
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Método de pago</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: "tarjeta", label: "💳 Tarjeta" },
                { key: "transferencia", label: "🏦 Transferencia" },
                { key: "mercadopago", label: "💙 Mercado Pago" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setPaymentMethod(opt.key as Payment)}
                  className={`p-3 rounded-xl border ${
                    paymentMethod === opt.key
                      ? "bg-white/20 border-white/40"
                      : "bg-white/10 border-white/20"
                  } text-white`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setCheckoutStep("cart")}
                className="px-4 py-2 bg-white/10 rounded-lg text-white"
              >
                Volver
              </button>
              <button
                disabled={!paymentMethod}
                onClick={() => setCheckoutStep("confirm")}
                className="px-4 py-2 bg-gradient-to-r from-red-500/80 to-orange-500/80 rounded-lg text-white disabled:opacity-50"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {checkoutStep === "confirm" && (
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Confirmación</h3>
            <p className="text-white/80">
              Total a pagar:{" "}
              <span className="font-semibold">{formatPrice(cartTotal)}</span>
            </p>
            <p className="text-white/80">
              Método: <span className="font-semibold">{paymentMethod}</span>
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setCheckoutStep("payment")}
                className="px-4 py-2 bg-white/10 rounded-lg text-white"
              >
                Volver
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="px-4 py-2 bg-green-500/80 hover:bg-green-600 rounded-lg text-white"
              >
                Confirmar compra
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

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
              {storeProducts.map((product, index) => (
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
                  <p className="text-white/60 text-sm mb-3">
                    {product.description}
                  </p>
                  <p className="text-orange-400 font-bold text-2xl mb-4">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-white/15 border border-white/25 text-white py-3 rounded-xl font-semibold hover:bg白/25 transition-all"
                    >
                      ➕ Agregar
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product);
                        setCheckoutStep("cart");
                      }}
                      className="flex-1 bg-gradient-to-r from-red-500/80 to-orange-500/80 border border-red-400/30 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all"
                    >
                      🛒 Ir al carrito
                    </button>
                  </div>
                  <button
                    onClick={() => handleBuyProduct(product)}
                    disabled={buyingProduct === product.name}
                    className="mt-3 w-full bg-white/10 border border-white/20 text-white py-2 rounded-lg hover:bg-white/20 transition-all disabled:opacity-50"
                  >
                    {buyingProduct === product.name
                      ? "⏳ Comprando..."
                      : "Comprar uno ahora"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "mis-productos":
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white text-center md:text-left">
              🎒 Mis Productos
            </h2>
            {!user?.products || user.products.length === 0 ? (
              <div className="text-center py-16 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-white/70 text-xl mb-4">
                  Aún no has comprado ningún producto
                </p>
                <button
                  onClick={() => setCurrentPage("tienda")}
                  className="px-6 py-3 bg-gradient-to-r from-red-500/80 to-orange-500/80 backdrop-blur-lg border border-red-400/30 rounded-full text-white font-semibold hover:from-red-600 hover:to-orange-600 hover:scale-105 transition-all duration-300"
                >
                  Ir a la Tienda
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.products.map((item) => {
                  const product = item.productId;
                  return (
                    <div
                      key={item._id}
                      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
                    >
                      <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">
                        {product.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-3">
                        {product.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-green-400 font-bold text-xl">
                          ✓ Comprado - {formatPrice(product.price)}
                        </p>
                        <p className="text-white/40 text-xs">
                          Fecha:{" "}
                          {new Date(
                            product.createdAt || Date.now()
                          ).toLocaleDateString("es-AR")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case "sobre-nosotros":
        return (
          <div className="space-y-6 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              SPORTGLOW es tu tienda deportiva de confianza. Nos especializamos
              en productos de voleibol de alta calidad para jugadores de todos
              los niveles.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Nuestra misión es conectar el deporte de todo el mundo en una sola
              experiencia interactiva, ofreciendo los mejores productos al mejor
              precio.
            </p>
          </div>
        );

      default:
        return (
          <div className="text-center md:text-left space-y-8">
            <div className="mb-6">
              <p className="text-white/60 text-lg mb-2">¡Hola! 👋</p>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                Bienvenido,{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  {user?.name || "Usuario"}
                </span>
              </h2>
            </div>
            <p className="text-white/70 text-lg max-w-lg md:max-w-none mx-auto md:mx-0">
              Explora nuestra tienda y encuentra los mejores productos
              deportivos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <button
                onClick={() => setCurrentPage("tienda")}
                className="px-8 py-3 bg-gradient-to-r from-red-500/80 to-orange-500/80 backdrop-blur-lg border border-red-400/50 rounded-full text-white font-semibold hover:from-red-600/80 hover:to-orange-600/80 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🛒 Ir a Tienda
              </button>
              <button
                onClick={() => setCurrentPage("mis-productos")}
                className="px-8 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🎒 Mis Productos ({user?.products?.length || 0})
              </button>
              <button
                onClick={() => setCheckoutStep("cart")}
                className="px-8 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300"
              >
                🧾 Ver Carrito ({cartCount})
              </button>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🏐</div>
          <div className="text-white text-2xl">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <LightRays variant="basketball" blur={40} speed={12} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/30 py-3 px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
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
                { name: "Mis Productos", page: "mis-productos" },
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

              {/* Carrito en nav */}
              <button
                onClick={() => setCheckoutStep("cart")}
                className="relative text-white/80 hover:text-white border-transparent transition-all font-medium text-sm px-3 py-2 rounded-lg hover:bg-white/10 border"
              >
                🛒 Carrito{" "}
                <span className="ml-1 text-white/70">({cartCount})</span>
              </button>
            </div>

            {/* Logout */}
            <div className="flex items-center space-x-3">
              <span className="text-white/60 text-sm hidden lg:block">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 backdrop-blur-lg border border-red-400/30 rounded-full text-white font-semibold hover:bg-red-500/30 hover:scale-105 transition-all duration-300 text-sm"
              >
                Cerrar Sesión
              </button>
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

      {/* Checkout modal */}
      {checkoutStep && <CheckoutModal />}
    </div>
  );
}
