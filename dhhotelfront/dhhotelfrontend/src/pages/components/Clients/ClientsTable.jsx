import React, { useEffect, useState } from "react";
import CreateClientForAdmin from "./CreateClientForAdmin.jsx";
import { useNavigate } from "react-router-dom";

const ClientsTable = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const userRole = "superadmin";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/clients/");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateClient = async () => {
    setShowCreateForm(true);
  };

  const handleEditClient = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
  };

  const handleDeleteClient = (client) => {
    setSelectedUser(client);
    setShowDeletePopup(true);
  };

  const confirmDeleteClient = async () => {
    if (!selectedUser) {
      console.log("Cliente no seleccionado");
      return;
    }
  
    const userId = selectedUser.idUserFK;
    const clientId = selectedUser.idCliente;
  
    if (!userId || !clientId) {
      console.log("No se encontró el ID del cliente o el ID del usuario");
      return;
    }
  
    try {
      const clientResponse = await fetch(
        `http://127.0.0.1:8000/api/clients/${clientId}/delete_client/`,
        { method: "DELETE" }
      );
  
      if (!clientResponse.ok) throw new Error("No se pudo eliminar el cliente");
  
      alert(`El cliente ${selectedUser.lastName} y el usuario han sido eliminados.`);
      setShowDeletePopup(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar cliente o usuario:", error);
    }
  };

  return (
    <div className="table-container">
      {showCreateForm && (
        <CreateClientForAdmin
          onClose={() => setShowCreateForm(false)}
          onClientCreated={fetchUsers}
        />
      )}

      <h2>Clientes</h2>

      <div className="container-specific m-5">
        <button className="buttons-specific" onClick={handleCreateClient}>
          Crear cliente
        </button>
      </div>

      {/* Delete confirmation popup */}
      {showDeletePopup && (
        <div className="popup-container">
          <div className="popup-content">
            <p>¿Estás seguro de que deseas eliminar a este cliente?</p>
            <button onClick={confirmDeleteClient} className="input-form bg-red-500 hover:bg-red-600">
              Confirmar
            </button>
            <button
              onClick={() => setShowDeletePopup(false)}
              className="input-form hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <table className="w-full border-0">
        <thead className="bg-indigo-700 text-white rounded-t-lg">
          <tr>
            <th className="p-2 first:rounded-tl-lg last:rounded-tr-lg border-0">Email</th>
            <th className="p-2 border-0">Nombre</th>
            <th className="p-2 border-0">Apellido</th>
            <th className="p-2 border-0">Teléfono</th>
            <th className="p-2 border-0">Provincia</th>
            <th className="p-2 last:rounded-tr-lg border-0">País</th>
            <th className="p-2 border-0">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-white">
          {users.map((user) => (
            <tr key={user.idUser}>
              <td className="border-0">{user.email}</td>
              <td className="border-0">{user.name}</td>
              <td className="border-0">{user.clients?.[0]?.lastName || "Sin datos"}</td>
              <td className="border-0">{user.clients?.[0]?.phone || "Sin datos"}</td>
              <td className="border-0">{user.clients?.[0]?.state || "Sin datos"}</td>
              <td className="border-0">{user.clients?.[0]?.country || "Sin datos"}</td>
              <td className="border-0 flex justify-center">
                {userRole === "superadmin" && (
                  <>
                  <button
                    onClick={() => console.log(`Editar usuario ${room.number}`)}
                    className="p-2 bg-blue-700 text-white rounded-full mr-2 hover:bg-blue-600"
                  >
                    <img src="src/assets/img/acciones/lapiz.png" alt="Editar" className="w-6 h-6" />
                  </button>
                
                  <button
                    onClick={() => handleDeleteClient(user.clients?.[0])}  // Pasamos el cliente específico
                    className="p-2 bg-red-700 text-white rounded-full hover:bg-red-600"
                  >
                    <img src="src/assets/img/acciones/borrar.png" alt="Eliminar" className="w-6 h-6" />
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

export default ClientsTable;
