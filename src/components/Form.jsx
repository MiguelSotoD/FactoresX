import { useState, useEffect } from "react";
import api from "../api"; 

export default function CuestionarioNom035() {
    const [respuestas, setRespuestas] = useState({});
    const [mensaje, setMensaje] = useState(""); // Para mostrar mensaje en el formulario
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [secciones, setSecciones] = useState([]);
    const [datosGenerales, setDatosGenerales] = useState({
        nombre: "",
        puesto: "",
        departamento: "",
        fecha_ingreso: "",
        sexo: "",
        organizacion: ""
      });
    const [pagina, setPagina] = useState(1); // 1: Datos Generales, 2: Cuestionario
    const [trabajadorId, setTrabajadorId] = useState(null);

     // Efecto para cargar las secciones dinámicamente al montar el componente
  useEffect(() => {
    const fetchSecciones = async () => {
        try {
          const response = await api.get("/api/cuestionario/con-preguntas");
          // La respuesta tiene la estructura { message: "...", data: [ ... ] }
          setSecciones(response.data.data);
        } catch (err) {
          console.error("Error al cargar las secciones:", err);
          setError("Error al cargar los datos del cuestionario.");
        } finally {
          setLoading(false);
        }
      };
    fetchSecciones();
  }, []);

    // Manejar cambios en los inputs de datos generales
    const handleDatosGeneralesChange = (e) => {
        const { name, value } = e.target;
        setDatosGenerales((prev) => ({ ...prev, [name]: value }));
    };

    const manejarCambio = (id, valor) => {
        setRespuestas((prev) => ({ ...prev, [id]: valor }));
    };

    
    const manejarEnvioDatosGenerales = async (e) => {
        e.preventDefault();
        try {
            // Envía los datos del trabajador a tu backend
            console.log("Datos del trabajador:", datosGenerales);
            const response = await api.post("/api/trabajador/nuevoTrabajador", datosGenerales);
            console.log("Respuesta del API:", response.data);
            // Se asume que la respuesta retorna el ID del trabajador, por ejemplo: { id: "123" }
            setTrabajadorId(response.data.trabajador_id);
            // Avanza al siguiente formulario
            setPagina(2);
          } catch (error) {
            console.error("Error al enviar datos del trabajador:", error);
            // Puedes mostrar un mensaje de error al usuario si es necesario
          }
    };

    const manejarEnvioCuestionario = async(e) => {
        e.preventDefault();
        const payload = {
            trabajador_id: trabajadorId,
            respuestas: Object.entries(respuestas).map(([pregunta_id, respuesta]) => ({
            pregunta_id: Number(pregunta_id),
            respuesta: respuesta.toString()
            }))
        };
        console.log("Payload a enviar:", payload);
        try {
            const response = await api.post("/api/respuestas/nuevasRespuestas", payload);
            console.log("Cuestionario enviado:", response.data);
            window.open(response.data.pdf_resultado, "_blank");
            setMensaje("Cuestionario Respondido");
        } catch (error) {
            console.error("Error al enviar el cuestionario:", error);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    
    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {mensaje ? "Cuestionario Respondido" : 
            (pagina === 1
              ? "DATOS GENERALES"
              : "CUESTIONARIO PARA IDENTIFICAR FACTORES DE RIESGO PSICOSOCIAL EN EL TRABAJO")}
          </h2>
          {mensaje ? (
            // Si existe mensaje, solo se muestra el mensaje y no los campos del formulario
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
              {mensaje}
            </div>
          ) : (
            <>
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
                </form>
              )}
              {pagina === 2 && secciones.slice(2).length > 0 && (
                <form onSubmit={manejarEnvioCuestionario}>
                  {secciones.slice(2).map((seccion, index) => (
                    <div key={index} className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                        {seccion.cuestionario_nombre}
                      </h3>
                      {seccion.descripcion && (
                        <p className="text-gray-600 whitespace-pre-line">
                          {seccion.descripcion}
                        </p>
                      )}
                      {index === 0 && (
                        <div className="mb-4 p-2 bg-gray-200 rounded">
                          <h4 className="font-semibold">Instrucciones para responder</h4>
                          <p className="text-sm">
                            Las respuestas van del 1 al 5, donde:
                            <br />
                            5 = Siempre / Muy de acuerdo / Muy positivo
                            <br />
                            4 = Casi siempre / De acuerdo / Positivo
                            <br />
                            3 = Algunas veces / Neutral
                            <br />
                            2 = Casi nunca / En desacuerdo / Negativo
                            <br />
                            1 = Nunca / Muy en desacuerdo / Muy negativo
                          </p>
                        </div>
                      )}
                      {seccion.preguntas &&
                        seccion.preguntas.map((pregunta) => (
                          <div key={pregunta.id} className="mb-6">
                            <p className="font-medium text-gray-800">
                              {pregunta.texto}
                            </p>
                            {pregunta.tipo === "1-5" && (
                              <div className="flex gap-4 mt-2">
                                {[5, 4, 3, 2, 1].map((valor) => (
                                  <label key={valor} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`pregunta-${pregunta.id}`}
                                      value={valor}
                                      checked={respuestas[pregunta.id] === valor}
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
            </>
          )}
        </div>
      );
    }