import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate(); 

  // Detectar si el usuario ha hecho scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 w-full flex justify-between items-center p-4 z-50 transition-all duration-300 ${
        isScrolled ? "bg-indigo-500" : "bg-transparent"
      }`}
    >
      <div>
        <a href="#" className="flex items-center ml-2">
          <img
            rel="icon"
            src="/img/serpienteMorada.ico"
            alt="Logo"
            className="h-10 w-10 ml-2"
          />
          <span className="text-3xl font-bold ml-2 mt-2 The_Last_Shuriken_leter">
            DH Lucosiar
          </span>
        </a>
      </div>
      <nav className="flex space-x-4 mr-4">
        <ul className="flex items-center space-x-8 h-10">
          <li>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 text-xl"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#rooms"
              className="hover:text-primary transition-colors duration-300 text-xl"
            >
              Habitaciones
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-primary transition-colors duration-300 text-xl"
            >
              Reservas
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-primary transition-colors duration-300 text-xl"
            >
              Contacto
            </a>
          </li>
          <li>
            <button
              onClick={handleLogin}
              className={`text-white border border-gray-300 px-4 py-1 text-xl cursor-pointer rounded-md hover:bg-orange-600 transition-colors duration-600 ${
                isScrolled ? "bg-indigo-800 border-indigo-800" : "bg-transparent"
              }`}
            >
              Iniciar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
