import { useState } from "react";
import secciones from "../data/CuestionarioSecciones";

export default function CuestionarioNom035() {
    const [respuestas, setRespuestas] = useState({});

    const manejarCambio = (id, valor) => {
        setRespuestas((prev) => ({ ...prev, [id]: valor }));
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        console.log("Respuestas enviadas:", respuestas);
        alert("Cuestionario enviado correctamente.");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                CUESTIONARIO PARA IDENTIFICAR FACTORES DE RIESGO PSICOSOCIAL EN EL TRABAJO
            </h2>
            <form onSubmit={manejarEnvio}>
                {secciones.map((seccion, index) => (
                    <div key={index} className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">{seccion.titulo}</h3>
                        {seccion.instrucciones && (
                            <p className="text-gray-600 whitespace-pre-line">{seccion.instrucciones}</p>
                        )}
                        {seccion.preguntas &&
                            seccion.preguntas.map((pregunta) => (
                                <div key={pregunta.id} className="mb-6">
                                    <p className="font-medium text-gray-800">{pregunta.texto}</p>
                                    {pregunta.tipo === "texto" && (
                                        <input
                                            type="text"
                                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            onChange={(e) => manejarCambio(pregunta.id, e.target.value)}
                                            placeholder="Escribe tu respuesta aquí..."
                                        />
                                    )}
                                    {pregunta.tipo === "fecha" && (
                                        <input
                                            type="date"
                                            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            onChange={(e) => manejarCambio(pregunta.id, e.target.value)}
                                        />
                                    )}
                                    {pregunta.tipo === "opciones" && (
                                        <div className="flex gap-4 mt-2">
                                            {pregunta.opciones.map((opcion, idx) => (
                                                <label key={idx} className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`pregunta-${pregunta.id}`}
                                                        value={opcion}
                                                        onChange={() => manejarCambio(pregunta.id, opcion)}
                                                        className="focus:ring-blue-400"
                                                    />
                                                    {opcion}
                                                </label>
                                            ))}
                                        </div>
                                    )}
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
        </div>
    );
}
