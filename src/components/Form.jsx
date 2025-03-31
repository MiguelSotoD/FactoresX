import { useState } from "react";
import secciones from "../data/CuestionarioSecciones";

export default function CuestionarioNom035() {
    const [respuestas, setRespuestas] = useState({});
    const [pagina, setPagina] = useState(1); // 1: Datos Generales, 2: Cuestionario

    const manejarCambio = (id, valor) => {
        setRespuestas((prev) => ({ ...prev, [id]: valor }));
    };

    const manejarEnvioDatosGenerales = (e) => {
        e.preventDefault();
        setPagina(2); // Avanzar al cuestionario
    };

    const manejarEnvioCuestionario = (e) => {
        e.preventDefault();
        console.log("Respuestas enviadas:", respuestas);
        alert("Cuestionario enviado correctamente.");
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {pagina === 1
                    ? "DATOS GENERALES"
                    : "CUESTIONARIO PARA IDENTIFICAR FACTORES DE RIESGO PSICOSOCIAL EN EL TRABAJO"}
            </h2>
            {pagina === 1 && (
                <form onSubmit={manejarEnvioDatosGenerales}>
                    {secciones[0].preguntas.map((pregunta) => (
                        <div key={pregunta.id} className="mb-6">
                            <p className="font-medium text-gray-800">{pregunta.texto}</p>
                            {pregunta.tipo === "texto" && (
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => manejarCambio(pregunta.id, e.target.value)}
                                    placeholder="Escribe tu respuesta aquí..."
                                    required
                                />
                            )}
                            {pregunta.tipo === "fecha" && (
                                <input
                                    type="date"
                                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => manejarCambio(pregunta.id, e.target.value)}
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 cursor-pointer"
                    >
                        Continuar al Cuestionario
                    </button>
                    {secciones[0].preguntas.map((pregunta) => (
                        <div key={pregunta.id} className="mb-6">
                            <p className="font-medium text-gray-800">{pregunta.texto}</p>
                            {pregunta.tipo === "texto" && (
                                <input
                                    type="text"
                                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => manejarCambio(pregunta.id, e.target.value)}
                                    placeholder="Escribe tu respuesta aquí..."
                                    required
                                />
                            )}
                            {pregunta.tipo === "fecha" && (
                                <input
                                    type="date"
                                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onChange={(e) => manejarCambio(pregunta.id, e.target.value)}
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 cursor-pointer"
                    >
                        Continuar al Cuestionario
                    </button>
                </form>
            )}
            {pagina === 2 && (
                <form onSubmit={manejarEnvioCuestionario}>
                    {secciones.slice(2).map((seccion, index) => (
                        <div key={index} className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">{seccion.titulo}</h3>
                            {seccion.instrucciones && (
                                <p className="text-gray-600 whitespace-pre-line">{seccion.instrucciones}</p>
                            )}
                            {seccion.preguntas &&
                                seccion.preguntas.map((pregunta) => (
                                    <div key={pregunta.id} className="mb-6">
                                        <p className="font-medium text-gray-800">{pregunta.texto}</p>
                                        {pregunta.tipo === "escala" && (
                                            <div className="flex gap-4 mt-2">
                                                {[5, 4, 3, 2, 1].map((valor) => (
                                                    <label key={valor} className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name={`pregunta-${pregunta.id}`}
                                                            value={valor}
                                                            onChange={() => manejarCambio(pregunta.id, valor)}
                                                            className="focus:ring-blue-400"
                                                            required
                                                        />
                                                        {valor}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 cursor-pointer"
                    >
                        Enviar Cuestionario
                    </button>
                </form>
            )}
        </div>
    );
}
