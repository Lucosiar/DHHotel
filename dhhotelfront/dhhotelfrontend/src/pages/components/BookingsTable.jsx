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
      <div className="container-specific">
      <button className="buttons-specific">Buscar reserva</button>
        <button className="buttons-specific">Crear nueva reserva</button>
        <button className="buttons-specific">Editar reserva</button>
        <button className="buttons-specific">Eliminar reserva</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha de Llegada</th>
            <th>Fecha de Salida</th>
            <th>Estado</th>
            <th>Habitación</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.idBooking}>
              <td>{booking.user_name} {booking.client_lastname}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.state}</td>
              <td>{booking.room_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
