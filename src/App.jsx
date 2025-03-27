import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CuestionarioPages from './pages/Cuestionario'
import Footer from './components/Footer'
import ResultadoPages from './pages/Resultado'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuestionario" element={<CuestionarioPages />} />
        <Route path="/Resultado" element={<ResultadoPages />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
