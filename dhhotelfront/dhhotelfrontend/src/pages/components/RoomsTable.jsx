import React, { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom.jsx";

const RoomsTable = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rooms/");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleRoomDelete = async (roomId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/rooms/${roomId}/`, {
        method: "DELETE",
      });
      fetchRooms(); 
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="table-container">
      {showCreateForm && (
        <CreateRoom
          onClose={() => setShowCreateForm(false)}
          onRoomCreated={fetchRooms}
        />
      )}
      <h2>Habitaciones</h2>
      <div className="container-specific">
        <button className="buttons-specific" onClick={() => setShowCreateForm(true)}>Crear nueva habitación</button>
        <button className="buttons-specific" onClick={() => setShowEditForm(true)}>Editar habitación</button>
        <button className="buttons-specific" onClick={() => setShowEditState(true)}>Editar estado</button>
        <button className="buttons-specific">Eliminar habitación</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.idRoom}>
              <td>{room.number}</td>
              <td>{room.typeRoom}</td>
              <td>{room.price}</td>
              <td>{room.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
