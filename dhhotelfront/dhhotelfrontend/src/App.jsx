import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePrincipal from './pages/HomePrincipal.jsx'
import Login from './pages/Registration/Login.jsx'
import HomeClient from "./pages/Home/HomeClient.jsx";
import HomeAdmin from "./pages/Home/HomeAdmin.jsx";

import './assets/css/fonts.css'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePrincipal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/client" element={<HomeClient />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
