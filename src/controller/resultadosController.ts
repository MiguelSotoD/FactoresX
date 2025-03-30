import { Request, Response } from "express";
import { generarPDFResultado } from "../services/pdfService";

export const descargarResultadoPDF = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const trabajadorId = parseInt(id, 10);

  if (isNaN(trabajadorId)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  try {
    await generarPDFResultado(trabajadorId, res);
  } catch (error: any) {
    console.error("Error al generar PDF:", error);
    res.status(500).json({ message: error.message || "Error al generar el PDF" });
  }
};

