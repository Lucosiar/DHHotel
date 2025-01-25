import React, { useEffect, useState } from 'react';
import "../../assets/css/Homes.css";

const HomeAdmin = () => {

  const [selectedOption, setSelectedOption] = useState('reservas');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedOption === 'reservas') {
      fetchReservas();
    } else if (selectedOption === 'usuarios') {
      fetchUsuarios();
    } else if (selectedOption === 'habitaciones') {
      fetchHabitaciones();
    }
  }, [selectedOption]);

  const fetchReservas = async () => {
    try{
      constresponse = await fetch('http://127.0.0.1:8000/api/reservas/');
      const data = await constresponse.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsuarios = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/users');
        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
  };

  const fetchHabitaciones = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/rooms');
        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
  };


  return (
    <div>
      <div className='container-Admin'>
        <div className="card" onClick={() => setSelectedOption('reservas')}>
          <h3>Gestionar Reservas</h3>
        </div>
        <div className="card" onClick={() => setSelectedOption('usuarios')}>
          <h3>Gestionar Usuarios</h3>
        </div>
        <div className="card" onClick={() => setSelectedOption('habitaciones')}>
          <h3>Gestionar Habitaciones</h3>
        </div>
        <div className="card" onClick={() => alert('Gestionar Administradores')}>
          <h3>Gestionar Administradores</h3>
        </div>

      </div>
      
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Fecha de Llegada</th>
              <th>Fecha de Salida</th>
              <th>Habitación</th>
              <th>Estado</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.client}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.room.number}</td>
                <td>{item.state}</td>
                <td>{item.payment.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <p>Administradores: crear reservas, leer, actualizar y eliminar reservas. Registrar pagos. Actualizar habitaciones (cambio de estado) </p>
      <p>SuperAdministradores: Crear, leer, actualizar y eliminar administradores. crear, leer, actualizar y eliminar habitaciones.</p>
    </div>
  );
};

export default HomeAdmin;
