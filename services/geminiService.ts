import { GoogleGenAI, Type } from "@google/genai";
import { PricingTier } from '../types';

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePricingData = async (
  prompt: string
): Promise<PricingTier[]> => {
  const ai = getGeminiClient();

  const userPrompt = `Generate 3 distinct pricing tiers (e.g. Basic, Pro, Enterprise) for a service described as: "${prompt}".
  Ensure the prices are realistic.
  Make sure one tier is marked as popular.
  Include 4-5 features per tier.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              price: { type: Type.STRING },
              currency: { type: Type.STRING },
              frequency: { type: Type.STRING },
              description: { type: Type.STRING },
              isPopular: { type: Type.BOOLEAN },
              buttonText: { type: Type.STRING },
              features: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    included: { type: Type.BOOLEAN },
                  },
                  required: ['text', 'included'],
                },
              },
            },
            required: ['title', 'price', 'currency', 'frequency', 'description', 'features', 'buttonText', 'isPopular'],
          },
        },
      },
    });

    if (response.text) {
      const rawData = JSON.parse(response.text);
      // Map raw data to include IDs which are required by our frontend state but not necessarily by the AI
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rawData.map((tier: any, index: number) => ({
        ...tier,
        id: `gen-${Date.now()}-${index}`,
        buttonUrl: '#',
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate pricing tiers. Please check your API key and try again.");
  }
};