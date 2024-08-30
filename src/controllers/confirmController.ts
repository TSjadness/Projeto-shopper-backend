import { Request, Response } from "express";
import { confirmMeasurement } from "../services/measurementService";
import { validateConfirmData } from "../services/validationService";

export const confirmMeasure = async (req: Request, res: Response) => {
  try {
    const validationError = validateConfirmData(req.body);
    if (validationError) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: validationError,
      });
    }

    const { measure_uuid, confirmed_value } = req.body;
    const result = await confirmMeasurement(measure_uuid, confirmed_value);

    if (result.error) {
      return res.status(result.status).json(result.error);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erro ao confirmar a medida." });
  }
};
