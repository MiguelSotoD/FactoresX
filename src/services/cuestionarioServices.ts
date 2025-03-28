import { conexionDBPostgreSQL } from "../config/configDB";
import logger from "../utils/logger";
import { ICuestionarioInput } from "../models/interface/cuestionarioInterface";

const crearCuestionario = async (dataCuestionario: ICuestionarioInput) => {
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


export {crearCuestionario,};