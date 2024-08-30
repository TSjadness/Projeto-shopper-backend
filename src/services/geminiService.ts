import axios from "axios";

const geminiApiKey = process.env.GEMINI_API_KEY;

export const processImage = async (
  imageBase64: string,
  customerCode: string,
  measureType: string
) => {
  try {
    const response = await axios.post(
      "https://gemini.googleapis.com/v1/analyze",
      {
        image: { content: imageBase64 },
        features: [{ type: "TEXT_DETECTION" }],
      },
      {
        headers: {
          Authorization: `Bearer ${geminiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const measure_value = extractMeasureValue(response.data);
    const image_url = saveImage(imageBase64);
    const measure_uuid = generateUuid();
    return { image_url, measure_value, measure_uuid };
  } catch (error) {
    console.error("Erro ao processar a imagem no Gemini API:", error);
    throw new Error("Erro ao processar a imagem.");
  }
};

const extractMeasureValue = (data: any): number => {
  return 1234;
};

const saveImage = (imageBase64: string): string => {
  return "https://example.com/image.png";
};

const generateUuid = (): string => {
  return "unique-measure-id";
};
