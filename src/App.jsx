import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Cuestionario from './pages/Cuestionario'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuestionario" element={<Cuestionario />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
