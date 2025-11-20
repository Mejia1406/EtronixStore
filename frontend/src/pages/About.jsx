import { Helmet } from "react-helmet-async";
import logo from "../assets/logoEtronix.webp";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - Etronix Store | Tecnología y Accesorios en Colombia</title>
        <meta
          name="description"
          content="Conoce Etronix Store: más de 5 años distribuyendo accesorios tecnológicos premium en Colombia. Garantía extendida, envíos a todo el país y atención personalizada."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="sobre etronix, tienda tecnología colombia, accesorios celulares, quienes somos"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Sobre Nosotros - Etronix Store" />
        <meta
          property="og:description"
          content="Conoce nuestra historia y compromiso con la calidad en tecnología"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://etronix-store.com/about" />
        <meta property="og:image" content="https://etronix-store.com/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre Nosotros - Etronix Store" />
        <meta
          name="twitter:description"
          content="Conoce nuestra historia y compromiso con la calidad en tecnología"
        />
        <meta name="twitter:image" content="https://etronix-store.com/logo.png" />

        <link rel="canonical" href="https://etronix-store.com/about" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Etronix",
            url: "https://etronix-store.com/about",
            description:
              "Etronix es una tienda online especializada en accesorios y tecnología premium para celulares en Colombia. Ofrecemos garantía extendida, envíos rápidos y atención personalizada todos los días.",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+57-3207208410",
                contactType: "customer service",
                availableLanguage: ["Spanish"],
              },
            ],
            sameAs: ["https://instagram.com/Etronix2025"],
          })}
        </script>
      </Helmet>

      {/* Fondo general */}
      <div className="fixed inset-0 w-full h-full z-0 bg-linear-to-br from-gray-900 via-slate-900 to-black" />

      <section className="relative min-h-screen flex items-center justify-center z-10 py-16">
        <div className="max-w-3xl w-full mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 text-white">
          <h1 className="text-4xl font-black mb-6 text-cyan-400 drop-shadow-lg">Nosotros</h1>

          <p className="text-lg mb-4 text-gray-200">
            En <span className="font-black text-cyan-400">Etronix</span> nos especializamos en accesorios premium
            para celulares. Nuestro enfoque es ofrecer productos de alta calidad con una experiencia de compra clara,
            rápida y confiable.
          </p>

          <p className="text-lg mb-4 text-gray-200">
            Operamos 100% online, con envíos a toda Colombia y soporte cercano por WhatsApp. Trabajamos con marcas
            confiables y garantizamos todos nuestros productos.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-cyan-200 text-base mb-6">
            <li>
              Garantías entre <span className="font-bold text-cyan-300">3 y 12 meses</span> según producto
            </li>
            <li>
              Pagos seguros a través de <span className="font-bold text-cyan-300">Mercado Pago</span>
            </li>
            <li>
              Atención rápida por <span className="font-bold text-cyan-300">WhatsApp</span>
            </li>
          </ul>

          <div className="flex items-center gap-2 mt-6">
            <img
              src={logo}
              alt="Logo Etronix"
              className="w-18 h-18 rounded-full shadow-lg border-2 border-cyan-400"
            />
            <div>
              <p className="text-cyan-300 font-black text-lg">+5 años de experiencia</p>
              <p className="text-gray-300 text-sm">Distribuyendo tecnología y confianza en Colombia</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
