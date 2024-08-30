import { Measurement } from "../models/Measurement";

export const findMeasurementByUuid = async (measureUuid: string) => {
  try {
    return await Measurement.findOne({ measure_uuid: measureUuid });
  } catch (error) {
    console.error("Erro ao buscar a medição:", error);
    throw new Error("Erro ao buscar a medição.");
  }
};

export const saveMeasurement = async (measurement: any) => {
  try {
    return await Measurement.findOneAndUpdate(
      { measure_uuid: measurement.measure_uuid },
      measurement,
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Erro ao salvar a medição:", error);
    throw new Error("Erro ao salvar a medição.");
  }
};

export const confirmMeasurement = async (
  measureUuid: string,
  confirmedValue: number
) => {
  const measure = await findMeasurementByUuid(measureUuid);

  if (!measure) {
    return {
      status: 404,
      error: {
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura não encontrada",
      },
    };
  }

  if (measure.has_confirmed) {
    return {
      status: 409,
      error: {
        error_code: "CONFIRMATION_DUPLICATE",
        error_description: "Leitura já confirmada",
      },
    };
  }

  measure.has_confirmed = true;
  measure.measure_value = confirmedValue;
  await saveMeasurement(measure);

  return { success: true };
};

export const listMeasurements = async (
  customerCode: string,
  measureType?: string
) => {
  const query: any = { customer_code: customerCode };

  if (measureType) {
    query.measure_type = measureType;
  }

  try {
    const measurements = await Measurement.find(query);
    return measurements.map((measure) => ({
      measure_uuid: measure.measure_uuid,
      measure_datetime: measure.measure_datetime,
      measure_type: measure.measure_type,
      has_confirmed: measure.has_confirmed,
      image_url: measure.image_url,
    }));
  } catch (error) {
    console.error("Erro ao listar as medições:", error);
    throw new Error("Erro ao listar as medições.");
  }
};

export const checkExistingMeasurement = async (measureUuid: string) => {
  try {
    const measurement = await findMeasurementByUuid(measureUuid);
    return measurement !== null;
  } catch (error) {
    console.error("Erro ao verificar a medição existente:", error);
    throw new Error("Erro ao verificar a medição existente.");
  }
};
