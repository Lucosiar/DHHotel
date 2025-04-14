import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header";

const SearchRoom = () => {
  const location = useLocation();
  const { arrivalDate, departureDate, adults } = location.state || {};

  const [arrival, setArrival] = useState(arrivalDate || "");
  const [departure, setDeparture] = useState(departureDate || "");
  const [numAdults, setNumAdults] = useState(adults || 1);

  const [rooms, setRooms] = useState([]);

  const searchRooms = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/rooms/");
        const data = await response.json();
        const disponibles = data.filter((room) => room.state === "disponible");
        setRooms(disponibles);
        console.log("Habitaciones disponibles:", disponibles);
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
      }
  }

  // Efecto para cuando se carga con parámetros
  useEffect(() => {
    if (!arrivalDate || !departureDate || !adults) {
      console.warn("Faltan datos en la búsqueda");
    } else {
      console.log("Buscando habitaciones con:", {
        arrivalDate,
        departureDate,
        adults
      });
    }
  }, [arrivalDate, departureDate, adults]);

  // Handlers para cambios en los inputs
  const handleArrivalDateChange = (e) => {
    const value = e.target.value;
    setArrival(value);
    if (departure && departure < value) {
      setDeparture(""); // reset si la salida era antes de llegada
    }
  };

  const handleDepartureDateChange = (e) => setDeparture(e.target.value);
  const handleAdultsChange = (e) => setNumAdults(e.target.value);

  return (
    <div>
      <Header />

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
            value={arrival}
            onChange={handleArrivalDateChange}
          />
          <input
            type="date"
            placeholder="Fecha de salida"
            id="departure_date"
            min={arrival}
            value={departure}
            onChange={handleDepartureDateChange}
          />
          <input
            type="number"
            placeholder="Adultos"
            id="adults"
            min="1"
            max="8"
            value={numAdults}
            onChange={handleAdultsChange}
          />
        </div>
        <button className="bg-indigo-700" onClick={() => {
          console.log("Nueva búsqueda con:", { arrival, departure, numAdults });
          searchRooms();
        
        }}>
          Buscar
        </button>
      </div>
      <div className="mt-6">
  <h2 className="text-xl font-bold mb-2">Habitaciones disponibles</h2>
  {rooms.length === 0 ? (
    <p>No hay habitaciones disponibles por ahora.</p>
  ) : (
    <ul className="space-y-4">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="p-4 border border-gray-300 rounded-md shadow-sm"
        >
          <p><strong>Número:</strong> {room.number}</p>
          <p><strong>Capacidad:</strong> {room.capacity}</p>
          <p><strong>Estado:</strong> {room.state}</p>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default SearchRoom;
