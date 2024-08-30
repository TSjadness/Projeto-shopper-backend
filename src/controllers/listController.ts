import { Request, Response } from "express";
import { listMeasurements } from "../services/measurementService";
import { validateMeasureType } from "../services/validationService";

export const listMeasures = async (req: Request, res: Response) => {
  try {
    const { customer_code } = req.params;
    const measure_type = req.query.measure_type
      ? String(req.query.measure_type).toUpperCase()
      : undefined;

    if (measure_type && !validateMeasureType(measure_type)) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
    }

    const measurements = await listMeasurements(customer_code, measure_type);
    if (!measurements || measurements.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }

    res.status(200).json({ customer_code, measures: measurements });
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar as medidas." });
  }
};
