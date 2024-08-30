import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getGeminiData } from "../services/";

const measures: any[] = []; // Simulação de banco de dados

export const uploadMeasure = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  // Validação dos dados
  if (!image || !customer_code || !measure_datetime || !measure_type) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Todos os campos são obrigatórios.",
    });
  }

  if (!["WATER", "GAS"].includes(measure_type)) {
    return res.status(400).json({
      error_code: "INVALID_TYPE",
      error_description: "Tipo de medição não permitida.",
    });
  }

  const existingMeasure = measures.find(
    (measure) =>
      measure.customer_code === customer_code &&
      new Date(measure.measure_datetime).getMonth() ===
        new Date(measure_datetime).getMonth() &&
      measure.measure_type === measure_type
  );

  if (existingMeasure) {
    return res.status(409).json({
      error_code: "DOUBLE_REPORT",
      error_description: "Leitura do mês já realizada.",
    });
  }

  const geminiResponse = await getGeminiData(image);

  const newMeasure = {
    measure_uuid: uuidv4(),
    customer_code,
    measure_datetime,
    measure_type,
    image_url: geminiResponse.image_url,
    measure_value: geminiResponse.measure_value,
  };

  measures.push(newMeasure);

  return res.status(200).json(newMeasure);
};

export const confirmMeasure = (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  const measure = measures.find((m) => m.measure_uuid === measure_uuid);

  if (!measure) {
    return res.status(404).json({
      error_code: "MEASURE_NOT_FOUND",
      error_description: "Leitura não encontrada.",
    });
  }

  if (measure.confirmed) {
    return res.status(409).json({
      error_code: "CONFIRMATION_DUPLICATE",
      error_description: "Leitura já confirmada.",
    });
  }

  measure.confirmed = true;
  measure.confirmed_value = confirmed_value;

  return res.status(200).json({ success: true });
};

export const listMeasures = (req: Request, res: Response) => {
  const { customer_code } = req.params;
  const { measure_type } = req.query;

  const filteredMeasures = measures.filter(
    (m) => m.customer_code === customer_code
  );

  if (measure_type) {
    const type = measure_type.toString().toUpperCase();
    if (!["WATER", "GAS"].includes(type)) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida.",
      });
    }
    return res.status(200).json({
      customer_code,
      measures: filteredMeasures.filter((m) => m.measure_type === type),
    });
  }

  return res.status(200).json({
    customer_code,
    measures: filteredMeasures,
  });
};
