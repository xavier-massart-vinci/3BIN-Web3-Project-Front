import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Components/Pages/Home/Home'
import Login from './Components/Pages/Login/Login'
import Register from './Components/Pages/Register/Register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element ={<Home />} />
        <Route path="/login" element ={<Login />} />
        <Route path="/register" element ={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
   
  </StrictMode>,
)
