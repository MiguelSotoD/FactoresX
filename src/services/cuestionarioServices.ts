import { conexionDBPostgreSQL } from "../config/configDB";
import logger from "../utils/logger";
import { ICuestionarioInput } from "../models/interface/cuestionarioInterface";

export const crearCuestionario = async (dataCuestionario: ICuestionarioInput) => {
  const {nombre, descripcion} = dataCuestionario;
  try{
    const result = await conexionDBPostgreSQL.query(
      `INSERT INTO cuestionarios (
        nombre, descripcion
      ) VALUES (
        $1,$2
      ) RETURNING *`,
      [nombre, descripcion]
    );
    logger.info(`Cuestionario Creado con nombre: ${result.rows[0].nombre}`);
    return result.rows[0]; 

  } catch (error: any) {
    logger.error(`Error creando el cuestionario: ${error.message}`);
    throw new Error("Error interno al crear el cuestionario");
  }
}

export const obtenerCuestionariosConPreguntas = async () => {
  try {
    const result = await conexionDBPostgreSQL.query(`
      SELECT
        c.id AS cuestionario_id,
        c.nombre AS cuestionario_nombre,
        c.descripcion,
        c.created_at,
        c.updated_at,
        json_agg(
          json_build_object(
            'id', p.id,
            'texto', p.pregunta,
            'tipo', p.tipo_respuesta,
            'created_at', p.created_at
          )
        ) AS preguntas
      FROM cuestionarios c
      LEFT JOIN preguntas p ON p.cuestionario_id = c.id AND p.deleted_at IS NULL
      WHERE c.deleted_at IS NULL
      GROUP BY c.id
      ORDER BY c.id;
    `);

    return result.rows;
  } catch (error) {
    logger.error("Error al obtener cuestionarios con preguntas:", error);
    throw new Error("No se pudo obtener la información");
  }
};

export const obtenerByIDCuestionarioConPreguntas = async (id: number) => {
  try {
    const result = await conexionDBPostgreSQL.query(`
      SELECT
        c.id AS cuestionario_id,
        c.nombre AS cuestionario_nombre,
        c.descripcion,
        c.created_at,
        c.updated_at,
        json_agg(
          json_build_object(
            'id', p.id,
            'texto', p.pregunta,
            'tipo', p.tipo_respuesta,
            'created_at', p.created_at
          )
        ) AS preguntas
      FROM cuestionarios c
      LEFT JOIN preguntas p ON p.cuestionario_id = c.id AND p.deleted_at IS NULL
      WHERE c.deleted_at IS NULL AND c.id = $1
      GROUP BY c.id
      ORDER BY c.id
    `, [id]);

    return result.rows[0]; 
  } catch (error) {
    logger.error("Error al obtener cuestionarios con preguntas:", error);
    throw new Error("No se pudo obtener la información");
  }
};
