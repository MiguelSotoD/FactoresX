import { conexionDBPostgreSQL } from "../config/configDB";
import logger from "../utils/logger";

export const insertarRespuestas = async (
  usuario_id: number,
  respuestas: { pregunta_id: number; respuesta: string }[]
) => {
  const client = await conexionDBPostgreSQL.connect();
  const inserts = [];

  try {
    await client.query("BEGIN");

    for (const r of respuestas) {
      const result = await client.query(
        `INSERT INTO respuestas (usuario_id, pregunta_id, respuesta, fecha_respuesta)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
         RETURNING *`,
        [usuario_id, r.pregunta_id, r.respuesta]
      );
      inserts.push(result.rows[0]);
    }

    await client.query("COMMIT");
    logger.info(`Se guardaron ${inserts.length} respuestas del usuario ${usuario_id}`);
    return inserts;
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Error al insertar respuestas:", error);
    throw new Error("Error al insertar respuestas");
  } finally {
    client.release();
  }
};
