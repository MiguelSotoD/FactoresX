import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error en la solicitud:", err);

  // Manejar errores de validación de Celebrate
  if (isCelebrateError(err)) {
    const detalles: string[] = [];
    err.details.forEach((value) => {
      detalles.push(...value.details.map((detail) => detail.message));
    });

      res.status(400).json({
      error: "Error de validación",
      detalles,
    });
  }

  // Manejo de otros errores
  res.status(500).json({ error: "Error interno del servidor" });
};
