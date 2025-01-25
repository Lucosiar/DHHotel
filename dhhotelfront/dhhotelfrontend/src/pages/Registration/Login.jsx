import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Redirigir según el tipo de usuario
      if (data.userRole === 'admin' || data.userRole === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } else {
      console.log('Error en el login', data);
    }
  };

  return (
    <section 
      className="relative bg-cover bg-center h-screen "
      style={{backgroundImage: 'url("./src/assets/img/bgCanva.jpg")'}}>
        
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-white The_Last_Shuriken_leter"
        >
          <img
            className="w-8 h-8 mr-2"
            src="/src/assets/img/serpienteMorada.ico"
            alt="logo"
          />
          DH Lucosiar
        </a>
        <div className="w-full bg-gray-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Inicia sesión con tu cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Tu email
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
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-500 hover:underline"
                >
                  ¿Olvidaste la contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-gray-400">
                ¿No tienes cuenta todavía?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-500 hover:underline"
                >
                  Registrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
  