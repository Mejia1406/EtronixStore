import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ cartCount = 0 }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-3">
      <div className="flex items-center justify-between whitespace-nowrap max-w-screen-xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 text-text-light dark:text-text-dark">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Etronix</h2>
          </Link>
          <nav className="hidden lg:flex items-center gap-9">
            <Link className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors" to="/shop">Productos</Link>
            <a className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors" href="#promociones">Promociones</a>
            <a className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary transition-colors" href="#nosotros">Sobre Nosotros</a>
          </nav>
        </div>
        
        <div className="flex flex-1 justify-end items-center gap-4">
          <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-text-secondary-light dark:text-text-secondary-dark flex bg-border-light dark:bg-border-dark/50 items-center justify-center pl-3 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-border-light dark:bg-border-dark/50 focus:border-none h-full placeholder:text-text-secondary-light placeholder:dark:text-text-secondary-dark px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" 
                placeholder="Buscar..." 
              />
            </div>
          </label>
          
          <div className="flex gap-2">
            <button 
              onClick={toggleDarkMode}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-text-light dark:text-text-dark gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-text-light dark:text-text-dark gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:text-primary dark:hover:text-primary transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
            
            <Link 
              to="/shop"
              className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-text-light dark:text-text-dark gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}