import PDFDocument from "pdfkit";
import { conexionDBPostgreSQL } from "../config/configDB";
import { Response } from "express";

export const generarPDFResultado = async (trabajador_id: number, res: Response) => {
  const doc = new PDFDocument();

  // Obtener información del trabajador y su resultado
  const resultado = await conexionDBPostgreSQL.query(`
    SELECT t.nombre, t.puesto, t.departamento, t.organizacion, r.riesgo_psicosocial,
           r.recomendaciones, r.resultados_por_factor, r.fecha_registro
    FROM resultados r
    INNER JOIN trabajadores t ON r.trabajador_id = t.id
    WHERE r.trabajador_id = $1
    ORDER BY r.fecha_registro DESC
    LIMIT 1
  `, [trabajador_id]);

  if (resultado.rowCount === 0) {
    throw new Error("No hay resultados para este trabajador");
  }

  const data = resultado.rows[0];
  const factores = data.resultados_por_factor;

  // Configurar headers del PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=resultados_trabajador_${trabajador_id}.pdf`);

  doc.pipe(res);

  // Título
  doc.fontSize(18).text("Reporte de Evaluación Psicosocial", { align: "center" }).moveDown();

  // Datos del trabajador
  doc.fontSize(12).text(`Nombre: ${data.nombre}`);
  doc.text(`Puesto: ${data.puesto}`);
  doc.text(`Departamento: ${data.departamento}`);
  doc.text(`Organización: ${data.organizacion}`);
  doc.text(`Fecha de evaluación: ${new Date(data.fecha_registro).toLocaleDateString()}`);
  doc.moveDown();

  // Riesgo Global
  doc.fontSize(14).text(`Riesgo Psicosocial Global: ${data.riesgo_psicosocial.toUpperCase()}`, { underline: true });
  doc.moveDown().fontSize(12).text(`Recomendaciones: ${data.recomendaciones}`);
  doc.moveDown();

  // Resultados por sección
  doc.fontSize(14).text("Resultados por Sección", { underline: true }).moveDown();

  const resultados = data.resultados_por_factor;
  for (const factor in resultados) {
    const f = resultados[factor];
    doc.text(`${factor.charAt(0).toUpperCase() + factor.slice(1)} → Promedio: ${f.promedio} | Riesgo: ${f.riesgo}`);
  }

  doc.end();
};
