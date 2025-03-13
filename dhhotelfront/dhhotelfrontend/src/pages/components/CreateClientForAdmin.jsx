import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateClient = ({ onClose, onClientCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    lastName: "",
    phonePrefix: "+34",
    phone: "",
    city: "",
    state: "",
    country: "",
  });

  const navigate = useNavigate();
  const [phonePrefixes, setPhonePrefixes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/prefixesPhone.csv");
      const csvText = await response.text();
      const parsedData = csvText
        .split("\n")
        .slice(1)
        .map((row) => {
          const [code, country] = row.split(",");
          return { code, country };
        });
      setPhonePrefixes(parsedData);
    } catch (error) {
      console.error("Error cargando prefijos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.lastName || !formData.phone || !formData.state) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const fullPhone = `${formData.phonePrefix}${formData.phone}`;
    const newClientData = { ...formData, phone: fullPhone, idUser: userId };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/clients/create_client/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClientData),
      });

      if (response.ok) {
        navigate("/client");
      } else {
        console.error("Error al crear el cliente:", await response.json());
        alert("Hubo un error al crear el cliente");
      }
    } catch (error) {
      console.error("Error al crear el perfil:", error);
      alert("Hubo un problema al crear el perfil. Inténtalo de nuevo.");
    }
  };

  const handleClose = () => {
    setFormData({
        name: "",
        email: "",
        lastName: "",
        phonePrefix: "+34",
        phone: "",
        city: "",
        state: "",
        country: "",
    });
    //setErrorMessage("");
    onClose();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold text-white mb-4">Completa el perfil del cliente</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleProfileUpdate}>
        <div>
          <label className="text-white">Nombre</label>
          <input type="text" name="name" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange} required />
        </div>
        <div>
          <label className="text-white">Apellido</label>
          <input type="text" name="lastName" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange} required />
        </div>
        <div>
          <label className="text-white">Email</label>
          <input type="email" name="email" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange} required />
        </div>
        <div className="flex gap-2">
          <div className="w-1/3">
            <label className="text-white">Prefijo</label>
            <select name="phonePrefix" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange}>
              {phonePrefixes.map((prefix, index) => (
                <option key={index} value={prefix.code}>{prefix.code} - {prefix.country}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-white">Teléfono</label>
            <input type="text" name="phone" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange} required />
          </div>
        </div>
        <div>
          <label className="text-white">Ciudad</label>
          <input type="text" name="city" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange} />
        </div>
        <div>
          <label className="text-white">Provincia</label>
          <input type="text" name="state" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange} required />
        </div>
        <div>
          <label className="text-white">País</label>
          <input type="text" name="country" className="w-full p-2 rounded bg-gray-700 text-white" onChange={handleInputChange} />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-between">
            <button type="button" onClick={handleClose} className="w-1/2 p-2 rounded bg-red-600 text-white hover:bg-red-800 mr-2"> 
                Cerrar
            </button>
            <button type="submit" className="w-1/2 p-2 rounded bg-indigo-700 text-white hover:bg-green-700 ml-2">
                Guardar
            </button>
        </div>

      </form>
    </div>
  );
};

export default CreateClient;
