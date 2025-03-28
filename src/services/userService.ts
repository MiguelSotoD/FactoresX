import { conexionDBPostgreSQL } from "../config/configDB";
import { User } from "../models/userModel";
import logger from "../utils/logger";

const crearUser = async (userData: User): Promise<void> => {
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    password,
    departamento,
    puesto,
    rol,
    status = "active",
  } = userData;

  try {
    const result = await conexionDBPostgreSQL.query(
      `INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, email, password, departamento, puesto, rol, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        nombre,
        apellido_paterno,
        apellido_materno,
        email,
        password,
        departamento,
        puesto,
        rol,
        status,
      ]
    );
    logger.info(`Usuario creado: ${result.rows[0].nombre}`);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error creando el profesor: ${error}`);
    throw new Error("Error al crear el profesor.");
  }
};

const ingresarUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await conexionDBPostgreSQL.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    if (password !== user.password) {
      return null;
    }

    return user;
  } catch (error) {
    logger.error(`Error en el login: ${error.message}`);
    throw new Error("Error al iniciar sesión.");
  }
};

export { crearUser, ingresarUser };
