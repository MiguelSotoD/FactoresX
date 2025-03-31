import { login } from "../api/Login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validarLogin = async (e) => {
    e.preventDefault();

    const res = await login({ email, password });

    if (res.success) {
      console.log("Inicio de sesión exitoso", res);
      //Aqui va la ruta
      navigate("/RespuestasPage");
    } else {
      setError(res.message || "Error en el inicio de sesión");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg shadow-gray-400 w-4/5 max-w-md">
        <div className="flex justify-center mb-6 gap-x-6">
          <h2 className="text-3xl font-bold">Iniciar Sesión</h2>
        </div>

        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full "
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full "
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={validarLogin}
              className="bg-gray-400 text-white p-1.5 rounded-lg w-1/2 hover:bg-blue-500 transition duration-300 cursor-pointer"
            >
              Iniciar sesion
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <a
            href="/recuperar-contraseña"
            className="text-sm text-blue-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
