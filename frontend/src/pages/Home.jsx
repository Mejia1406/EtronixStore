import { Link } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
const FAQ = lazy(() => import("../components/FAQ"));

// Usa tu imagen de héroe real (mockup del celular). Si no tienes aún, temporalmente usa el logo
import hero from "../assets/LogoEtronixBordesRedondos.svg";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await res.json();
        setFeaturedProducts(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Etiquetas tipo template (si tu API trae tags/flags, cámbialo a product.tag)
  const badges = ["BEST", "NEW", "SALE", "HOT", "NEW"];

  return (
    <>
      <Helmet>
        <title>Etronix Store – Accesorios para celulares y tecnología | Tienda Online Colombia</title>
        <meta name="description" content="Accesorios para celulares en Colombia: audífonos, cargadores, cables y más. Envío gratis desde $100.000. Garantía extendida y pago seguro." />
        <meta name="keywords" content="accesorios celulares, audífonos, cargadores, cables, protectores, fundas, tecnología Colombia, tienda online" />
        <meta property="og:title" content="Etronix Store – Accesorios Tecnológicos Premium en Colombia" />
        <meta property="og:description" content="Accesorios para celulares con envío a toda Colombia. Garantía extendida, pago seguro y soporte 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://etronix-store.com/" />
        <meta property="og:image" content="https://etronix-store.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Etronix Store – Accesorios para celulares" />
        <meta name="twitter:description" content="Audífonos, cargadores, cables y más con garantía extendida" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Etronix Store",
            url: "https://etronix-store.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://etronix-store.com/shop?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
        <link rel="canonical" href="https://etronix-store.com/" />
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* ---------- HERO (estilo referencia: texto izq, imagen der) ---------- */}
        <section className="relative">
          {/* fondo limpio con ligera sombra superior */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Texto */}
              <div className="order-2 lg:order-1">
                <p className="text-[12px] tracking-[0.2em] font-semibold text-slate-500 uppercase">
                  Renovar
                </p>
                <h1 className="mt-3 text-4xl lg:text-6xl font-black leading-[1.05] text-[#1A1A1A]">
                  Actualiza tu{" "}
                  <span className="text-[#0056D2]">mundo móvil</span>
                </h1>
                <p className="mt-4 text-slate-600 text-lg max-w-xl">
                  Calidad real, envíos rápidos y pagos seguros. Celulares, cargadores, cables y más para tu día a día.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md bg-[#007BFF] hover:bg-[#006AE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#007BFF]"
                  >
                    Explorar ahora
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>

                  <Link
                    to="/offers"
                    className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm transition-all hover:-translate-y-0.5 border border-slate-200 text-[#1A1A1A] bg-white hover:bg-slate-50"
                  >
                    Ver ofertas
                  </Link>
                </div>
              </div>

              {/* Imagen producto / mockup */}
              <div className="order-1 lg:order-2">
                <div className="relative">
                  {/* “pedestal” minimal */}
                  <div className="absolute -inset-x-6 -bottom-8 h-40 bg-white/80 rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] -z-10" />
                  <img
                    src={hero}
                    alt="Hero Etronix"
                    className="w-full h-auto rounded-[1.25rem] object-contain"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FEATURED STRIP (fila de tarjetas al estilo referencia) ---------- */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[12px] tracking-[0.2em] font-semibold text-slate-500 uppercase">
                  Destacados
                </p>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1A1A1A]">
                  Lo mejor para empezar
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden md:inline-flex text-sm font-semibold text-[#0056D2] hover:underline"
              >
                Ver todo
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                    <div className="aspect-[4/5] bg-slate-100 rounded-xl mb-3" />
                    <div className="h-4 w-3/4 bg-slate-100 rounded mb-2" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {featuredProducts.map((p, idx) => (
                  <article
                    key={p._id || idx}
                    className="group relative rounded-2xl bg-white border border-slate-200 p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)] transition-all"
                  >
                    {/* badge */}
                    <span
                      className={`
                        absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide text-white
                        ${badges[idx % badges.length] === "SALE" ? "bg-[#FF4D4F]" : badges[idx % badges.length] === "NEW" ? "bg-[#00B578]" : badges[idx % badges.length] === "HOT" ? "bg-[#FF8A00]" : "bg-[#0056D2]"}
                      `}
                    >
                      {badges[idx % badges.length]}
                    </span>

                    <Link to={`/products/${p._id}`} className="block">
                      <div className="aspect-[4/5] rounded-xl bg-slate-50 overflow-hidden mb-3">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#1A1A1A] line-clamp-1">{p.title}</h3>
                      <p className="mt-1 text-[13px] text-slate-500 line-clamp-2 min-h-[34px]">
                        {p.description || "Producto de alta calidad con garantía."}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[17px] font-extrabold text-[#007BFF]">
                          {typeof p.price === "number" ? `$${p.price.toLocaleString("es-CO")}` : "—"}
                        </span>
                        <span className="text-xs text-slate-500">Ver más →</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------- BENEFICIOS (línea limpia, 4 columnas) ---------- */}
        <section className="py-16 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: "Garantía 12 meses", d: "Cobertura real en Colombia" },
                { t: "Pago seguro", d: "Mercado Pago, PSE, tarjetas" },
                { t: "Entrega rápida", d: "Envíos a todo el país" },
                { t: "Soporte humano", d: "WhatsApp cuando lo necesites" },
              ].map((b, i) => (
                <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm">
                  <p className="text-[15px] font-extrabold text-[#1A1A1A]">{b.t}</p>
                  <p className="mt-1 text-sm text-slate-500">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </main>
    </>
  );
}
