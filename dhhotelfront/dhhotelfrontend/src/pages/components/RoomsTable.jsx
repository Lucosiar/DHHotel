import React, { useEffect, useState } from "react";
import CreateRoom from "../components/CreateRoom.jsx";


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

  // Mostrar habitaciones
  const fetchRooms = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rooms/");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Eliminar habitación
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

      if (!response.ok){
        throw new Error("No se pudo eliminar la habitación");
      }

      alert(`La habitación ${roomNumberToDelete} ha sido eliminada.`);
      setRoomNumberToDelete("");
      setConfirmDelete(false);
      setShowDeletePopup(false);
      fetchRooms();
    }catch(error){
      console.error("Error deleting room:", error);
    }
  }

  // Abrir popup de eliminación
  const handleOpenDeletePopup = () => {
    setShowDeletePopup(true);
  };

  // Cancelar eliminación
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
    // Actualizamos el estado editado para la habitación específica
    setEditedRooms((prev) => ({
      ...prev,
      [idRoom]: newState,
    }));
  };

  const handleSaveStates = async () => {
    try {
      // Realizamos la actualización en el backend para cada habitación modificada
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

      // Recargamos las habitaciones para reflejar los cambios
      fetchRooms();
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los estados:", error);
    }
  };

  const handleCancelEdit = () => {
    // Salir del modo edición sin guardar
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
            <p>Por favor, ingresa el número de la habitación que deseas eliminar:</p>
            <input
              type="text"
              className="input-form"
              value={roomNumberToDelete}
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
            <button className="buttons-specific" onClick={() => setShowCreateForm(true)}>Crear nueva habitación</button>
            <button className="buttons-specific" onClick={() => setShowEditForm(true)}>Editar habitación</button>
            <button className="buttons-specific" onClick={handleOpenDeletePopup}>Eliminar habitación</button>
          </>
          
        )}
        <div className="container-specific">
          {!isEditing ? (
            <button className="buttons-specific" onClick={handleEditState}>
              Editar estado
            </button>
          ) : (
            <>
              <button className="buttons-specific bg-blue-300 border-blue-300" onClick={handleSaveStates}>
                Guardar cambios
              </button>
              <button className="buttons-specific bg-red-300 border-red-300" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </>
          )}
      </div>
      </div>
      <div>
        {/*Filtrar por: Número (ascendente / descendente), tipo, y estado. (mirar como hacerlo) */}
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
              <td>
                {isEditing ? (
                  <select
                    value={editedRooms[room.idRoom] || room.state}
                    onChange={(e) => handleStateChange(room.idRoom, e.target.value)}
                  >
                    <option value="disponible">Disponible</option>
                    <option value="ocupada">Ocupada</option>
                    <option value="mantenimiento">En mantenimiento</option>
                  </select>
                ):(
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
