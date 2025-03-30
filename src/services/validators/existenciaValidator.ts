import { conexionDBPostgreSQL } from "../../config/configDB";

export const validarExistenciaCuestionario = async (cuestionario_id: number): Promise<void> => {
  const result = await conexionDBPostgreSQL.query(
    `SELECT id FROM cuestionarios WHERE id = $1 AND deleted_at IS NULL`,
    [cuestionario_id]
  );

  if (result.rowCount === 0) {
    throw new Error(`No se encontró el cuestionario con ID ${cuestionario_id}`);
  }
};

export const validarExistenciaUsuario = async (usuario_id: number): Promise<void> => {
  const result = await conexionDBPostgreSQL.query(
    `SELECT id FROM usuarios WHERE id = $1 AND deleted_at IS NULL`,
    [usuario_id]
  );

  if (result.rowCount === 0) {
    throw new Error(`No se encontró el usuario con ID ${usuario_id}`);
  }
};

export const validarPreguntaNoRespondida = async (trabajador_id: number, pregunta_id: number): Promise<void> => {
  const result = await conexionDBPostgreSQL.query(
    `
    SELECT 1 FROM respuestas
    WHERE trabajador_id = $1 AND pregunta_id = $2 AND deleted_at IS NULL
    LIMIT 1
    `,
    [trabajador_id, pregunta_id]
  );

  if (result.rowCount > 0) {
    throw new Error(`Ya has respondido la pregunta con ID ${pregunta_id}`);
  }
};
