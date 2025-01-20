import React, {useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/HomePrincipal.css";

const HomePrincipal = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Login
  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    // Poner fecha actual
    const today = new Date();

    const formattedDate = today
      .toLocaleDateString('es-ES')
      .split('/').reverse().join('-');
    document.getElementById("arrival_date").value = formattedDate;

    // detectar scroll
    const handleScroll = () => {
      if (window.scrollY > 50) { // Si se ha desplazado más de 50px, cambia el color
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Añadir el evento scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };


  }, []);

  return (
  <div className="relative min-h-screen">
    <div class="absolute inset-0 opacity-50 z-0 background-image">
        <img src="/src/assets/img/pruebaCanva.jpg" alt="Background Image" class="object-cover object-center w-full h-full" />
    </div>

    <header
        className={`bg-transparent shadow-lg py-5 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-indigo-500" : "bg-transparent"
        }`}>


      <div class="container mx-auto flex items-center justify-between px-4 h-10">
        <a href="#" class="flex items-center text-primary hover:text-secondary">
          <img rel="icon" src="/src/assets/img/serpienteMorada.ico" alt="Icono" class="w-8 h-8"/> 
          <span class="text-3xl font-bold ml-2 The_Last_Shuriken_leter">DH Lucosiar</span>
        </a>
        <div class="md:hidden">
          <button id="menu-toggle"
                        class="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
          </button>
        </div>

        <nav class="hidden md:block">
          <ul class="flex items-center space-x-8 h-10">
            <li><a href="#" class="hover:text-primary transition-colors duration-300 text-xl">Habitaciones</a></li>
            <li><a href="#" class="hover:text-primary transition-colors duration-300 text-xl">Sobre Nosotros</a></li>
            
            <li><a href="#" class="hover:text-primary transition-colors duration-300 text-xl">Contacto</a></li>
            <li>
              <button onClick={handleLogin} 
              class={`text-white border border-gray-300 px-4 py-1 text-xl cursor-pointer rounded-md hover:bg-orange-600 transition-colors duration-600 ${
                isScrolled ? "bg-orange-500 border-orange-500" : "bg-transparent"
              }`}>
                  Iniciar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="home-main">
      <div class="relative z-10 text-container first-section">
        <h1 class="text-4xl font-bold text-white The_Last_Shuriken_leter">Bienvenido</h1>
        <h2 class="text-2xl text-white">Descubre la excelencia en cada detalle</h2>
        <p class="text-5xl text-white font-p-grande">DH Hotel es uno de los hoteles más lujosos en Asturias. Ofrecemos una buena relación calidad precio, con una buena variedad de habitaciones, comidas, servicios adicionales, y las mejores comodidades a disposición de nuestros clientes.</p>   
      </div>

      <div class="seach-room relative z-10">
        <div class="table-seach-room">
          <p class="text-black">Fecha de llegada</p>
          <p class="text-black">Fecha de salida</p>
          <p class="text-black">Adultos</p>

          
          <input type="date" placeholder="Fecha de llegada" id="arrival_date"/>
          <input type="date" placeholder="Fecha de salida"/>
          <input type="number" placeholder="Adultos" id="adults" min="1" max="8"/>
        </div>  
        <button class="bg-orange-400">Buscar</button>
      </div>

      <div class="info-hotel bg-indigo-400 z-10">
        <h1 class="The_Last_Shuriken_leter">
          Bienvenido a nuestro hotel
        </h1>
        <div class="flex items-center justify-center space-x-6 mb-5">
          <img src="/src/assets/img/pruebaCanva.jpg" alt="Hotel" class="w-1/4 rounded-lg"/>
          <p class="text-black max-w-md">DH Es un hotel familiar que desea atender y ofrecer a sus huéspedes una hospitalidad personalizada basada en lo que ellos prefieren. Aunque nuestro objetivo es ofrecerle una experiencia auténtica siempre que se aloje con nosotros, también garantizamos un alto nivel de comodidad y servicios para que puedan disfrutar de sus vacaciones. Nuestro equipo está comprometido con la calidad de nuestra atención y nos esforzamos por ofrecer una experiencia única y personalizada para cada cliente. Nos esforzamos por ofrecer un servicio de calidad que nos ayude a disfrutar de sus vacaciones.</p>
        </div>
      </div>

      <div class="type-rooms z-10 bg-indigo-300">
        <h1 class="The_Last_Shuriken_leter">Habitaciones & Suites</h1>
        <p>Nuestro hotel tiene una variedad de habitaciones en las que podrás disfrutar de tus vacaciones. Cada habitación tiene su precio y dispone de diferentes servicios y comodidades para que puedas disfrutar de tus vacaciones.</p>
        <div class="type-rooms-container flex rounded-lg mb-4">
          
          <div class="room-container relative">
            <div class="button-overlay">
              <button class="reserve-button">Reservar</button>
            </div>
            <img src="/src/assets/img/habitacion_simple_2camas.jpg" alt="room" class="size-image_room"/>
            <h3 class="text-center mt-2">Habitación simple</h3>
            <h4 class="text-center">Desde 11€\noche</h4>
          </div>

          <div class="room-container relative">
            <img src="/src/assets/img/habitacion_doble.jpg" alt="room" class="size-image_room"/>
            <div class="button-overlay">
              <button class="reserve-button">Reservar</button>
            </div>
            <h3>Habitación doble</h3>
            <h4>Desde 22€\noche</h4>
          </div>

          <div class="room-container relative">
            <img src="/src/assets/img/habitacion_suite.jpg" alt="room" class="size-image_room"/>
            <div class="button-overlay">
              <button class="reserve-button">Reservar</button>
            </div>
            <h3>Habitación suite</h3>
            <h4>Desde 33€\noche</h4>
          </div>
        </div>
      </div>

      <div class="book-now relative z-10 bg-indigo-400">
        <h1 class="The_Last_Shuriken_leter">Reserva ahora</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg border-2 border-indigo-300 bg-indigo-300 p-6 mb-10">
          <div class="book-now-container space-y-4">
            <div class="flex gap-4 items-center mt-5">
              <input 
                class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                type="text" 
                placeholder="Nombre" 
              />
              <select 
                class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
              >
                <option value="">Tipo de habitación</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div>
              <input 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                type="text" 
                placeholder="Email" 
              />
            </div>
            <div>
              <textarea 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                placeholder="Mensaje"
              ></textarea>
            </div>
            <div class="text-center">
              <button 
                class="w-full bg-orange-400 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-500"
              >
                Enviar propuesta
              </button>
              <p class="text-black text-sm mt-2 mb-4">
                Nos pondremos en contacto con usted lo antes posible
              </p>
            </div>
          </div>
          <div class="contact-info space-y-6 rounded-lg border-2 border-indigo-400 bg-indigo-400 p-6">
            <p class="text-black text-xl font-semibold "> Contact Information</p>
            <p class="text-sm max-w-xs break-words">Contacta con nosotros usando el formulario de contacto o contactanos por teléfono o correo.</p>
            <div class="flex items-center">
              <img 
                src="/src/assets/img/email.png" alt="phone" class="w-6 h-6 mr-2">
              </img>
              <p>example@example.com</p>
            </div>
            <div class="flex items-center">
              <img 
                src="/src/assets/img/llamar.png" alt="phone" class="w-6 h-6 mr-2">
              </img>
              <p>+34 666 66 66 66</p>
            </div>
            <div class="flex items-center">
              <img 
                src="/src/assets/img/ubicacion.png" alt="phone" class="w-6 h-6 mr-2">
              </img>
              <p>España</p>
            </div>
          </div>
        </div>
      </div>

      <div class="about-us relative z-10 bg-indigo-300">
        <h1 class="The_Last_Shuriken_leter">Sobre nosotros</h1>
        <ul class="flex justify-center gap-6 mb-4">
          <li>
            <a 
              href="https://www.linkedin.com/in/lucia-cosio-artime-c16012022" 
              target="_blank" 
              class="text-white hover:underline font-semibold"
            >
              <img 
                src="/src/assets/img/linkedin.png" 
                alt="LinkedIn" 
                class="w-10 h-10"
              />
            </a>
          </li>
          <li>
            <a 
              href="https://www.kaggle.com/lcosioa" 
              target="_blank" 
              class="text-white hover:underline font-semibold"
            >
              <img 
                src="/src/assets/img/kaggle_icon.png" 
                alt="Kaggle" 
                class="w-10 h-10"
              />
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/Lucosiar" 
              target="_blank" 
              class="text-white hover:underline font-semibold"
            >
              <img 
                src="/src/assets/img/github.png" 
                alt="GitHub" 
                class="w-10 h-10"
              />
            </a>
          </li>
        </ul>
        <p class="text-lg text-black flex mb-4 px-3">Esta página web ha sido creada por Lucía. El back está hecho con Django y el front con React con Vite y TailwindCSS. Está página web funciona como landing page pero en caso de tener el back es una página totalmente funcional para gestionar un hotel. Puedes reservar habitaciones, ver las ofertas, contactar con nosotros y más. Para más información de la programadora están los enlaces directos junto con el portfolio en caso de querer ver más proyectos.</p>


      </div>
      <div class="about-us relative z-10 bg-indigo-400">
        <h1 class="The_Last_Shuriken_leter">DH Lucosiar</h1>
        <div class="menu_footer">
          <ul class="flex justify-center gap-6 list-none p-0 mb-4">
            <li>
              Inicio
            </li>
            <li>
              Habitaciones
            </li>
            <li>
              Reservar
            </li>
            <li>
              Sobre nosotros
            </li>
          </ul>

          <div class="flex justify-center mb-5">
            <div class="grid grid-cols-2 w-1xl gap-10"> 
              <div class="resources-container">
                <h2 class="mb-6 text-sm font-semibold text-black uppercase">Resources</h2>
                <ul class="text-black font-medium">
                  <li class="mb-4">
                    <a href="https://flowbite.com/" class="hover:underline">Flowbite</a>
                  </li>
                  <li class="mb-4">
                    <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                  </li>
                  <li>
                    <a href="https://www.djangoproject.com/" class="hover:underline">Django</a>
                  </li>
                </ul>
              </div>

              <div class="resources-container">
                <h2 class="mb-6 text-sm font-semibold text-black uppercase">Follow me</h2>
                <ul class="text-black font-medium">
                  <li class="mb-4">
                    <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                  </li>
                  <li class="mb-4">
                    <a href="www.linkedin.com/in/lucia-cosio-artime-c16012022" class="hover:underline">Linkedin</a>
                  </li>
                  <li>
                    <a href="https://www.kaggle.com/lcosioa" class="hover:underline">Kaggle</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default HomePrincipal;
