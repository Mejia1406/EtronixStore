import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - Etronix Store | Tecnología y Accesorios en Colombia</title>
        <meta name="description" content="Conoce Etronix Store: más de 5 años distribuyendo accesorios tecnológicos premium en Colombia. Garantía extendida, envíos a todo el país y atención personalizada." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="sobre etronix, tienda tecnología colombia, accesorios celulares, quienes somos" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sobre Nosotros - Etronix Store" />
        <meta property="og:description" content="Conoce nuestra historia y compromiso con la calidad en tecnología" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://etronix-store.com/about" />
        <meta property="og:image" content="https://etronix-store.com/logo.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre Nosotros - Etronix Store" />
        <meta name="twitter:description" content="Conoce nuestra historia y compromiso con la calidad en tecnología" />
        <meta name="twitter:image" content="https://etronix-store.com/logo.png" />
        
        <link rel="canonical" href="https://etronix-store.com/about" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Etronix",
            "url": "https://etronix-store.com/about",
            "description": "Etronix es una tienda online especializada en accesorios y tecnología premium para celulares en Colombia. Ofrecemos garantía extendida, envíos rápidos y atención personalizada todos los días.",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+57-3207208410",
              "contactType": "customer service",
              "availableLanguage": ["Spanish"]
            }],
            "sameAs": [
              "https://instagram.com/Etronix2025"
            ]
          })}
        </script>
      </Helmet>
      
      <section className="py-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Nosotros</h1>
          <p className="text-gray-600 mb-4">
            En Etronix nos especializamos en accesorios premium para celulares. Nuestro enfoque es
            ofrecer productos de alta calidad con una experiencia de compra clara, rápida y confiable.
          </p>
          <p className="text-gray-600 mb-4">
            Operamos 100% online, con envíos a toda Colombia y soporte cercano por WhatsApp.
            Trabajamos con marcas confiables y garantizamos todos nuestros productos.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Garantías entre 3 y 12 meses según producto</li>
            <li>Pagos seguros a través de Mercado Pago</li>
            <li>Atención rápida por WhatsApp</li>
          </ul>
        </div>
      </section>
    </>
  );
}