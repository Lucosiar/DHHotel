import React, { useState, useEffect } from "react";

const CreateBooking = ({ onClose, onBookingCreated }) => {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchClient, setSearchClient] = useState("");

  const [rooms, setRooms] = useState([]);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    state: "pendiente",
    clientId: "",
    roomId: "",
    paymentDone: false,
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    paymentId: "",
  });

  const [bookings, setBookings] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchClients();
    fetchRooms();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/clients/");
      const data = await response.json();
      setClients(data);
      setFilteredClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.user.name} ${client.lastName} ${client.user.email}`.toLowerCase();
    return fullName.includes(searchClient.toLowerCase());
  });

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rooms/");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings/");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setBookingData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
  
      if (name === "startDate" || name === "endDate") {
        filterAvailableRooms(updatedData.startDate, updatedData.endDate);
      }
  
      return updatedData;
    });

    console.log("Campos ${name}:, ${value}");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!bookingData.clientId || !bookingData.roomId) {
      alert("Debe seleccionar un cliente y una habitación.");
      return;
    }
  
    if (bookingData.state === "confirmada" && !bookingData.paymentDone) {
      alert("El pago debe estar realizado para confirmar la reserva.");
      return;
    }
  
    const requestData = {
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      state: bookingData.state,
      idClientFK: parseInt(bookingData.clientId),
      idRoomFK: parseInt(bookingData.roomId),
    };
  
    if (bookingData.paymentDone) {
      requestData.payment = {
        amount: bookingData.amount,
        paymentDate: bookingData.paymentDate,
        paymentMethod: bookingData.paymentMethod,
      };
    }
  
    console.log("📤 Enviando datos al backend:", JSON.stringify(requestData, null, 2));
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings/create_booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("✅ Reserva creada con éxito");
      } else {
        console.error("❌ Error al crear la reserva:", data);
        alert("❌ Error al crear la reserva: " + JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const filterAvailableRooms = (startDate, endDate) => {
    if (!startDate || !endDate) return;

    const unavailableRooms = new Set();

    bookings.forEach((booking) => {
      if (
        (startDate >= booking.startDate && startDate < booking.endDate) || 
        (endDate > booking.startDate && endDate <= booking.endDate) || 
        (startDate <= booking.startDate && endDate >= booking.endDate)
      ) {
        unavailableRooms.add(booking.roomId);
      }
    });

    const availableRooms = rooms.filter(
      (room) => !unavailableRooms.has(room.idRoom) && room.state !== "mantenimiento"
    );

    setFilteredRooms(availableRooms);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold text-white">Crear Nueva Reserva</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-white">Fecha de Llegada</label>
          <input
            type="date"
            name="startDate"
            value={bookingData.startDate}
            onChange={handleInputChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
            min={today}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Fecha de Salida</label>
          <input
            type="date"
            name="endDate"
            value={bookingData.endDate}
            onChange={handleInputChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
            min={bookingData.startDate}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Estado</label>
          <select
            name="state"
            value={bookingData.state}
            onChange={handleInputChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Cliente</label>
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5 mb-2"
          />
          <select
            name="clientId"
            value={bookingData.clientId}
            onChange={handleInputChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
          >
            <option value="">Seleccione un cliente</option>
            {filteredClients.map((client) => (
              <option key={client.idClient} value={client.idClient}>
                {user.name} {client.lastName} - {user.email}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Habitaciones disponibles</label>
          <select
            name="roomId"
            value={bookingData.roomId}
            onChange={handleInputChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
          >
            <option value="">Seleccione una habitación</option> {/* Opción por defecto */}
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <option key={room.idRoom} value={room.idRoom}>
                  Habitación {room.number}
                </option>
              ))
            ) : (
              <option value="">No hay habitaciones disponibles</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Pago realizado
          </label>
          <input
            type="checkbox"
            name="paymentDone"
            checked={bookingData.paymentDone}
            onChange={handleInputChange}
            className="mr-2"
          />
        </div>

        {/* Campos adicionales si el pago está realizado */}
        {bookingData.paymentDone && (
          <>
            <div>
              <label className="block text-sm font-medium text-white">
                Monto
              </label>
              <input
                type="number"
                name="amount"
                value={bookingData.amount}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Fecha de pago
              </label>
              <input
                type="date"
                name="paymentDate"
                value={bookingData.paymentDate}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
                required
                min={today}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Método de pago
              </label>
              <select
                name="paymentMethod"
                value={bookingData.paymentMethod}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
                required
              >
                <option value="">Seleccione un método</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
          </>
        )} 

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 p-2 rounded bg-red-600 text-white hover:bg-red-800 mr-2"
          >
            Cerrar
          </button>
          <button
            type="submit"
            className="w-1/2 p-2 rounded bg-indigo-700 text-white hover:bg-green-700 ml-2"
          >
            Crear Reserva
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded-lg">
          <p>{errorMessage}</p>
          <button
            onClick={() => setErrorMessage("")}
            className="mt-2 bg-gray-800 text-white p-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBooking;
