import { Request, Response } from "express";
import {  processImage,  } from "../services/geminiService";
import { validateUploadData } from "../services/validationService";
import { checkExistingMeasurement, saveMeasurement } from "../services/measurementService";

export const uploadMeasure = async (req: Request, res: Response) => {
  try {
    const validationError = validateUploadData(req.body);
    if (validationError) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: validationError,
      });
    }

    const { image, customer_code, measure_datetime, measure_type } = req.body;
    const existingMeasurement = await checkExistingMeasurement(customer_code);
    if (existingMeasurement) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada",
      });
    }

    const { image_url, measure_value, measure_uuid } = await processImage(
      image,
      customer_code,
      measure_type
    );

    await saveMeasurement({
      measure_uuid,
      customer_code,
      measure_datetime,
      measure_type,
      measure_value,
      image_url,
      has_confirmed: false,
    });

    res.status(200).json({ image_url, measure_value, measure_uuid });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar a imagem." });
  }
};
