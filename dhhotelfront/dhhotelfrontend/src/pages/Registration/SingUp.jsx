import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateClient from '../components/Clients/CreateClient';

const SingUp = () => {
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);


  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      rol: "client",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/create_user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const userData = await response.json();
        setUserId(userData.idUser); 
        setIsUserCreated(true);
        setError(null);
      } else {
        const errorData = await response.json();
        alert(errorData || "Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error en la creación del usuario:", error);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: 'url("img/bgCanva.jpg")' }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-8 h-8 mr-2" src="img/serpienteMorada.ico" alt="logo" />
          DH Lucosiar
        </a>

        {isUserCreated ? (
          <CreateClient userId={userId} />
        ) : (
          <div className="w-full bg-gray-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                ¡Crea tu cuenta con nosotros!
              </h1>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
              <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                    Nombre
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-700 hover:bg-orange-700 focus:ring-4 
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Regístrate
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SingUp;

