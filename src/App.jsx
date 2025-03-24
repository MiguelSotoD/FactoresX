import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import GoogleForm from './components/GoogleForm'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuestionario" element={<GoogleForm />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
