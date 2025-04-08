import PDFDocument from "pdfkit";
import { conexionDBPostgreSQL } from "../config/configDB";
import { Response } from "express";

export const generarPDFResultado = async (trabajador_id: number, res: Response) => {
  const doc = new PDFDocument({ margin: 50 });

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
  const resultados = data.resultados_por_factor;

  // Configurar headers del PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=resultados_trabajador_${trabajador_id}.pdf`);

  doc.pipe(res);

  // Título
  doc
    .fillColor("#1a237e")
    .fontSize(20)
    .text("Reporte de Evaluación Psicosocial", { align: "center" })
    .moveDown(1.2);

  // Datos del trabajador
  doc
    .fontSize(12)
    .fillColor("#000")
    .text(`Nombre:`, 50, doc.y, { continued: true })
    .font("Helvetica-Bold").text(` ${data.nombre}`)
    .font("Helvetica").text(`Puesto:`, 50, doc.y, { continued: true })
    .font("Helvetica-Bold").text(` ${data.puesto}`)
    .font("Helvetica").text(`Departamento:`, 50, doc.y, { continued: true })
    .font("Helvetica-Bold").text(` ${data.departamento}`)
    .font("Helvetica").text(`Organización:`, 50, doc.y, { continued: true })
    .font("Helvetica-Bold").text(` ${data.organizacion}`)
    .font("Helvetica").text(`Fecha de evaluación:`, 50, doc.y, { continued: true })
    .font("Helvetica-Bold").text(` ${new Date(data.fecha_registro).toLocaleDateString()}`)
    .moveDown(1.5);

  // Riesgo Global
  const colorRiesgo = data.riesgo_psicosocial === "alto" ? "#b71c1c"
                    : data.riesgo_psicosocial === "medio" ? "#f57f17"
                    : "#2e7d32";

  doc
    .fontSize(14)
    .fillColor("#000")
    .text("Resultado General", { underline: true })
    .moveDown(0.5)
    .fontSize(12)
    .fillColor(colorRiesgo)
    .font("Helvetica-Bold")
    .text(`Riesgo Psicosocial Global: ${data.riesgo_psicosocial.toUpperCase()}`)
    .moveDown(0.5)
    .fillColor("#000")
    .font("Helvetica")
    .text(`Recomendaciones:`)
    .font("Helvetica-Oblique")
    .text(`${data.recomendaciones}`)
    .moveDown(1.5);

  // Resultados por Sección
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor("#000")
    .text("Resultados por Sección", { underline: true })
    .moveDown(0.8);

  // Tabla de resultados
  const x1 = 50;
  const x2 = 250;
  const x3 = 400;
  const tableTop = doc.y;

  // Encabezados
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Sección", x1, tableTop)
    .text("Promedio", x2, tableTop)
    .text("Nivel de Riesgo", x3, tableTop);

  doc
    .moveTo(x1, tableTop + 15)
    .lineTo(550, tableTop + 15)
    .strokeColor("#999")
    .stroke();

  let rowY = tableTop + 25;
  doc.font("Helvetica").fontSize(11);

  for (const factor in resultados) {
    const f = resultados[factor];
    const nombre = factor.charAt(0).toUpperCase() + factor.slice(1).replace(/_/g, " ");
    const riesgoColor = f.riesgo === "alto" ? "#b71c1c"
                      : f.riesgo === "medio" ? "#f57f17"
                      : "#2e7d32";

    doc
      .fillColor("#000")
      .text(nombre, x1, rowY)
      .text(f.promedio.toFixed(2), x2, rowY)
      .fillColor(riesgoColor)
      .text(f.riesgo.toUpperCase(), x3, rowY);

    rowY += 20;
  }

  // Footer
  doc
    .moveDown(2)
    .fontSize(10)
    .fillColor("#999")
    .font("Helvetica-Oblique")
    .text("Este informe ha sido generado automáticamente por el sistema de evaluación psicosocial.", {
      align: "center"
    });

  doc.end();
};
