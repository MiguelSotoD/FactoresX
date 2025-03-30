import { conexionDBPostgreSQL } from "../config/configDB";
import logger from "../utils/logger";
import { validarExistenciaCuestionario } from "./validators/existenciaValidator";
export const insertarPreguntas = async (
  cuestionario_id: number,
  preguntas: { pregunta: string; tipo_respuesta: string }[]
) => {
  const client = await conexionDBPostgreSQL.connect();
  const inserts = [];

  try {
    await validarExistenciaCuestionario(cuestionario_id);

    await client.query("BEGIN");

    for (const pregunta of preguntas) {
      const result = await client.query(
        `INSERT INTO preguntas (cuestionario_id, pregunta, tipo_respuesta)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [cuestionario_id, pregunta.pregunta, pregunta.tipo_respuesta]
      );
      inserts.push(result.rows[0]);
    }

    await client.query("COMMIT");
    logger.info(`Se insertaron ${inserts.length} preguntas en el cuestionario ${cuestionario_id}`);
    return inserts;
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error("Error al insertar preguntas:", error);
    throw new Error("Error al insertar preguntas");
  } finally {
    client.release();
  }
};
