import React, { useEffect, useState } from "react";
import CreateRoom from "../Rooms/CreateRoom.jsx";

const RoomsTable = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [roomNumberToDelete, setRoomNumberToDelete] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRooms, setEditedRooms] = useState({});

  const userRole = "superadmin";

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

  const handleDeleteRoom = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/rooms/delete_room_by_number/?number=${roomNumberToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar la habitación");
      }

      alert(`La habitación ${roomNumberToDelete} ha sido eliminada.`);
      setRoomNumberToDelete("");
      setConfirmDelete(false);
      setShowDeletePopup(false);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleOpenDeletePopup = () => {
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setRoomNumberToDelete("");
    setConfirmDelete(false);
  };

  const handleEditState = () => {
    setIsEditing(true);
    const initialEditedRooms = rooms.reduce((acc, room) => {
      acc[room.idRoom] = room.state;
      return acc;
    }, {});
    setEditedRooms(initialEditedRooms);
  };

  const handleStateChange = (idRoom, newState) => {
    setEditedRooms((prev) => ({
      ...prev,
      [idRoom]: newState,
    }));
  };

  const handleSaveStates = async () => {
    try {
      for (const [idRoom, newState] of Object.entries(editedRooms)) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/rooms/${idRoom}/update_state/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ state: newState }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error al actualizar el estado de la habitación ${idRoom}`);
        }
      }

      fetchRooms();
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los estados:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedRooms({});
  };

  return (
    <div className="table-container">
      {showCreateForm && (
        <CreateRoom
          onClose={() => setShowCreateForm(false)}
          onRoomCreated={fetchRooms}
        />
      )}

      {showDeletePopup && !confirmDelete && (
        <div className="popup-container">
          <div className="popup-content">
            <h3>Eliminar Habitación</h3>
            <p>¿Esta es la habitación que deseas eliminar?</p> 
            <input
              type="text"
              className="input-form"
              value={roomNumberToDelete}
              readOnly
              onChange={(e) => setRoomNumberToDelete(e.target.value)}
              placeholder="Número de habitación"
            />
            <div className="popup-buttons">
              <button onClick={() => setConfirmDelete(true)}>Aceptar</button>
              <button onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="popup-container">
          <div className="popup-content">
            <h3>Confirmación</h3>
            <p>
              ¿Estás completamente seguro de que deseas eliminar la habitación{" "}
              <strong>{roomNumberToDelete}</strong>?
            </p>
            <div className="popup-buttons">
              <button onClick={handleDeleteRoom}>Sí, eliminar</button>
              <button onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <h2>Habitaciones</h2>
      <div className="container-specific m-5">
        {userRole === "superadmin" && (
          <>
            <button className="buttons-specific" onClick={() => setShowCreateForm(true)}>
              Crear nueva habitación
            </button>
          </>
        )}
      </div>

      <table className="w-full border-0">
        <thead className="bg-indigo-700 text-white rounded-t-lg">
          <tr>
            <th className="p-2 border-0">Número</th>
            <th className="p-2 border-0">Tipo</th>
            <th className="p-2 border-0">Precio</th>
            <th className="p-2 border-0">Huésped</th>
            <th className="p-2 border-0">Estado</th>
            <th className="p-2 border-0">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-white">
          {rooms.map((room) => (
            <tr key={room.idRoom}>
              <td className="border-0">{room.number}</td>
              <td className="border-0">{room.typeRoom}</td>
              <td className="border-0">{room.price}</td>
              <td className="border-0">
                {room.guestName || "No asignado"}
              </td>
              <td className="border-0">
                {isEditing ? (
                  <select
                    value={editedRooms[room.idRoom] || room.state}
                    onChange={(e) => handleStateChange(room.idRoom, e.target.value)}
                  >
                    <option value="disponible">Disponible</option>
                    <option value="ocupada">Ocupada</option>
                    <option value="mantenimiento">En mantenimiento</option>
                  </select>
                ) : (
                  <div>
                    <span
                      className="status-circle"
                      style={{
                        backgroundColor:
                          room.state === "ocupada"
                            ? "red"
                            : room.state === "disponible"
                            ? "green"
                            : "black",
                      }}
                    ></span>
                    {room.state}
                  </div>
                )}
              </td>
              <td className="border-0 flex justify-center">
                {userRole === "superadmin" && (
                  <>
                  <button
                    onClick={() => console.log(`Editar habitación ${room.number}`)}
                    className="p-2 bg-blue-700 text-white rounded-full mr-2 hover:bg-blue-600"
                  >
                    <img src="img/acciones/lapiz.png" alt="Editar" className="w-6 h-6" />
                  </button>
                
                  <button
                    onClick={() => {
                      setRoomNumberToDelete(room.number);
                      handleOpenDeletePopup();
                    }}
                    className="p-2 bg-red-700 text-white rounded-full hover:bg-red-600"
                  >
                    <img src="img/acciones/borrar.png" alt="Eliminar" className="w-6 h-6" />
                  </button>
                  </>
                )}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
