import React, { useEffect, useState } from "react";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings/");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="table-container">
    <h2>Reservas</h2>
    
    <div className="container-specific m-5">
      <button className="buttons-specific">Buscar reserva</button>
      <button className="buttons-specific">Crear nueva reserva</button>
      <button className="buttons-specific">Editar reserva</button>
      <button className="buttons-specific">Eliminar reserva</button>
    </div>

    <table className="w-full border-0">
      <thead className="bg-indigo-700 text-white rounded-t-lg">
        <tr>
          <th className="p-2 first:rounded-tl-lg last:rounded-tr-lg border-0">Cliente</th>
          <th className="p-2 border-0">Fecha de Llegada</th>
          <th className="p-2 border-0">Fecha de Salida</th>
          <th className="p-2 border-0">Estado</th>
          <th className="p-2 last:rounded-tr-lg border-0">Habitación</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 text-white">
        {bookings.map((booking) => (
          <tr key={booking.idBooking}>
            <td className="border-0">{booking.user_name} {booking.client_lastname}</td>
            <td className="border-0">{booking.startDate}</td>
            <td className="border-0">{booking.endDate}</td>
            <td className="border-0">
              <div>
                <span
                  className="status-circle"
                  style={{
                    backgroundColor:
                      booking.state === "confirmada"
                        ? "green"
                        : booking.state === "pendiente"
                        ? "yellow"
                        : "red",
                  }}
                ></span> 
                {booking.state}
              </div>
            </td>
            <td className="border-0">{booking.room_number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default BookingsTable;
