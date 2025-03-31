import { useEffect, useState } from "react";
import api from "../api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { SentimentDissatisfied as NoDataIcon } from "@mui/icons-material";

function ResultadoPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchRespuestas = async () => {
            try {
                const response = await api.get("/api/respuestas/obtenerRespuestas");
                console.log("Datos del endpoint:", response.data);
                setData(response.data.data); 
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
            <h1 className="text-4xl font-extrabold text-black-400 text-center">título no se</h1>
            <h2 className="text-1xl font-extrabold text-gray-400 text-center">aquí podrás visualizar las respuestas?</h2>
            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <TableContainer component={Paper} style={{ margin: "20px", padding: "10px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Nombre</strong></TableCell>
                                <TableCell><strong>Puesto</strong></TableCell>
                                <TableCell><strong>Departamento</strong></TableCell>
                                <TableCell><strong>Cuestionario</strong></TableCell>
                                <TableCell><strong>Pregunta</strong></TableCell>
                                <TableCell><strong>Respuesta</strong></TableCell>
                                <TableCell><strong>Fecha</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? (
                                data.map((trabajador) => (
                                    trabajador.respuestas.map((respuesta, index) => (
                                        <TableRow key={`${trabajador.trabajador_id}-${index}`}>
                                            <TableCell>{trabajador.nombre}</TableCell>
                                            <TableCell>{trabajador.puesto}</TableCell>
                                            <TableCell>{trabajador.departamento}</TableCell>
                                            <TableCell>{respuesta.nombre_cuestionario}</TableCell>
                                            <TableCell>{respuesta.texto_pregunta}</TableCell>
                                            <TableCell>{respuesta.respuesta}</TableCell>
                                            <TableCell>{new Date(respuesta.fecha_respuesta).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
                                            <NoDataIcon style={{ fontSize: 60, color: "#888" }} />
                                            <Typography variant="h6" color="textSecondary">Sin respuestas</Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Footer />
        </>
    );
}

export default ResultadoPage;
