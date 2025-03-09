import React, {useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/HomePrincipal.css";

const HomePrincipal = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

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
      if (window.scrollY > 50) {
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
    <div className="absolute inset-0 opacity-50 z-0 background-image">
        <img src="/src/assets/img/pruebaCanva.jpg" alt="Background Image" className="object-cover object-center w-full h-full" />
    </div>

    <header className={
      `sticky top-0 w-full flex justify-between items-center p-4 z-50 transition-all duration-300 ${
        isScrolled ? "bg-indigo-500" : "bg-transparent"
      }`}>
      <div>
        <a href="#" className="flex items-center ml-2">
          <img
            rel="icon"
            src="/src/assets/img/serpienteMorada.ico"
            alt="Logo"
            className="h-10 w-10 ml-2"
          />
          <span className="text-3xl font-bold ml-2 mt-2 The_Last_Shuriken_leter">DH Lucosiar</span>
        </a>
      </div>
      <nav className="flex space-x-4 mr-4">
        <ul className="flex items-center space-x-8 h-10">
          <li><a href="#rooms" className="hover:text-primary transition-colors duration-300 text-xl">Habitaciones</a></li>
          <li><a href="#contact" className="hover:text-primary transition-colors duration-300 text-xl">Reservas</a></li>
          <li><a href="#contact" className="hover:text-primary transition-colors duration-300 text-xl">Contacto</a></li>
          <li>
            <button onClick={handleLogin} 
            className={`text-white border border-gray-300 px-4 py-1 text-xl cursor-pointer rounded-md hover:bg-orange-600 transition-colors duration-600 ${
            isScrolled ? "bg-indigo-800 border-indigo-800" : "bg-transparent"
            }`}>
              Iniciar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>

    <main className="home-main">
      <section id="home-principal">
        <div className="relative z-10 text-container first-section">
          <h1 className="text-4xl font-bold The_Last_Shuriken_leter">Bienvenido</h1>
          <h2 className="text-2xl">Descubre la excelencia en cada detalle</h2>
          <p className="text-5xl font-p-grande">DH Hotel es uno de los hoteles más lujosos en Asturias. Ofrecemos una buena relación calidad precio, con una buena variedad de habitaciones, comidas, servicios adicionales, y las mejores comodidades a disposición de nuestros clientes.</p>   
        </div>

        <div className="seach-room relative z-10">
          <div className="table-seach-room">
            <p className="text-black">Fecha de llegada</p>
            <p className="text-black">Fecha de salida</p>
            <p className="text-black">Adultos</p>

            
            <input 
              type="date"
              placeholder="Fecha de llegada" 
              id="arrival_date"
              min={new Date().toISOString().split("T")[0]}/>
            <input 
              type="date"
              placeholder="Fecha de salida" 
              id="departure_date"
              min={new Date().toISOString().split("T")[0]}/>
            <input 
              type="number" 
              placeholder="Adultos" 
              id="adults" 
              min="1" max="8"/>
          </div>  
          <button className="bg-indigo-700">Buscar</button>
        </div>
      </section>

      

      <div className="info-hotel bg-indigo-400 z-10">
        <h1 className="The_Last_Shuriken_leter">
          Bienvenido a nuestro hotel
        </h1>
        <div className="flex items-center justify-center space-x-6 mb-7">
          <img src="/src/assets/img/pruebaCanva.jpg" alt="Hotel" className="w-1/4 rounded-lg"/>
          <p className="text-black max-w-md">DH Es un hotel familiar que desea atender y ofrecer a sus huéspedes una hospitalidad personalizada. Aunque nuestro objetivo es ofrecerle una experiencia auténtica siempre que se aloje con nosotros, también garantizamos un alto nivel de comodidad y servicios para que puedan disfrutar de sus vacaciones. Nuestro equipo está comprometido con la calidad de nuestra atención. Nos esforzamos por ofrecer un servicio de calidad que nos ayude a disfrutar de sus vacaciones.</p>
        </div>
        <div>
          <h3 className="The_Last_Shuriken_leter mb-4">Para que disfrutes cada momento a nuestro lado te queremos ofrecer lo mejor.</h3>
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="flex flex-col items-center text-center">
                <img src="/src/assets/img/bandeja.png" alt="room" className="w-12 h-12  mt-4 mb-5"/>
                <p>Servicio de habitaciones</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <img src="/src/assets/img/restaurante.png" alt="room" className="w-12 h-12 mt-4 mb-5"/>
                <p>Cafetería y restaurante</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <img src="/src/assets/img/24horas.png" alt="room" className="w-12 h-12 mt-4 mb-5"/>
                <p>Recepción 24h</p>
            </div>
          </div>
        </div>
      </div>

      <section id="rooms" className="type-rooms z-10 bg-indigo-300">
        <h1 className="The_Last_Shuriken_leter">Habitaciones & Suites</h1>
        <p>Nuestro hotel tiene una variedad de habitaciones en las que podrás disfrutar de tus vacaciones. Cada habitación tiene su precio y dispone de diferentes servicios y comodidades para que puedas disfrutar de tus vacaciones.</p>
        <div className="type-rooms-container flex rounded-lg mb-4">
          
          <div className="room-container relative">
            <div className="button-overlay">
              <button className="reserve-button">Reservar</button>
            </div>
            <img src="/src/assets/img/habitacion_simple_2camas.jpg" alt="room" className="size-image_room"/>
            <h3 className="text-center mt-2">Habitación simple</h3>
            <h4 className="text-center">Desde 11€\noche</h4>
          </div>

          <div className="room-container relative">
            <img src="/src/assets/img/habitacion_doble.jpg" alt="room" className="size-image_room"/>
            <div className="button-overlay">
              <button className="reserve-button">Reservar</button>
            </div>
            <h3>Habitación doble</h3>
            <h4>Desde 22€\noche</h4>
          </div>

          <div className="room-container relative">
            <img src="/src/assets/img/habitacion_suite.jpg" alt="room" className="size-image_room"/>
            <div className="button-overlay">
              <button className="reserve-button">Reservar</button>
            </div>
            <h3>Habitación suite</h3>
            <h4>Desde 33€\noche</h4>
          </div>
        </div>
      </section>

      <section id="contact" className="book-now relative z-10 bg-indigo-400">
        <h1 className="The_Last_Shuriken_leter">Reserva ahora</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg border-2 border-indigo-300 bg-indigo-300 p-6 mb-10">
          <div className="book-now-container space-y-4">
            <div className="flex gap-4 items-center mt-5">
              <input 
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                type="text" 
                placeholder="Nombre" 
              />
              <select 
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
              >
                <option value="">Tipo de habitación</option>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div>
              <input 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                type="text" 
                placeholder="Email" 
              />
            </div>
            <div>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                placeholder="Mensaje"
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                className="w-full bg-indigo-700 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-500"
              >
                Enviar propuesta
              </button>
              <p className="text-black text-sm mt-2 mb-4">
                Nos pondremos en contacto con usted lo antes posible
              </p>
            </div>
          </div>
          <div className="contact-info space-y-6 rounded-lg border-2 border-indigo-400 bg-indigo-400 p-6">
            <p className="text-black text-xl font-semibold ">Información de contacto</p>
            <p className="text-sm max-w-xs break-words">Contacta con nosotros usando el formulario o contactanos por teléfono o correo.</p>
            <div className="flex items-center">
              <img 
                src="/src/assets/img/email.png" alt="phone" className="w-6 h-6 mr-2">
              </img>
              <p>example@example.com</p>
            </div>
            <div className="flex items-center">
              <img 
                src="/src/assets/img/llamar.png" alt="phone" className="w-6 h-6 mr-2">
              </img>
              <p>+34 666 66 66 66</p>
            </div>
            <div className="flex items-center">
              <img 
                src="/src/assets/img/ubicacion.png" alt="phone" className="w-6 h-6 mr-2">
              </img>
              <p>España</p>
            </div>
          </div>
        </div>
      </section>


 {/* 
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
      </div>*/}


      <div className="about-us relative z-10 bg-indigo-300">
        <h1 className="The_Last_Shuriken_leter">DH Lucosiar</h1>
        <div className="menu_footer">
          <ul className="flex justify-center gap-6 list-none p-0 mb-4 text-gray-800">
            <li><a href="#home-principal" className="hover:text-primary transition-colors duration-300">Inicio</a></li>
            <li><a href="#rooms" className="hover:text-primary transition-colors duration-300 ">Habitaciones</a></li>
            <li><a href="#" className="hover:text-primary transition-colors duration-300">Reservas</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors duration-300">Contacto</a></li>
          </ul>

          <div className="flex justify-center mb-5">
            <div className="grid grid-cols-2 w-1xl gap-10"> 
              <div className="resources-container">
                <h2 className="mb-6 text-sm font-semibold text-black uppercase">Resources</h2>
                <ul className="text-gray-800 font-medium">
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                  </li>
                  <li className="mb-4">
                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                  </li>
                  <li>
                    <a href="https://www.djangoproject.com/" className="hover:underline">Django</a>
                  </li>
                </ul>
              </div>

              <div className="resources-container">
                <h2 className="mb-6 text-sm font-semibold text-black uppercase">Follow me</h2>
                <ul className="text-gray-800 font-medium">
                  <li className="mb-4">
                    <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                  </li>
                  <li className="mb-4">
                    <a href="www.linkedin.com/in/lucia-cosio-artime-c16012022" className="hover:underline">Linkedin</a>
                  </li>
                  <li>
                    <a href="https://www.kaggle.com/lcosioa" className="hover:underline">Kaggle</a>
                  </li>
                </ul>
              </div>              
            </div>

          </div>
          <p className="text-sm mt-4 mb-2">
              &copy; 2025 Lucosiar&reg; - Todos los derechos reservados
          </p>
        </div>
      </div>
    </main>
  </div>
  );
};

export default HomePrincipal;
