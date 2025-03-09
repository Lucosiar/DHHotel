import React, { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const CreateClient = ({ userId }) => {

  const[formData, setFormData] = useState({
    lastName: "",
    phonePrefix: "+34",
    phone: "",
    city: "",
    state: "",
    country: "",
  });

  const navigate = useNavigate();
  
  const [phonePrefixes, setPhonePrefixes] = useState([]);

  const parseCSV = (csvData) => {
    const rows = csvData.split('\n');
    const data = rows.slice(1);
    
    const phonePrefixes = data.map(row => {
      const [code, country] = row.split(',');
      return { code, country };
    });
      
    return phonePrefixes;
  };

  const fetchData = async () => {
    const response = await fetch("/prefixesPhone.csv");
    const csvText = await response.text();
    const parsedData = parseCSV(csvText);
    setPhonePrefixes(parsedData);
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
   
    if (!formData.lastName || !formData.phone || !formData.state) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    
    const fullPhone = `${formData.phonePrefix}${formData.phone}`;
  
    const newClientData = {
      lastName: formData.lastName,
      phone: fullPhone,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      idUser: userId,
    };
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/clients/create_client/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClientData),
      });
    
      if (response.ok) {
        navigate('/client');
    } else {
        const errorData = await response.json();
        console.error('Error al crear el cliente:', errorData);
        alert('Hubo un error al crear el cliente');
    }
    
      const result = await response.json();
        setFormData({
        lastName: "",
        phonePrefix: "+1", 
        phone: "",
        city: "",
        state: "",
        country: "",
        });
    } catch (error) {
      console.error("Error al crear el perfil:", error);
      alert("Hubo un problema al crear el perfil. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Completa tu perfil
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleProfileUpdate}>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-white">
              Apellido
            </label>
            <input 
              type="text" 
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="bg-gray-700 text-white w-full p-2.5 rounded-lg" />
          </div>
          <div>
            <div>
                <label htmlFor="phonePrefix" className="block mb-2 text-sm font-medium text-white">
                    Prefijo
                </label>
            </div>
            <select
              name="phonePrefix"
              id="phonePrefix"
              className="bg-gray-700 text-white w-full p-2.5 rounded-lg"
              value={formData.phonePrefix}
              onChange={handleInputChange}
            >
              {phonePrefixes.map((prefix, index) => (
                <option key={`${prefix.code}-${index}`} value={prefix.code}>
                  {prefix.code} - {prefix.country}
                </option>
              ))}
            </select>
            <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">
                Teléfono
                </label>
                <input 
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full p-2.5 rounded-lg" />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-white">
              Ciudad
            </label>
            <input 
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              className="bg-gray-700 text-white w-full p-2.5 rounded-lg" />
          </div>
          <div>
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-white">
              Provincia
            </label>
            <input 
              type="text"
              name="state"
              id="state"
              value={formData.state}
              onChange={handleInputChange}
              className="bg-gray-700 text-white w-full p-2.5 rounded-lg" />
          </div>
          <div>
            <label htmlFor="country" className="block mb-2 text-sm font-medium text-white">
              País
            </label>
            <input 
              type="text"
              name="country"
              id="country"
              value={formData.country} 
              onChange={handleInputChange} 
              className="bg-gray-700 text-white w-full p-2.5 rounded-lg" />
          </div>
          <button type="submit" className="w-full text-white bg-indigo-700 hover:bg-orange-700 rounded-lg p-2.5">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClient;
