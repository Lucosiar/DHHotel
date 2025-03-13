import React, { useState } from "react";

const CreateRoom = ({ onClose, onRoomCreated }) => {
  const [formData, setFormData] = useState({
    number: "",
    typeRoom: "simple",
    price: "",
    state: "mantenimiento",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.number || !formData.typeRoom || !formData.price) {
      setErrorMessage("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/rooms/create_room/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.number ? errorData.number[0] : "Error al crear la habitación");
      }

      onRoomCreated();
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900 rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold text-white">Crear Nueva Habitación</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-white">Número</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Tipo</label>
          <select
            name="typeRoom"
            value={formData.typeRoom}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
          >
            <option value="simple">Simple</option>
            <option value="doble">Doble</option>
            <option value="suite">Suite</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Estado</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5"
            required
          >
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
            <option value="mantenimiento">En Mantenimiento</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 p-2 rounded bg-red-600 text-white hover:bg-red-800 mr-2"
          >
            Cerrar
          </button>
          <button
            type="submit"
            className="w-1/2 p-2 rounded bg-indigo-700 text-white hover:bg-green-700 ml-2"
          >
            Guardar
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded-lg">
          <p>{errorMessage}</p>
          <button
            onClick={() => setErrorMessage("")}
            className="mt-2 bg-gray-800 text-white p-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
