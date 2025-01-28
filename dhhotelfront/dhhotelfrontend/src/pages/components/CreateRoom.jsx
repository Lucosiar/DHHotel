import React, { useState, useEffect } from "react";

const CreateRoom = ({ onClose, onRoomCreated }) => {
  const [formData, setFormData] = useState({
    number: "",
    typeRoom: "simple",
    price: "",
    state: "en mantenimiento",
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

    console.log("Datos enviados al servidor:", formData);

    try {
      const response = await fetch("http://localhost:8000/api/rooms/create_room/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.number ? errorData.number[0] : "Error al crear la habitación"
        );
      }

      const data = await response.json();
      console.log("Habitación creada:", data);

      onRoomCreated();

      onClose();
    } catch (error) {
      console.error("Error al crear la habitación:", error);
      setErrorMessage(error.message);
    }
  };

  const handleClose = () => {
    setFormData({
      number: "",
      typeRoom: "simple",
      price: "",
      state: "mantenimiento",
    });
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="form-container">
      <h2 className="mt-10">Crear Nueva Habitación</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="">
          <label>Número:</label>
          <input
            type="text"
            name="number"
            className="input-form"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <select
            name="typeRoom"
            value={formData.typeRoom}
            onChange={handleChange}
            className="input-form"
            required
          >
            <option value="simple">Simple</option>
            <option value="doble">Doble</option>
            <option value="suite">Suite</option>
          </select>
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            className="input-form"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input-form"
            required
          >
            <option value="disponible">Disponible</option>
            <option value="ocupada">Ocupada</option>
            <option value="mantenimiento">En Mantenimiento</option>
          </select>
        </div>
            <button type="submit" className="buttons-create-room">Guardar</button>
            <button type="button" onClick={handleClose} className="buttons-create-room">
            Cerrar
            </button>
      </form>

      {errorMessage && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Error</h3>
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")} className="modal-button">
              Cerrar
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CreateRoom;
