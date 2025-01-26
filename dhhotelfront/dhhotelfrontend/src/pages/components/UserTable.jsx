import React, { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="table-container">
      <h2>Clientes</h2>
      <div className="container-specific">
        <button className="buttons-specific">Crear cliente</button>
        <button className="buttons-specific">Editar cliente</button>
        <button className="buttons-specific">Eliminar cliente</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Provincia</th>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUser}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.clients?.[0]?.lastName || "Sin datos"}</td>
              <td>{user.clients?.[0]?.phone || "Sin datos"}</td>
              <td>{user.clients?.[0]?.state || "Sin datos"}</td>
              <td>{user.clients?.[0]?.country || "Sin datos"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
