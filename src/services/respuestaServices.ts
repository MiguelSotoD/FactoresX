import { conexionDBPostgreSQL } from "../config/configDB";
import logger from "../utils/logger";

export const insertarRespuestas = async (
  trabajador_id: number,
  respuestas: { pregunta_id: number; respuesta: string }[]
) => {
  const client = await conexionDBPostgreSQL.connect();
  const inserts = [];

  try {
    await client.query("BEGIN");

    for (const r of respuestas) {
      const result = await client.query(
        `INSERT INTO respuestas (trabajador_id, pregunta_id, respuesta)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [trabajador_id, r.pregunta_id, r.respuesta]
      );
      inserts.push(result.rows[0]);
    }

    await client.query("COMMIT");
    logger.info(`Se guardaron ${inserts.length} respuestas del usuario ${trabajador_id}`);
    return inserts;
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Error al insertar respuestas:", error);
    throw new Error("Error al insertar respuestas");
  } finally {
    client.release();
  }
};

export const obtenerUsuariosRespuesta = async () => {
  try {
    const result = await conexionDBPostgreSQL.query(`
      SELECT 
        t.id AS trabajador_id,
        t.nombre AS trabajador_nombre,
        t.puesto,
        t.departamento,
        c.id AS cuestionario_id,
        c.nombre AS nombre_cuestionario,
        p.id AS pregunta_id,
        p.pregunta AS texto_pregunta,
        r.respuesta,
        r.created_at AS fecha_respuesta
      FROM respuestas r
      INNER JOIN trabajadores t ON r.trabajador_id = t.id
      INNER JOIN preguntas p ON r.pregunta_id = p.id
      INNER JOIN cuestionarios c ON p.cuestionario_id = c.id
      WHERE r.deleted_at IS NULL
        AND p.deleted_at IS NULL
        AND c.deleted_at IS NULL
        AND t.deleted_at IS NULL
      ORDER BY t.id, c.id, p.id;
    `);

    return result.rows;
  } catch (error) {
    logger.error("Error al obtener respuestas completas de los trabajadores:", error);
    throw new Error("Error al obtener respuestas de los trabajadores");
  }
};
