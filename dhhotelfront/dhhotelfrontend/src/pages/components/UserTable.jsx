import React, { useEffect, useState } from "react";
import CreateClient from "../components/CreateClient.jsx";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const handleDeleteClient = (user) => {
    setSelectedUser(user);
    setShowDeletePopup(true);
  };

  const confirmDeleteClient = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/delete/${selectedUser.idUser}/`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("No se pudo eliminar el cliente");

      alert(`El cliente ${selectedUser.name} ha sido eliminado.`);
      setShowDeletePopup(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <div className="table-container">
    {showCreateForm && (
      <CreateClient
        onClose={() => setShowCreateForm(false)}
        onClientCreated={fetchUsers}
      />
    )}

    <h2>Clientes</h2>

    <div className="container-specific m-5">
      <button className="buttons-specific" onClick={handleCreateClient}>Crear cliente</button>
      <button className="buttons-specific">Editar cliente</button>
      <button className="buttons-specific">Eliminar cliente</button>
    </div>

    <table className="w-full border-0">
      <thead className="bg-indigo-700 text-white rounded-t-lg">
        <tr>
          <th className="p-2 first:rounded-tl-lg last:rounded-tr-lg border-0">Email</th>
          <th className="p-2 border-0">Nombre</th>
          <th className="p-2 border-0">Apellido</th>
          <th className="p-2 border-0">Teléfono</th>
          <th className="p-2 border-0">Provincia</th>
          <th className="p-2 last:rounded-tr-lg border-0">País</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UsersTable;
