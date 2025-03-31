import { useEffect, useState } from "react";
import api from "../api";
import Footer from "../components/Footer";
import Header from "../components/Header";

function RespuestasPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState("");

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
                    organizacion: trabajador.organizacion,  // Nueva clave
                    fecha_respuesta: trabajador.respuestas.length > 0
                        ? new Date(trabajador.respuestas[0].fecha_respuesta).toLocaleDateString()
                        : "No disponible",
                }));

                const uniqueOrgs = [...new Set(trabajadoresUnicos.map(t => t.organizacion))];

                setData(trabajadoresUnicos);
                setFilteredData(trabajadoresUnicos);
                setOrganizations(uniqueOrgs);
            } catch (err) {
                console.error("Error al obtener respuestas:", err);
                setError("Error al cargar los datos del cuestionario.");
            } finally {
                setLoading(false);
            }
        };

        fetchRespuestas();
    }, []);

    const handleFilterChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOrg(selectedValue);

        if (selectedValue) {
            setFilteredData(data.filter(trabajador => trabajador.organizacion === selectedValue));
        } else {
            setFilteredData(data);
        }
    };

    return (
        <>
            <Header />
            <h1 className="text-4xl font-extrabold text-gray-800 text-center mt-6">Resultados</h1>
            <h2 className="text-lg font-semibold text-gray-500 text-center mb-4">Aquí podrás visualizar las respuestas</h2>

            {loading && <p className="text-center text-blue-500 font-semibold">Cargando...</p>}
            {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

            {!loading && !error && (
                <div className="mx-6">
                    {/* Filtro de organización */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Filtrar por organización:</label>
                        <select
                            value={selectedOrg}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            <option value="">Todas</option>
                            {organizations.map(org => (
                                <option key={org} value={org}>{org}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tabla de resultados */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-3 text-left">Nombre</th>
                                    <th className="p-3 text-left">Puesto</th>
                                    <th className="p-3 text-left">Departamento</th>
                                    <th className="p-3 text-left">Organización</th>
                                    <th className="p-3 text-left">Fecha</th>
                                    <th className="p-3 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((trabajador) => (
                                        <tr key={trabajador.id} className="border-b hover:bg-gray-100">
                                            <td className="p-3">{trabajador.nombre}</td>
                                            <td className="p-3">{trabajador.puesto}</td>
                                            <td className="p-3">{trabajador.departamento}</td>
                                            <td className="p-3">{trabajador.organizacion}</td>
                                            <td className="p-3">{trabajador.fecha_respuesta}</td>
                                            <td className="p-3">
                                                <a
                                                    href={`http://localhost:4000/api/resultado/${trabajador.id}/pdf`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 011 1v7h2.586l-3.293 3.293a1 1 0 01-1.414 0L5.414 10H8V3a1 1 0 011-1zM3 15a2 2 0 012-2h10a2 2 0 012 2v1H3v-1z" clipRule="evenodd" />
                                                    </svg>
                                                    Ver PDF
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center p-5">
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
                </div>
            )}

            <Footer />
        </>
    );
}

export default RespuestasPage;
