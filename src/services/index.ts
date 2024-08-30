import axios from "axios";

export const getGeminiData = async (image: string) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const response = await axios.post("https://api.gemini.com/v1/vision", {
    image,
    apiKey,
  });

  return {
    image_url: response.data.image_url,
    measure_value: response.data.measure_value,
  };
};
