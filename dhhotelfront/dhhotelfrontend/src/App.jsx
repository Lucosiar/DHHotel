import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePrincipal from './pages/HomePrincipal.jsx'
import Login from './pages/Registration/Login.jsx'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePrincipal />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
