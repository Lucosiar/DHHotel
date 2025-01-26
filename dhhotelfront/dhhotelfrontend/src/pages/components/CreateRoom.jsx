import React, { useState } from "react";

const CreateRoom = ({ onBack }) => {
  const [formData, setFormData] = useState({
    number: "",
    typeRoom: "",
    price: "",
    state: "disponible",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Room Data:", formData);
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
            <button type="button" onClick={onBack} className="buttons-create-room">
            Cerrar
            </button>
      </form>
    </div>
  );
};

export default CreateRoom;
