import React, {useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/HomePrincipal.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const HomePrincipal = () => {

  const [phonePrefixes, setPhonePrefixes] = useState([]);

  const navigate = useNavigate();

  // Rooms
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);

  // Formulario reserva
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonePrefix: "+34",
    phone: "",
    message: "",
  });

  const parseCSV = (csvData) => {
    const rows = csvData.split("\n").slice(1);
    return rows.map(row => {
      const [code, country] = row.split(",");
      return { code, country };
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/prefixesPhone.csv");
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      setPhonePrefixes(parsedData);
    } catch (error) {
      console.error("Error cargando prefijos:", error);
    }
  };

  // Rooms
  const handleArrivalDateChange = (e) => {
    const newArrivalDate = e.target.value;
    setArrivalDate(newArrivalDate);

    // Establecer el valor mínimo de la fecha de salida
    const departureDateInput = document.getElementById('departure_date');
    departureDateInput.min = newArrivalDate;

    // Si la fecha de salida es anterior a la fecha de llegada, la resetamos
    if (departureDateInput.value < newArrivalDate) {
      setDepartureDate(""); // También actualizamos el estado de la fecha de salida
    }
  };

  const handleDepartureDateChange = (e) => setDepartureDate(e.target.value);
  const handleAdultsChange = (e) => setAdults(e.target.value);

  const handleSearch = () => {
    navigate("/search_room", {
      state: {arrivalDate, departureDate, adults},
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {

    //CargarCSV
    fetchData();

    // Poner fecha actual
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString('es-ES')
      .split('/').reverse().join('-');
    document.getElementById("arrival_date").value = formattedDate;

  }, []);

  return (
  <div className="min-h-screen flex flex-col">
    <div className="absolute left-0 w-full h-full opacity-50 z-0">
      <img 
        src="/img/pruebaCanva.jpg" 
        alt="Background" 
        className="w-full h-full object-cover object-center"
      />
    </div>

    
    <Header />

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
              min={new Date().toISOString().split("T")[0]}
              onChange={handleArrivalDateChange}
              />
            <input 
              type="date"
              placeholder="Fecha de salida" 
              id="departure_date"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleDepartureDateChange}
              />
            <input 
              type="number" 
              placeholder="Adultos" 
              id="adults" 
              min="1" max="8"
              onChange={handleAdultsChange}
              />
          </div>  
          <button className="bg-indigo-700" onClick={handleSearch}>Buscar</button>
        </div>
      </section>

      

      <div className="info-hotel bg-indigo-400 z-10">
        <h1 className="The_Last_Shuriken_leter">
          Bienvenido a nuestro hotel
        </h1>
        <div className="flex items-center justify-center space-x-6 mb-7">
          <img src="/img/pruebaCanva.jpg" alt="Hotel" className="w-1/4 rounded-lg"/>
          <p className="text-black max-w-md">DH Es un hotel familiar que desea atender y ofrecer a sus huéspedes una hospitalidad personalizada. Aunque nuestro objetivo es ofrecerle una experiencia auténtica siempre que se aloje con nosotros, también garantizamos un alto nivel de comodidad y servicios para que puedan disfrutar de sus vacaciones. Nuestro equipo está comprometido con la calidad de nuestra atención. Nos esforzamos por ofrecer un servicio de calidad que nos ayude a disfrutar de sus vacaciones.</p>
        </div>
        <div>
          <h3 className="The_Last_Shuriken_leter mb-4">Para que disfrutes cada momento a nuestro lado te queremos ofrecer lo mejor.</h3>
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="flex flex-col items-center text-center">
                <img src="/img/bandeja.png" alt="room" className="w-12 h-12  mt-4 mb-5"/>
                <p>Servicio de habitaciones</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <img src="/img/restaurante.png" alt="room" className="w-12 h-12 mt-4 mb-5"/>
                <p>Cafetería y restaurante</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <img src="/img/24horas.png" alt="room" className="w-12 h-12 mt-4 mb-5"/>
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
              <button onClick={handleLogin} className="reserve-button">Reservar</button>
            </div>
            <img src="/img/habitacion_simple_2camas.jpg" alt="room" className="size-image_room"/>
            <h3 className="text-center mt-2">Habitación simple</h3>
            <h4 className="text-center">Desde 11€\noche</h4>
          </div>

          <div className="room-container relative">
            <img src="/img/habitacion_doble.jpg" alt="room" className="size-image_room"/>
            <div className="button-overlay">
              <button onClick={handleLogin}  className="reserve-button">Reservar</button>
            </div>
            <h3>Habitación doble</h3>
            <h4>Desde 22€\noche</h4>
          </div>

          <div className="room-container relative">
            <img src="/img/habitacion_suite.jpg" alt="room" className="size-image_room"/>
            <div className="button-overlay">
              <button onClick={handleLogin}  className="reserve-button">Reservar</button>
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
                id="name"
                placeholder="Nombre" 
              />
              <select 
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
                id="room_type"
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
                id="email"
                placeholder="Email" 
              />
            </div>
            <div className="flex gap-2 items-center">
              <select
                name="phonePrefix"
                className="text-white p-3 w-1/3 rounded-lg"
                value={formData.phonePrefix}
                onChange={handleInputChange}
              >
                {phonePrefixes.map((prefix, index) => (
                  <option key={`${prefix.code}-${index}`} value={prefix.code}>
                    {prefix.code} - {prefix.country}
                  </option>
                ))}
              </select>
              <input 
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                type="text"
                id="phone"
                placeholder="Teléfono"
              />
            </div>      
            <div>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700" 
                placeholder="Mensaje"
                id="message"
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
                src="/img/email.png" alt="phone" className="w-6 h-6 mr-2">
              </img>
              <p>example@example.com</p>
            </div>
            <div className="flex items-center">
              <img 
                src="/img/llamar.png" alt="phone" className="w-6 h-6 mr-2">
              </img>
              <p>+34 666 66 66 66</p>
            </div>
            <div className="flex items-center">
              <img 
                src="/img/ubicacion.png" alt="phone" className="w-6 h-6 mr-2">
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
    </main>

    <Footer />

  </div>
  );
};

export default HomePrincipal;
