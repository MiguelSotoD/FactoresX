import { conexionDBPostgreSQL } from "../config/configDB";
import logger from "../utils/logger";

interface ResultadoPorFactor {
  [factor: string]: {
    promedio: number;
    riesgo: string;
  };
}

export const analizarResultadosPorTrabajador = async (trabajador_id: number): Promise<void> => {
  const client = await conexionDBPostgreSQL.connect();

  try {
    // Obtener respuestas del trabajador con factor
    const result = await client.query(`
      SELECT p.factor, r.respuesta
      FROM respuestas r
      INNER JOIN preguntas p ON r.pregunta_id = p.id
      WHERE r.trabajador_id = $1 AND r.deleted_at IS NULL AND p.deleted_at IS NULL AND p.factor IS NOT NULL
    `, [trabajador_id]);

    if (result.rowCount === 0) {
      throw new Error("El trabajador no tiene respuestas registradas");
    }

    // Agrupar por factor
    const puntajesPorFactor: { [factor: string]: number[] } = {};

    for (const row of result.rows) {
      if (!puntajesPorFactor[row.factor]) {
        puntajesPorFactor[row.factor] = [];
      }
      puntajesPorFactor[row.factor].push(row.respuesta);
    }

    // Calcular promedio y nivel de riesgo por sección
    const resultadosPorFactor: ResultadoPorFactor = {};
    const todosPuntajes: number[] = [];

    for (const factor in puntajesPorFactor) {
      const puntajes = puntajesPorFactor[factor];
      const promedio = puntajes.reduce((a, b) => a + b, 0) / puntajes.length;
      const riesgo = promedio <= 2 ? "alto" : promedio <= 3.5 ? "medio" : "bajo";

      resultadosPorFactor[factor] = {
        promedio: parseFloat(promedio.toFixed(2)),
        riesgo,
      };

      todosPuntajes.push(...puntajes);
    }

    // Riesgo global
    const promedioGlobal = todosPuntajes.reduce((a, b) => a + b, 0) / todosPuntajes.length;
    const riesgoGlobal = promedioGlobal <= 2 ? "alto" : promedioGlobal <= 3.5 ? "medio" : "bajo";

    // Recomendación general
    const recomendaciones =
      riesgoGlobal === "bajo"
        ? "No se requieren acciones inmediatas."
        : riesgoGlobal === "medio"
        ? "Se recomienda realizar ajustes y monitoreo."
        : "Se requieren acciones correctivas urgentes.";

    // Guardar en tabla resultados
    await client.query(`
      INSERT INTO resultados (trabajador_id, riesgo_psicosocial, recomendaciones, resultados_por_factor)
      VALUES ($1, $2, $3, $4)
    `, [trabajador_id, riesgoGlobal, recomendaciones, JSON.stringify(resultadosPorFactor)]);

    logger.info(`Resultado psicosocial guardado para trabajador ${trabajador_id}`);

  } catch (error) {
    logger.error("Error al analizar resultados:", error);
    throw error;
  } finally {
    client.release();
  }
};
