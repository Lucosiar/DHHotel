import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../../assets/css/Homes.css";
import BookingsTable from "../components/BookingsTable.jsx";
import UsersTable from "../components/UserTable.jsx";
import RoomsTable from "../components/RoomsTable.jsx";
import PaymentsTable from "../components/PaymentsTable.jsx";



const HomeAdmin = () => {

  const [selectedOption, setSelectedOption] = useState('bookings');
  const role = "superadmin";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-indigo-700 text-white p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col items-center justify-center text-center">
            <img
              rel="icon"
              src="/src/assets/img/serpienteMorada.ico"
              alt="Logo"
              className="h-10 w-10"
            />
            <h1 className="text-3xl">DH Hotel</h1>
            <div className="w-full border-b-2 border-gray-300 mt-2"></div>
            <h2 className="text-lg font-bold mt-2">Panel de Administración</h2>
          </div>

        <div className="space-y-5 mt-4">
          <button className="flex items-center w-full text-left p-2 rounded-full hover:bg-indigo-500" onClick={() => setSelectedOption('bookings')}>
            <img src="/src/assets/img/menu/cita.png" alt="Reservas" className="h-6 w-6 mr-2" />
            Gestionar Reservas
          </button>
          <button className="flex items-center w-full text-left p-2 rounded-full hover:bg-indigo-500" onClick={() => setSelectedOption('users')}>
            <img src="/src/assets/img/menu/usuario.png" alt="Clientes" className="h-6 w-6 mr-2" />
            Gestionar Clientes
          </button>
          <button className="flex items-center w-full text-left p-2 rounded-full hover:bg-indigo-500" onClick={() => setSelectedOption('rooms')}>
            <img src="/src/assets/img/menu/llave.png" alt="Habitaciones" className="h-6 w-6 mr-2" />
            Gestionar Habitaciones
          </button>
          <button className="flex items-center w-full text-left p-2 rounded-full hover:bg-indigo-500" onClick={() => setSelectedOption('payments')}>
            <img src="/src/assets/img/menu/pago.png" alt="Pagos" className="h-6 w-6 mr-2" />
            Gestionar Pagos
          </button>
          {role === "superadmin" && (
            <button className="flex items-center w-full text-left p-2 rounded-full hover:bg-indigo-500" onClick={() => alert('Gestionar Administradores')}>
              <img src="/src/assets/img/menu/apoyo.png" alt="Administradores" className="h-6 w-6 mr-2" />
              Gestionar Administradores
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <button className="flex items-center w-full text-left p-2 rounded-full bg-red-600 hover:bg-red-700" onClick={handleLogout}>
          <img src="/src/assets/img/menu/cerrar-sesion.png" alt="Logout" className="h-6 w-6 mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>

    <div className="flex-1 p-6 bg-gray-600 overflow-auto">
      {selectedOption === "bookings" && <BookingsTable />}
      {selectedOption === "users" && <UsersTable />}
      {selectedOption === "rooms" && <RoomsTable />}
      {selectedOption === "payments" && <PaymentsTable />}
    </div>
  </div>
  );
};

export default HomeAdmin;
