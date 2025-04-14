import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePrincipal from './pages/HomePrincipal.jsx'
import Login from './pages/Registration/Login.jsx'
import HomeClient from "./pages/Home/HomeClient.jsx";
import HomeAdmin from "./pages/Home/HomeAdmin.jsx";
import SingUp from "./pages/Registration/SingUp.jsx";

import './assets/css/fonts.css'
import SearchRoom from './pages/components/Rooms/SearchRoom.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePrincipal />} />
          <Route path="/search_room" element={<SearchRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/client" element={<HomeClient />} />
          <Route path="/singup" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
