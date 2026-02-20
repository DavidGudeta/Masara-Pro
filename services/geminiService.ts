
import { GoogleGenAI } from "@google/genai";

export interface ValuationInput {
  location: string;
  sqft: number;
  propertyType: string;
  beds: number;
  baths: number;
}

export const getAIValuation = async (input: ValuationInput) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    
    const genAI = new GoogleGenAI({ apiKey });
    const model = "gemini-3-flash-preview";
    
    const prompt = `As a real estate expert, provide a valuation for a ${input.propertyType} in ${input.location} with ${input.sqft} sqft, ${input.beds} bedrooms, and ${input.baths} bathrooms. Return a estimated price range and a brief justification.`;
    
    const response = await genAI.models.generateContent({
      model,
      contents: prompt,
    });
    
    return {
      valuation: response.text,
      success: true
    };
  } catch (error) {
    console.error("AI Valuation Error:", error);
    return {
      valuation: "Valuation currently unavailable.",
      success: false
    };
  }
};
