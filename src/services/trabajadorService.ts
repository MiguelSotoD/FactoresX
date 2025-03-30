import { conexionDBPostgreSQL } from "../config/configDB";
import { Trabajador } from "../models/interface/trabajadorInterface";
import logger from "../utils/logger";

export const insertarTrabajador = async (data: Trabajador) => {
    try {
        
    const result = await conexionDBPostgreSQL.query(
        `INSERT INTO trabajadores (nombre, puesto, departamento, fecha_ingreso, sexo, organizacion)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          data.nombre,
          data.puesto,
          data.departamento,
          data.fecha_ingreso || null,
          data.sexo || null,
          data.organizacion || null,
        ]
      );
  
      return result.rows[0]; // ← contiene el id
    } catch (error: any) {
      logger.error("Error al insertar trabajador:", error);
      throw new Error("No se pudo registrar el trabajador");
    }
  };
  