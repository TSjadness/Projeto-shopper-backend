export const validateUploadData = (data: any) => {
  if (!data.image || typeof data.image !== "string") {
    return "Imagem em formato base64 é obrigatória e deve ser uma string.";
  }
  if (!data.customer_code || typeof data.customer_code !== "string") {
    return "Código do cliente é obrigatório e deve ser uma string.";
  }
  if (!data.measure_datetime || isNaN(Date.parse(data.measure_datetime))) {
    return "Data e hora da medição são obrigatórias e devem estar no formato ISO 8601.";
  }
  if (!["WATER", "GAS"].includes(data.measure_type.toUpperCase())) {
    return "Tipo de medição deve ser WATER ou GAS.";
  }
  return null;
};

export const validateConfirmData = (data: any) => {
  if (!data.measure_uuid || typeof data.measure_uuid !== "string") {
    return "UUID da medição é obrigatório e deve ser uma string.";
  }
  if (!data.confirmed_value || typeof data.confirmed_value !== "number") {
    return "O valor confirmado é obrigatório e deve ser um número.";
  }
  return null;
};

export const validateMeasureType = (measureType: string) => {
  return ["WATER", "GAS"].includes(measureType.toUpperCase());
};
