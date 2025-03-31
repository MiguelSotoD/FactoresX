import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CuestionarioPages from './pages/Cuestionario'
import Footer from './components/Footer'
import ResultadoPages from './pages/Resultado'
import Login from './pages/Login'
import ResultadoAdmin from './pages/ResultadoAdmin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cuestionario" element={<CuestionarioPages />} />
        <Route path="/Resultado" element={<ResultadoPages />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cuestionarioRespondido"  element={<ResultadoAdmin />} />
      </Routes>
    </Router>
  )
}

export default App
