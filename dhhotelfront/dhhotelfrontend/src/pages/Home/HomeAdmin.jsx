import React, { useEffect, useState } from 'react';
import "../../assets/css/Homes.css";
import BookingsTable from "../components/BookingsTable.jsx";
import UsersTable from "../components/UserTable.jsx";
import RoomsTable from "../components/RoomsTable.jsx";
import PaymentsTable from "../components/PaymentsTable.jsx";



const HomeAdmin = () => {

  const [selectedOption, setSelectedOption] = useState('bookings');

  const role = "superadmin";

  return (
    <div className='bg-indigo-400'>
      <div className='container-Admin'>
        <div className="card" onClick={() => setSelectedOption('bookings')}>
          <h3>Gestionar Reservas</h3>
        </div>
        <div className="card" onClick={() => setSelectedOption('users')}>
          <h3>Gestionar Clientes</h3>
        </div>
        <div className="card" onClick={() => setSelectedOption('rooms')}>
          <h3>Gestionar Habitaciones</h3>
        </div>
        <div className="card" onClick={() => setSelectedOption('payments')}>
          <h3>Gestionar Pagos</h3>
        </div>
        {role === "superadmin" && (
          <div className="card" onClick={() => alert('Gestionar Administradores')}>
          <h3>Gestionar Administradores</h3>
        </div>
        )}

      </div>
      
      <div className='content'>
        {selectedOption === "bookings" && <BookingsTable />}
        {selectedOption === "users" && <UsersTable />}
        {selectedOption === "rooms" && <RoomsTable />}
        {selectedOption === "payments" && <PaymentsTable />}
      </div>
      <p>Administradores: crear reservas, leer, actualizar y eliminar reservas. Registrar pagos. Actualizar habitaciones (cambio de estado) </p>
      <p>SuperAdministradores: Crear, leer, actualizar y eliminar administradores. crear, leer, actualizar y eliminar habitaciones.</p>
    </div>
  );
};

export default HomeAdmin;
