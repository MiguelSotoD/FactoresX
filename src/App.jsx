import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CuestionarioPages from "./pages/Cuestionario";
import Footer from "./components/Footer";
import ResultadoPages from "./pages/Resultado";
import Login from "./pages/Login";
import RespuestasPage from "./pages/Respuestas";
import PrivateRoute from "./components/PrivateRoute";
// import ResultadoAdmin from './pages/ResultadoAdmin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />

        <Route
          path="/Cuestionario"
          element={
            <PrivateRoute>
              <CuestionarioPages />
            </PrivateRoute>
          }
        />

        <Route
          path="/Resultado"
          element={
            <PrivateRoute>
              <ResultadoPages />
            </PrivateRoute>
          }
        />

        <Route
          path="/RespuestasPage"
          element={
            <PrivateRoute>
              <RespuestasPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
