import { useState } from "react";

const cuestionarios = {
    eventosTraumaticos: [
        { id: 1, texto: "¿Has presenciado o sufrido un accidente grave en el trabajo?" },
        { id: 2, texto: "¿Has sido víctima de violencia en el trabajo?" }
    ],
    factoresPsicosociales: [
        { id: 3, texto: "¿Te sientes bajo presión constante en tu trabajo?" },
        { id: 4, texto: "¿Tu jornada laboral te permite descansar adecuadamente?" },
        { id: 5, texto: "¿Sientes apoyo de tus compañeros y superiores?" }
    ],
    ambienteOrganizacional: [
        { id: 6, texto: "¿Consideras que tu empresa promueve un ambiente laboral positivo?" },
        { id: 7, texto: "¿Recibes reconocimiento por tu desempeño laboral?" }
    ],
    preguntasAbiertas: [
        { id: 8, texto: "¿Qué cambios implementarías para mejorar tu ambiente laboral?" },
        { id: 9, texto: "¿Tienes algún comentario adicional sobre tu entorno de trabajo?" }
    ]
};

export default function FormularioNom035() {
    const [respuestas, setRespuestas] = useState({});

    const manejarCambio = (id, valor) => {
        setRespuestas((prev) => ({ ...prev, [id]: valor }));
    };

    const calcularRiesgo = () => {
        const respuestasSi = Object.values(respuestas).filter((r) => r === "Sí").length;
        return respuestasSi > 3 ? "Alto Riesgo" : respuestasSi > 1 ? "Riesgo Moderado" : "Bajo Riesgo";
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        const nivelRiesgo = calcularRiesgo();
        console.log("Respuestas enviadas:", respuestas);
        alert(`Respuestas enviadas correctamente. Nivel de riesgo: ${nivelRiesgo}`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Evaluación de Factores de Riesgo Psicosocial</h2>
            <form onSubmit={manejarEnvio}>
                {Object.entries(cuestionarios).map(([categoria, preguntas]) => (
                    <div key={categoria} className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700 capitalize border-b pb-2">
                            {categoria.replace(/([A-Z])/g, " $1")}
                        </h3>
                        {preguntas.map((p) => (
                            <div key={p.id} className="mb-6">
                                <p className="font-medium text-gray-800">{p.texto}</p>
                                {categoria === "preguntasAbiertas" ? (
                                    <textarea
                                        className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        onChange={(e) => manejarCambio(p.id, e.target.value)}
                                        placeholder="Escribe tu respuesta aquí..."
                                    ></textarea>
                                ) : (
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`pregunta-${p.id}`}
                                                value="Sí"
                                                onChange={() => manejarCambio(p.id, "Sí")}
                                                className="focus:ring-blue-400"
                                            />
                                            Sí
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`pregunta-${p.id}`}
                                                value="No"
                                                onChange={() => manejarCambio(p.id, "No")}
                                                className="focus:ring-blue-400"
                                            />
                                            No
                                        </label>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Enviar Respuestas
                </button>
            </form>
        </div>
    );
}
