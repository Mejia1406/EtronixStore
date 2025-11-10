import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";

export default function Sidebar({ open = false, onClose }) {
  const [productsOpen, setProductsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const panelRef = useRef(null);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Cerrar si cambia de ruta
  useEffect(() => {
    if (open) onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const goToCategory = (catId) => {
    const params = new URLSearchParams(location.search);
    if (catId === "all") {
      params.delete("cat");
    } else {
      params.set("cat", catId);
    }
    navigate(`/shop?${params.toString()}`);
    onClose?.();
  };

  const itemBase =
    "group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40";
  const itemInactive =
      "text-slate-700 hover:text-indigo-700 hover:bg-indigo-50"; // <- hover claro para TODOS
  const itemActive =
    "text-slate-900 bg-transparent after:absolute after:left-0 after:top-2 after:bottom-2 after:w-[3px] after:rounded-full after:bg-gradient-to-b after:from-indigo-500 after:via-emerald-500 after:to-pink-500";


  return (
    <>
      {/* Overlay con blur */}
      <div
        className={`
          fixed inset-0 z-[48] transition-opacity duration-300
          ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
        `}
        aria-hidden="true"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm" />
      </div>

      {/* Contenedor con borde degradado */}
      <aside
        className={`
          fixed top-0 left-0 z-[49] h-screen w-[22rem] max-w-[92vw]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Menú lateral"
        role="dialog"
        aria-modal="true"
      >
        {/* Borde degradado */}
        <div className="h-full p-[2px] bg-gradient-to-b from-indigo-500 via-emerald-500 to-pink-500 rounded-r-2xl shadow-2xl">
          {/* Panel interior glass */}
          <div
            ref={panelRef}
            className="flex h-full flex-col rounded-r-2xl bg-white/90 backdrop-blur-xl"
          >
            {/* Header del panel */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/60">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 via-emerald-100 to-pink-100">
                  <span className="material-symbols-outlined text-[20px] text-indigo-600">menu</span>
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Menú
                  </p>
                  <h2 className="text-base font-extrabold bg-gradient-to-r from-indigo-600 via-emerald-600 to-pink-600 bg-clip-text text-transparent">
                    Navegación rápida
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-colors"
                aria-label="Cerrar menú"
              >
                <span className="material-symbols-outlined text-[22px] text-slate-600">close</span>
              </button>
            </div>

            {/* Scroll area */}
            <nav className="flex-1 overflow-y-auto scroll-smooth">
              <div className="px-5 py-6 space-y-8">
                {/* Bloque: Navegación */}
                <section>
                  <HeaderLabel title="Navegación" />
                  <ul className="mt-3 space-y-2">
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `${itemBase} ${isActive ? itemActive : itemInactive}`
                        }
                      >
                        <IconDot activeClass="from-indigo-600 via-emerald-600 to-pink-600" />
                        <span className="material-symbols-outlined text-xl">home</span>
                        <span>Inicio</span>
                      </NavLink>
                    </li>

                    <li className="space-y-2">
                      {/* Botón principal productos */}
                      <button
                        onClick={() => setProductsOpen((s) => !s)}
                        className={`${itemBase} w-full justify-between ${
                          location.pathname.startsWith("/shop") ? itemActive : itemInactive
                        }`}
                        aria-expanded={productsOpen}
                        aria-controls="menu-products"
                      >
                        <span className="flex items-center gap-3">
                          <IconDot activeClass="from-indigo-600 via-emerald-600 to-pink-600" />
                          <span className="material-symbols-outlined text-xl">storefront</span>
                          <span>Productos</span>
                        </span>
                        <span
                          className={`material-symbols-outlined text-lg transition-transform ${
                            productsOpen ? "rotate-180" : ""
                          }`}
                        >
                          expand_more
                        </span>
                      </button>

                      {/* Submenú con colapso suave */}
                      <div
                        id="menu-products"
                        className={`
                          overflow-hidden transition-[grid-template-rows,opacity] duration-300
                          ${productsOpen ? "opacity-100" : "opacity-0"}
                        `}
                        style={{
                          display: "grid",
                          gridTemplateRows: productsOpen ? "1fr" : "0fr",
                        }}
                      >
                        <ul className="min-h-0 pl-3">
                          <li className="mt-2">
                            <button
                              onClick={() => goToCategory("all")}
                              className={`${itemBase} ${itemInactive} w-full justify-start text-[13px]`}
                            >
                              <span className="material-symbols-outlined text-[18px] text-slate-500">
                                apps
                              </span>
                              Todos los productos
                            </button>
                          </li>
                          {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                            <li key={cat.id}>
                              <button
                                onClick={() => goToCategory(cat.id)}
                                className={`${itemBase} ${itemInactive} w-full justify-start text-[13px]`}
                              >
                                <span className="mr-1">{cat.icon}</span>
                                {cat.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>

                    <li>
                      <NavLink
                        to="/faq"
                        className={({ isActive }) =>
                          `${itemBase} ${isActive ? itemActive : itemInactive}`
                        }
                      >
                        <IconDot activeClass="from-indigo-600 via-emerald-600 to-pink-600" />
                        <span className="material-symbols-outlined text-xl">live_help</span>
                        <span>Preguntas Frecuentes</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/about"
                        className={({ isActive }) =>
                          `${itemBase} ${isActive ? itemActive : itemInactive}`
                        }
                      >
                        <IconDot activeClass="from-indigo-600 via-emerald-600 to-pink-600" />
                        <span className="material-symbols-outlined text-xl">info</span>
                        <span>Nosotros</span>
                      </NavLink>
                    </li>
                  </ul>
                </section>

                {/* Línea decorativa */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* Bloque: Atajos útiles */}
                <section>
                  <HeaderLabel title="Atajos útiles" />
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <QuickLink
                      to="/support"
                      icon="support_agent"
                      label="Soporte"
                      gradient="from-emerald-500 to-sky-500"
                    />
                  </div>
                </section>
              </div>
            </nav>

            {/* Footer pequeño con CTA */}
            <div className="px-5 py-4 border-t border-white/60">
              <div className="rounded-xl p-[1px] bg-gradient-to-r from-indigo-500 via-emerald-500 to-pink-500">
                <a
                  href="https://wa.me/573207208410"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                      <span className="material-symbols-outlined text-[20px] text-emerald-600">chat</span>
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-slate-900">¿Necesitas ayuda?</p>
                      <p className="text-[11px] font-semibold tracking-wide text-slate-500">
                        WhatsApp disponible
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-slate-500">north_east</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------- Subcomponentes ---------- */

function HeaderLabel({ title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 via-emerald-500 to-pink-500" />
      <p className="text-xs uppercase tracking-wider text-slate-500 font-extrabold">{title}</p>
    </div>
  );
}

function IconDot({ activeClass = "from-indigo-600 via-emerald-600 to-pink-600" }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid place-items-center overflow-hidden rounded-full h-2.5 w-2.5`}
    >
      <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${activeClass} opacity-80`} />
      <span className="relative h-1.5 w-1.5 rounded-full bg-white/90" />
    </span>
  );
}

function QuickLink({ to, icon, label, gradient = "from-indigo-500 to-pink-500" }) {
  return (
    <Link
      to={to}
      className={`
        group rounded-xl p-[1px] bg-gradient-to-r ${gradient}
        transition-all hover:-translate-y-0.5 hover:shadow-lg
      `}
    >
      <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
          <span className="material-symbols-outlined text-[20px] text-slate-700">{icon}</span>
        </span>
        <span className="text-sm font-bold text-slate-900">{label}</span>
      </div>
    </Link>
  );
}
