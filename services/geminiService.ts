
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use a named parameter for apiKey and use process.env.API_KEY directly without fallbacks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ValuationInput {
  location: string;
  sqft: number;
  propertyType: string;
  beds: number;
  baths: number;
}

export const getAIValuation = async (input: ValuationInput) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a detailed real estate market valuation for a ${input.propertyType} in ${input.location}. 
                 Size: ${input.sqft} sqft, ${input.beds} beds, ${input.baths} baths.
                 Provide a price range, market trend analysis, and top selling points.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedPrice: { type: Type.NUMBER, description: "Average estimated value in USD" },
            lowEstimate: { type: Type.NUMBER },
            highEstimate: { type: Type.NUMBER },
            marketTrend: { type: Type.STRING, description: "Description of current market trends" },
            sellingPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["estimatedPrice", "lowEstimate", "highEstimate", "marketTrend", "sellingPoints"]
        }
      }
    });

    // Fix: Access response.text as a property (not a method) and ensure it's not undefined before parsing.
    const jsonStr = response.text || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Valuation Error:", error);
    return null;
  }
};
