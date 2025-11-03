import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    {
      name: "Celulares",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
    },
    {
      name: "Audífonos",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      name: "Cargadores",
      image: "https://images.unsplash.com/photo-1591290619762-99aa4b43c597?w=400&h=400&fit=crop"
    },
    {
      name: "Accesorios",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "IPhone 13",
      description: "El smartphone que redefine la velocidad y la elegancia.",
      price: 7999999,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Audifonos",
      description: "Sonido de alta fidelidad con comodidad superior para todo el día.",
      price: 150000,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Cargador Portatil",
      description: "Carga rápida y portátil para mantener tus dispositivos siempre activos.",
      price: 150000,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={0} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full h-screen overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url(https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1920&h=1080&fit=crop)`
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">
                Audio Inmersivo, Diseño Inigualable
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white/90">
                Descubre la nueva generación de audífonos con cancelación de ruido activa.
              </p>
              <Link
                to="/shop"
                className="mt-8 inline-flex mx-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
              >
                <span className="truncate">Ver Promoción</span>
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className="max-w-screen-xl mx-auto flex flex-col gap-12 md:gap-16">
            <section>
              <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] text-center mb-8">
                Nuestras Categorías
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {categories.map((category, index) => (
                  <Link 
                    key={index}
                    to="/shop" 
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-square">
                      <div 
                        className="bg-cover bg-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${category.image})` }}
                      />
                    </div>
                    <h3 className="mt-4 text-center text-base sm:text-lg font-bold text-text-light dark:text-text-dark">
                      {category.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section>
              <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] text-center mb-8">
                Productos Destacados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {featuredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="flex flex-col rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark overflow-hidden group"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <div 
                        className="bg-cover bg-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-text-light dark:text-text-dark text-lg font-bold">
                        {product.name}
                      </h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-1 flex-1">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-text-light dark:text-text-dark text-lg font-bold">
                          ${product.price.toLocaleString("es-CO")}
                        </p>
                        <Link
                          to="/shop"
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                        >
                          <span className="truncate">Comprar</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}