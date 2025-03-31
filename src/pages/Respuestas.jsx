import { useEffect, useState } from "react";
import api from "../api";
import Footer from "../components/Footer";
import Header from "../components/Header";

function RespuestasPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchRespuestas = async () => {
            try {
                const response = await api.get("/api/respuestas/obtenerRespuestas");
                console.log("Datos obtenidos:", response.data);
                const trabajadoresUnicos = response.data.data.map((trabajador) => ({
                    id: trabajador.trabajador_id,
                    nombre: trabajador.nombre,
                    puesto: trabajador.puesto,
                    departamento: trabajador.departamento,
                    fecha_respuesta: trabajador.respuestas.length > 0 
                        ? new Date(trabajador.respuestas[0].fecha_respuesta).toLocaleDateString()
                        : "No disponible",
                }));

                setData(trabajadoresUnicos);
            } catch (err) {
                console.error("Error al obtener respuestas:", err);
                setError("Error al cargar los datos del cuestionario.");
            } finally {
                setLoading(false);
            }
        };
        fetchRespuestas();
    }, []);

    return (
        <>
            <Header />
            <h1 className="text-4xl font-extrabold text-gray-800 text-center mt-6">Resultados</h1>
            <h2 className="text-lg font-semibold text-gray-500 text-center mb-4">Aquí podrás visualizar las respuestas</h2>

            {loading && <p className="text-center text-blue-500 font-semibold">Cargando...</p>}
            {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto mx-6">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3 text-left">Nombre</th>
                                <th className="p-3 text-left">Puesto</th>
                                <th className="p-3 text-left">Departamento</th>
                                <th className="p-3 text-left">Fecha</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((trabajador) => (
                                    <tr key={trabajador.id} className="border-b hover:bg-gray-100">
                                        <td className="p-3">{trabajador.nombre}</td>
                                        <td className="p-3">{trabajador.puesto}</td>
                                        <td className="p-3">{trabajador.departamento}</td>
                                        <td className="p-3">{trabajador.fecha_respuesta}</td>
                                        <td className="p-3">
                                            <a 
                                                href={`api/resultados/${trabajador.id}/pdf`} 
                                                target="_blank"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Ver PDF
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-5">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 008 0M9 17v-2a4 4 0 018 0v2M9 10h.01M15 10h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01M12 14h.01" />
                                            </svg>
                                            <p className="text-gray-600 font-semibold mt-2">Sin respuestas disponibles</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <Footer />
        </>
    );
}

export default RespuestasPage;
