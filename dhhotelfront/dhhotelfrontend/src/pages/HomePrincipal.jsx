import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/HomePrincipal.css";

const HomePrincipal = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
       
    <header class="bg-red-500 shadow-lg py-5 sticky top-0 z-50">
    <div class="container mx-auto flex items-center justify-between px-4 h-10">
      <a href="#" class="flex items-center text-primary hover:text-secondary">
        <img rel="icon" src="/src/assets/img/serpienteMorada.ico" alt="Icono" class="w-8 h-8"/> 
        <span class="text-3xl font-bold ml-2">DeHaro Hotel</span>
      </a>
      <div class="md:hidden">
        <button id="menu-toggle"
                      class="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                  </svg>
        </button>
      </div>

      <nav class="hidden md:block">
        <ul class="flex items-center space-x-8 h-10">
        <li class="group relative">
            <a href="#" class="bg-red-500 hover:text-primary transition-colors duration-300 text-xl">Habitaciones</a>
            <ul
              class="absolute left-0 hidden group-hover:block bg-red-500 shadow-md py-2 mt-1 rounded-md w-48 transition-all duration-300">
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Simple</a></li>
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Doble</a></li>
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Suites</a></li>
            </ul>
          </li>
          <li><a href="#" class="hover:text-primary transition-colors duration-300 text-xl">Sobre Nosotros</a></li>
          
          <li><a href="#" class="hover:text-primary transition-colors duration-300 text-xl">Contacto</a></li>
          <li>
            <button onClick={handleLogin} class="bg-[#faa307] text-white border-none px-8 py-4 text-lg cursor-pointer rounded-md hover:bg-orange-600 transition-colors duration-300">
                Iniciar Sesión
            </button>
          </li>
        </ul>
      </nav>
  </div>

  <nav id="mobile-menu"
    class="hidden md:hidden bg-gray-50 border-t border-gray-200 transition-height duration-300 ease-in-out">
    <ul class="px-4 py-2">
      <li><a href="#" class="block py-2 hover:text-primary">Home</a></li>
      <li><a href="#" class="block py-2 hover:text-primary">About</a></li>
      <li>
        <a href="#" id="services-dropdown-toggle" class="block py-2 hover:text-primary">Services</a>
        <ul id="services-dropdown" class="hidden pl-4">
          <li><a href="#" class="block py-2 hover:text-primary">Service 1</a></li>
          <li><a href="#" class="block py-2 hover:text-primary">Service 2</a></li>
          <li><a href="#" class="block py-2 hover:text-primary">Service 3</a></li>
        </ul>
      </li>
      <li><a href="#" class="block py-2 hover:text-primary">Contact</a></li>
      <li><a href="#"
          class="block py-2 bg-primary hover:bg-secondary text-white rounded-md text-center transition-colors duration-300">Get
          Started</a></li>
    </ul>
  </nav>
</header>

        <main className="home-main">
            <div className="hero">
            <h2>Descubre la excelencia en cada detalle</h2>
            <img src="/src/assets/img/portada.jpg" alt="Icono"/> 
            <p>Tu estadía perfecta te espera en nuestro hotel.</p>
            
            </div>
        </main>

        <footer className="home-footer" id="contact">
            <p>Hotel Paraíso &copy; 2024</p>
            <p>Contacto: contacto@hotelparaiso.com</p>
            </footer>
        
    </div>
  );
};

export default HomePrincipal;
