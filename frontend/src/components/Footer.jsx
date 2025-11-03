import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark mt-12">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">ElectroTech</h2>
          </div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-4">
            Tecnología de punta, estilo inigualable.
          </p>
        </div>
        
        <div className="col-span-1">
          <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Categorías</h3>
          <ul className="space-y-2">
            <li>
              <Link className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" to="/shop">
                Celulares
              </Link>
            </li>
            <li>
              <Link className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" to="/shop">
                Audífonos
              </Link>
            </li>
            <li>
              <Link className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" to="/shop">
                Accesorios
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Soporte</h3>
          <ul className="space-y-2">
            <li>
              <a className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" href="#contacto">
                Contacto
              </a>
            </li>
            <li>
              <a className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" href="#faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors" href="#devolucion">
                Política de Devolución
              </a>
            </li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h3 className="font-bold text-text-light dark:text-text-dark mb-4">Contacto</h3>
          <ul className="space-y-2">
            <li>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                contacto@electrotech.com
              </p>
            </li>
            <li>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                +1 (234) 567-890
              </p>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-border-light dark:border-border-dark py-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-col sm:flex-row justify-between items-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
          <p>© 2024 ElectroTech. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a className="hover:text-primary dark:hover:text-primary transition-colors" href="#fb">FB</a>
            <a className="hover:text-primary dark:hover:text-primary transition-colors" href="#ig">IG</a>
            <a className="hover:text-primary dark:hover:text-primary transition-colors" href="#tw">TW</a>
          </div>
        </div>
      </div>
    </footer>
  );
}